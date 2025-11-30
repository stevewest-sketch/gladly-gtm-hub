import { DocumentActionComponent, useDocumentOperation } from 'sanity';
import { SparklesIcon, EditIcon } from '@sanity/icons';
import { useState } from 'react';
import {
  Dialog,
  Box,
  Stack,
  Text,
  Card,
  Button,
  Spinner,
  Badge,
} from '@sanity/ui';

interface AIInput {
  inputMode?: 'paste' | 'manual' | 'edit';
  rawContent?: string;
  editPrompt?: string;
  preserveFields?: string[];
}

export const ProcessContentAction: DocumentActionComponent = (props) => {
  const { patch } = useDocumentOperation(props.id, props.type);
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Get document values
  const doc = props.draft || props.published;
  const aiInput = doc?.aiInput as AIInput | undefined;
  const publishedTo = doc?.publishedTo as string[] | undefined;
  const pageTemplate = doc?.pageTemplate as string | undefined;

  // Extract AI input fields
  const inputMode = aiInput?.inputMode || 'manual';
  const rawContent = aiInput?.rawContent;
  const editPrompt = aiInput?.editPrompt;
  const preserveFields = aiInput?.preserveFields || [];

  // Only show for catalogEntry documents
  if (props.type !== 'catalogEntry') {
    return null;
  }

  // Determine which mode we're in
  const isPasteMode = inputMode === 'paste';
  const isEditMode = inputMode === 'edit';
  const isManualMode = inputMode === 'manual';

  // Check if we have content to process
  const hasPasteContent = isPasteMode && rawContent && rawContent.trim().length >= 50;
  const hasEditPrompt = isEditMode && editPrompt && editPrompt.trim().length >= 10;
  const canProcess = hasPasteContent || hasEditPrompt;

  // Get labels for display
  const getTemplateLabel = (template: string | undefined) => {
    switch (template) {
      case 'training': return 'Training';
      case 'playbook': return 'Playbook';
      case 'battle-card': return 'Battle Card';
      default: return 'Content Card';
    }
  };

  const getHubLabel = (hubs: string[] | undefined) => {
    if (!hubs || hubs.length === 0) return 'Not selected';
    return hubs.map(h => h === 'content' ? 'Content Hub' : 'Enablement Hub').join(', ');
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      // Build request body based on mode
      const requestBody: Record<string, any> = {
        mode: inputMode,
        pageTemplate: pageTemplate || 'training',
        publishedTo: publishedTo || ['enablement'],
      };

      if (isPasteMode) {
        if (!rawContent || rawContent.trim().length < 50) {
          throw new Error('Please enter content with at least 50 characters');
        }
        requestBody.content = rawContent;
      } else if (isEditMode) {
        if (!editPrompt || editPrompt.trim().length < 10) {
          throw new Error('Please enter an edit prompt with at least 10 characters');
        }
        requestBody.editPrompt = editPrompt;
        requestBody.preserveFields = preserveFields;
        // Include current document fields for context
        requestBody.currentDocument = {
          title: doc?.title,
          description: doc?.description,
          keyTakeaways: doc?.keyTakeaways,
          articleSections: doc?.articleSections,
          actionItems: doc?.actionItems,
          contentBlocks: doc?.contentBlocks,
        };
      }

      const response = await fetch('/api/process-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process content');
      }

      const result = await response.json();
      const processedData = result.data;

      // Build patch operations based on mode
      const patchOps: any[] = [];

      // In edit mode, only update fields not in preserveFields
      const shouldUpdate = (field: string) => {
        if (isPasteMode) return true;
        if (isEditMode) return !preserveFields.includes(field);
        return true;
      };

      // Core fields
      if (shouldUpdate('title') && processedData.title) {
        patchOps.push({ set: { title: processedData.title } });
      }
      if (shouldUpdate('description') && (processedData.summary || processedData.description)) {
        patchOps.push({ set: { description: processedData.summary || processedData.description } });
      }
      if (shouldUpdate('title') && processedData.slug) {
        patchOps.push({
          set: {
            slug: {
              _type: 'slug',
              current: processedData.slug,
            },
          },
        });
      }

      // Key takeaways
      if (shouldUpdate('keyTakeaways') && processedData.keyTakeaways) {
        patchOps.push({ set: { keyTakeaways: processedData.keyTakeaways } });
      }

      // Article sections (for playbooks)
      if (shouldUpdate('articleSections') && processedData.sections) {
        const sectionsWithKeys = processedData.sections.map((section: any) => ({
          ...section,
          _key: Math.random().toString(36).substring(2, 11),
        }));
        patchOps.push({ set: { articleSections: sectionsWithKeys } });
      }

      // Action items (tips & pitfalls)
      if (shouldUpdate('actionItems') && processedData.actionItems) {
        patchOps.push({ set: { actionItems: processedData.actionItems } });
      }

      // Resource links
      const resourceLinks: any = {};
      if (processedData.videoUrl) resourceLinks.videoUrl = processedData.videoUrl;
      if (processedData.slidesUrl) resourceLinks.slidesUrl = processedData.slidesUrl;
      if (processedData.transcriptUrl) resourceLinks.transcriptUrl = processedData.transcriptUrl;
      if (Object.keys(resourceLinks).length > 0) {
        patchOps.push({ set: { resourceLinks } });
      }

      // Content blocks (FAQs if generated)
      if (shouldUpdate('faqs') && processedData.faqs) {
        const faqBlock = {
          _key: Math.random().toString(36).substring(2, 11),
          blockType: 'faq',
          title: 'Frequently Asked Questions',
          faqs: processedData.faqs.map((faq: any) => ({
            ...faq,
            _key: Math.random().toString(36).substring(2, 11),
          })),
        };
        // Get existing content blocks and add FAQ
        const existingBlocks = (doc?.contentBlocks as any[]) || [];
        const filteredBlocks = existingBlocks.filter((b: any) => b.blockType !== 'faq');
        patchOps.push({ set: { contentBlocks: [...filteredBlocks, faqBlock] } });
      }

      // Metadata fields
      if (processedData.suggestedCategory) {
        patchOps.push({ set: { enablementCategory: [processedData.suggestedCategory] } });
      }
      if (processedData.suggestedDifficulty) {
        patchOps.push({ set: { difficulty: processedData.suggestedDifficulty } });
      }
      if (processedData.duration) {
        patchOps.push({ set: { duration: String(processedData.duration) } });
      }
      if (processedData.presenter) {
        patchOps.push({ set: { presenter: processedData.presenter } });
      }

      // Only set publish date and status for new content (paste mode)
      if (isPasteMode) {
        patchOps.push(
          { set: { publishDate: new Date().toISOString() } },
          { set: { status: 'draft' } },
        );
      }

      // Apply all patches
      if (patchOps.length > 0) {
        patch.execute(patchOps);
      }

      setSuccess(true);

      // Close dialog after short delay
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 1500);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Don't show if manual entry is selected
  if (isManualMode) {
    return null;
  }

  return {
    label: isEditMode ? 'Edit with AI' : 'Generate with AI',
    icon: isEditMode ? EditIcon : SparklesIcon,
    tone: 'primary',
    disabled: !canProcess,
    title: canProcess
      ? isEditMode
        ? `Edit content with AI - preserving: ${preserveFields.length > 0 ? preserveFields.join(', ') : 'nothing'}`
        : `Generate ${getTemplateLabel(pageTemplate)} content from pasted text`
      : isEditMode
        ? 'Add an edit prompt (what should AI change?)'
        : 'Add content to the "Paste your content here" field first (min 50 characters)',
    onHandle: () => {
      setIsOpen(true);
    },
    dialog: isOpen && {
      type: 'custom',
      component: (
        <Dialog
          header={isEditMode ? 'Edit Content with AI' : 'Generate Content with AI'}
          id="process-content-dialog"
          onClose={() => setIsOpen(false)}
          width={1}
        >
          <Box padding={4}>
            <Stack space={4}>
              {success ? (
                <Card padding={4} radius={2} tone="positive">
                  <Stack space={3}>
                    <Text size={2} weight="semibold">
                      {isEditMode ? 'Content updated successfully!' : 'Content generated successfully!'}
                    </Text>
                    <Text size={1} muted>
                      Review the {isEditMode ? 'updated' : 'generated'} fields in the Content tab.
                    </Text>
                  </Stack>
                </Card>
              ) : (
                <>
                  <Card padding={3} radius={2} shadow={1} tone="primary">
                    <Stack space={3}>
                      {isEditMode ? (
                        <>
                          <Text size={1} weight="semibold">AI will edit your content based on your prompt:</Text>
                          <Card padding={2} radius={2} tone="caution">
                            <Text size={1}>{editPrompt}</Text>
                          </Card>
                          {preserveFields.length > 0 && (
                            <Stack space={2}>
                              <Text size={1}>Fields that will NOT be changed:</Text>
                              <Stack space={1}>
                                {preserveFields.map(field => (
                                  <Badge key={field} tone="positive">{field}</Badge>
                                ))}
                              </Stack>
                            </Stack>
                          )}
                        </>
                      ) : (
                        <>
                          <Text size={1}>AI will analyze your content and generate:</Text>
                          <Stack space={2}>
                            <Text size={1}>• Title, slug, and description</Text>
                            <Text size={1}>• Key takeaways</Text>
                            {pageTemplate === 'playbook' && (
                              <Text size={1}>• How-to steps</Text>
                            )}
                            <Text size={1}>• Tips & pitfalls</Text>
                            <Text size={1}>• FAQs (if applicable)</Text>
                            <Text size={1}>• Resource link extraction</Text>
                          </Stack>
                        </>
                      )}
                    </Stack>
                  </Card>

                  <Stack space={2} style={{ flexDirection: 'row', gap: '8px', flexWrap: 'wrap' }}>
                    <Badge tone="primary">{getHubLabel(publishedTo)}</Badge>
                    {publishedTo?.includes('enablement') && (
                      <Badge tone="caution">{getTemplateLabel(pageTemplate)}</Badge>
                    )}
                    <Badge>{isEditMode ? 'Edit Mode' : 'Generate Mode'}</Badge>
                    {!isEditMode && <Badge>{rawContent?.length || 0} characters</Badge>}
                  </Stack>

                  {error && (
                    <Card padding={3} radius={2} tone="critical">
                      <Text size={1}>{error}</Text>
                    </Card>
                  )}

                  <Stack space={2}>
                    <Button
                      text={isProcessing ? 'Processing...' : (isEditMode ? 'Apply AI Edits' : 'Generate Content')}
                      tone="primary"
                      onClick={handleProcess}
                      disabled={isProcessing || !canProcess}
                      icon={isProcessing ? Spinner : (isEditMode ? EditIcon : SparklesIcon)}
                    />
                    <Button
                      text="Cancel"
                      mode="ghost"
                      onClick={() => setIsOpen(false)}
                      disabled={isProcessing}
                    />
                  </Stack>
                </>
              )}
            </Stack>
          </Box>
        </Dialog>
      ),
    },
  };
};
