import { DocumentActionComponent, useDocumentOperation } from 'sanity';
import { SparklesIcon, EditIcon, SyncIcon, TransferIcon, UploadIcon } from '@sanity/icons';
import { useState, useMemo, useRef, useCallback } from 'react';
import {
  Dialog,
  Box,
  Stack,
  Text,
  Card,
  Button,
  Spinner,
  Badge,
  Tab,
  TabList,
  TabPanel,
  Select,
  TextArea,
  TextInput,
  Inline,
  Checkbox,
  Flex,
  Grid,
} from '@sanity/ui';

// Types
interface AIInput {
  inputMode?: 'paste' | 'manual' | 'edit';
  rawContent?: string;
  editPrompt?: string;
  preserveFields?: string[];
}

interface ArticleSection {
  _key?: string;
  heading: string;
  content: string;
}

interface ContentBlock {
  _key?: string;
  blockType: string;
  title?: string;
  faqs?: Array<{ question: string; answer: string; _key?: string }>;
  items?: Array<{ icon?: string; title: string; description?: string; url?: string; _key?: string }>;
  columns?: Array<{ title: string; items: string[]; _key?: string }>;
  content?: string;
}

// Constants
const EDITABLE_FIELDS = [
  { value: 'title', label: 'Title', type: 'string', icon: '📝' },
  { value: 'description', label: 'Description', type: 'string', icon: '📋' },
  { value: 'keyTakeaways', label: 'Key Takeaways', type: 'array', icon: '💡' },
  { value: 'articleSections', label: 'How-To Steps', type: 'array', icon: '📖', templateOnly: 'playbook' },
  { value: 'actionItems', label: 'Tips & Pitfalls', type: 'array', icon: '⚡' },
];

const QUICK_EDITS = [
  { label: 'Improve clarity', prompt: 'Make this clearer and more concise without losing meaning' },
  { label: 'More actionable', prompt: 'Rewrite to be more action-oriented, starting with verbs where possible' },
  { label: 'Shorter', prompt: 'Condense to be more brief while keeping key points' },
  { label: 'More detail', prompt: 'Expand with more specific details and examples' },
  { label: 'Fix grammar', prompt: 'Fix any grammatical errors, typos, or awkward phrasing' },
  { label: 'Stronger', prompt: 'Make the language more confident and impactful' },
  { label: 'More specific', prompt: 'Add more specific details, metrics, or examples' },
  { label: 'More professional', prompt: 'Adjust tone to be more professional and polished' },
];

const TEMPLATE_LABELS: Record<string, string> = {
  'training': '📺 Training',
  'playbook': '📋 Playbook',
  'battle-card': '⚔️ Battle Card',
};

const COE_ENTRY_TYPE_LABELS: Record<string, string> = {
  'best-practice': '📋 Best Practice',
  'process-innovation': '💡 Process Innovation',
  'internal-best-practice': '🏢 Internal Best Practice',
  'proof-point': '📊 Proof Point',
  'tool': '🛠️ Tool',
  'meeting-asset': '📁 Meeting Asset',
};

// Helper to generate unique keys
const generateKey = () => Math.random().toString(36).substring(2, 11);

// Helper to add keys to array items
const addKeysToArray = <T extends Record<string, unknown>>(arr: T[], keyField = '_key'): T[] => {
  if (!Array.isArray(arr)) return arr;
  return arr.map(item => ({
    ...item,
    [keyField]: item[keyField] || generateKey(),
  }));
};

export const AIContentAssistant: DocumentActionComponent = (props) => {
  const { patch } = useDocumentOperation(props.id, props.type);

  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'generate' | 'edit-field' | 'bulk-edit' | 'transform'>('generate');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Generate tab state
  const [pasteContent, setPasteContent] = useState('');
  const [metadata, setMetadata] = useState({
    title: '',
    presenter: '',
    audience: '',
  });

  // File upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isParsingFile, setIsParsingFile] = useState(false);
  const [fileParseError, setFileParseError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit field tab state
  const [selectedField, setSelectedField] = useState('keyTakeaways');
  const [fieldEditPrompt, setFieldEditPrompt] = useState('');
  const [previewData, setPreviewData] = useState<Record<string, unknown> | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Bulk edit tab state
  const [bulkEditPrompt, setBulkEditPrompt] = useState('');
  const [fieldsToPreserve, setFieldsToPreserve] = useState<string[]>([]);

  // Get document values
  const doc = props.draft || props.published;
  const publishedTo = doc?.publishedTo as string[] | undefined;
  const pageTemplate = doc?.pageTemplate as string | undefined;

  // CoE entry support
  const isCoeEntry = props.type === 'coeEntry';
  const coeEntryType = doc?.entryType as string | undefined;

  // Only show for catalogEntry and coeEntry documents
  if (!['catalogEntry', 'coeEntry'].includes(props.type)) {
    return null;
  }

  // Filter available fields based on template
  const availableFields = useMemo(() => {
    return EDITABLE_FIELDS.filter(f =>
      !f.templateOnly || f.templateOnly === pageTemplate
    );
  }, [pageTemplate]);

  // Check if document has legacy content that can be transformed
  const hasLegacyContent = useMemo(() => {
    const legacyFields = ['keyTakeaways', 'articleSections', 'actionItems', 'contentBlocks'];
    return legacyFields.some(field => {
      const value = doc?.[field];
      return Array.isArray(value) && value.length > 0;
    });
  }, [doc]);

  const hasPageSections = useMemo(() => {
    const sections = doc?.pageSections;
    return Array.isArray(sections) && sections.length > 0;
  }, [doc]);

  // Reset state when dialog closes
  const handleClose = () => {
    setIsOpen(false);
    setError(null);
    setSuccess(false);
    setSuccessMessage('');
    setPasteContent('');
    setFieldEditPrompt('');
    setPreviewData(null);
    setShowPreview(false);
    setBulkEditPrompt('');
    setUploadedFile(null);
    setFileParseError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle file selection and parsing
  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validExtensions = ['.txt', '.docx', '.pdf', '.pptx', '.png', '.jpg', '.jpeg', '.gif', '.webp'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!validExtensions.includes(ext)) {
      setFileParseError(`Unsupported file type. Supported: ${validExtensions.join(', ')}`);
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setFileParseError('File too large. Maximum size is 10MB.');
      return;
    }

    setUploadedFile(file);
    setFileParseError(null);
    setIsParsingFile(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse-file', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Failed to parse file');
      }

      const result = await response.json();

      // Set the extracted text as paste content
      setPasteContent(result.text);
      showSuccess(`Extracted ${result.characterCount.toLocaleString()} characters from ${result.fileName}`);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to parse file';
      setFileParseError(errorMessage);
      setUploadedFile(null);
    } finally {
      setIsParsingFile(false);
    }
  }, []);

  // Clear uploaded file
  const handleClearFile = useCallback(() => {
    setUploadedFile(null);
    setFileParseError(null);
    setPasteContent('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  // Show success message temporarily
  const showSuccess = (message: string) => {
    setSuccess(true);
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccess(false);
      setSuccessMessage('');
    }, 2000);
  };

  // ==========================================
  // GENERATE TAB - Process transcript/content
  // ==========================================
  const handleGenerate = async () => {
    if (!pasteContent || pasteContent.trim().length < 50) {
      setError('Please enter content with at least 50 characters');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/process-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'paste',
          content: pasteContent,
          pageTemplate: pageTemplate || 'training',
          publishedTo: publishedTo || ['enablement'],
          metadata: {
            title: metadata.title || undefined,
            presenter: metadata.presenter || undefined,
            audience: metadata.audience || undefined,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process content');
      }

      const result = await response.json();
      const data = result.data;

      // Build patch operations
      const patchOps: Array<{ set: Record<string, unknown> }> = [];

      // Core fields
      if (data.title) {
        patchOps.push({ set: { title: data.title } });
        if (data.slug) {
          patchOps.push({ set: { slug: { _type: 'slug', current: data.slug } } });
        }
      }
      if (data.summary || data.description) {
        patchOps.push({ set: { description: data.summary || data.description } });
      }

      // NEW: Handle pageSections format
      if (data.pageSections && Array.isArray(data.pageSections) && data.pageSections.length > 0) {
        // Add _type and _key to each section
        const formattedSections = data.pageSections.map((section: Record<string, unknown>) => {
          const formattedSection: Record<string, unknown> = {
            _type: 'pageSection',
            _key: generateKey(),
            sectionType: section.sectionType,
            title: section.title,
          };

          // Copy over section-specific fields
          // Handle overview cards with keys
          if (section.overviewCards && Array.isArray(section.overviewCards)) {
            formattedSection.overviewCards = (section.overviewCards as Array<Record<string, unknown>>).map(card => ({
              _key: generateKey(),
              label: card.label,
              content: card.content,
            }));
          }
          if (section.overviewText) formattedSection.overviewText = section.overviewText;
          if (section.takeaways) formattedSection.takeaways = section.takeaways;
          if (section.tips) formattedSection.tips = section.tips;
          if (section.videoUrl) formattedSection.videoUrl = section.videoUrl;
          if (section.textContent) formattedSection.textContent = section.textContent;

          // Handle process steps with keys
          if (section.processSteps && Array.isArray(section.processSteps)) {
            formattedSection.processLayout = section.processLayout || 'numbered';
            formattedSection.processSteps = (section.processSteps as Array<Record<string, unknown>>).map(step => ({
              _key: generateKey(),
              heading: step.heading,
              content: step.content,
            }));
          }

          // Handle FAQs with keys
          if (section.faqs && Array.isArray(section.faqs)) {
            formattedSection.faqs = (section.faqs as Array<Record<string, unknown>>).map(faq => ({
              _key: generateKey(),
              question: faq.question,
              answer: faq.answer,
            }));
          }

          // Handle asset items with keys
          if (section.assetItems && Array.isArray(section.assetItems)) {
            formattedSection.assetItems = (section.assetItems as Array<Record<string, unknown>>).map(item => ({
              _key: generateKey(),
              ...item,
            }));
          }

          // Handle checklist columns with keys
          if (section.checklistColumns && Array.isArray(section.checklistColumns)) {
            formattedSection.checklistColumns = (section.checklistColumns as Array<Record<string, unknown>>).map(col => ({
              _key: generateKey(),
              ...col,
            }));
          }

          return formattedSection;
        });

        patchOps.push({ set: { pageSections: formattedSections } });
      }

      // Resource links (for video URL at document level if provided)
      const resourceLinks: Record<string, string> = {};
      if (data.videoUrl) resourceLinks.videoUrl = data.videoUrl;
      if (data.slidesUrl) resourceLinks.slidesUrl = data.slidesUrl;
      if (Object.keys(resourceLinks).length > 0) {
        patchOps.push({ set: { resourceLinks } });
      }

      // Metadata
      if (data.suggestedCategory) {
        patchOps.push({ set: { enablementCategory: [data.suggestedCategory] } });
      }
      if (data.suggestedDifficulty) {
        patchOps.push({ set: { difficulty: data.suggestedDifficulty } });
      }
      if (data.duration) {
        patchOps.push({ set: { duration: String(data.duration) } });
      }
      if (data.presenter || metadata.presenter) {
        patchOps.push({ set: { presenter: data.presenter || metadata.presenter } });
      }

      // Set status and date
      patchOps.push(
        { set: { publishDate: new Date().toISOString() } },
        { set: { status: 'draft' } }
      );

      // Apply patches
      if (patchOps.length > 0) {
        patch.execute(patchOps);
      }

      setPasteContent('');
      setMetadata({ title: '', presenter: '', audience: '' });
      showSuccess('Content generated successfully!');

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  // ==========================================
  // EDIT FIELD TAB - Single field editing
  // ==========================================
  const handleFieldEdit = async () => {
    if (!fieldEditPrompt || fieldEditPrompt.trim().length < 5) {
      setError('Please enter an edit instruction');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/process-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'edit-field',
          targetField: selectedField,
          currentValue: doc?.[selectedField],
          editPrompt: fieldEditPrompt,
          context: {
            title: doc?.title,
            pageTemplate: pageTemplate,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to edit field');
      }

      const result = await response.json();
      setPreviewData(result.data);
      setShowPreview(true);

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyFieldEdit = () => {
    if (!previewData || previewData[selectedField] === undefined) return;

    let valueToSet = previewData[selectedField];

    // Add keys to array items if needed
    if (Array.isArray(valueToSet)) {
      if (selectedField === 'articleSections') {
        valueToSet = addKeysToArray(valueToSet as Array<Record<string, unknown>>);
      }
    }

    patch.execute([{ set: { [selectedField]: valueToSet } }]);

    setShowPreview(false);
    setPreviewData(null);
    setFieldEditPrompt('');
    showSuccess(`${EDITABLE_FIELDS.find(f => f.value === selectedField)?.label} updated!`);
  };

  // ==========================================
  // BULK EDIT TAB - Multiple fields
  // ==========================================
  const handleBulkEdit = async () => {
    if (!bulkEditPrompt || bulkEditPrompt.trim().length < 10) {
      setError('Please enter an edit prompt with at least 10 characters');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/process-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'edit',
          editPrompt: bulkEditPrompt,
          preserveFields: fieldsToPreserve,
          pageTemplate: pageTemplate || 'training',
          currentDocument: {
            title: doc?.title,
            description: doc?.description,
            keyTakeaways: doc?.keyTakeaways,
            articleSections: doc?.articleSections,
            actionItems: doc?.actionItems,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process edit');
      }

      const result = await response.json();
      const data = result.data;

      // Build patch operations - only for fields not preserved
      const patchOps: Array<{ set: Record<string, unknown> }> = [];

      if (!fieldsToPreserve.includes('title') && data.title) {
        patchOps.push({ set: { title: data.title } });
        if (data.slug) {
          patchOps.push({ set: { slug: { _type: 'slug', current: data.slug } } });
        }
      }
      if (!fieldsToPreserve.includes('description') && (data.summary || data.description)) {
        patchOps.push({ set: { description: data.summary || data.description } });
      }
      if (!fieldsToPreserve.includes('keyTakeaways') && data.keyTakeaways) {
        patchOps.push({ set: { keyTakeaways: data.keyTakeaways } });
      }
      if (!fieldsToPreserve.includes('articleSections') && data.sections) {
        patchOps.push({ set: { articleSections: addKeysToArray(data.sections) } });
      }
      if (!fieldsToPreserve.includes('actionItems') && data.actionItems) {
        patchOps.push({ set: { actionItems: data.actionItems } });
      }

      if (patchOps.length > 0) {
        patch.execute(patchOps);
      }

      setBulkEditPrompt('');
      setFieldsToPreserve([]);
      showSuccess(`Updated ${result.fieldsEdited?.length || patchOps.length} fields!`);

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  // ==========================================
  // TRANSFORM TAB - Legacy to pageSections
  // ==========================================
  const handleTransform = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const pageSections: Array<Record<string, unknown>> = [];

      // Video section (from resourceLinks)
      const resourceLinks = doc?.resourceLinks as Record<string, string> | undefined;
      if (resourceLinks?.videoUrl) {
        pageSections.push({
          _type: 'pageSection',
          _key: generateKey(),
          sectionType: 'video',
          title: 'Session Recording',
          videoUrl: resourceLinks.videoUrl,
        });
      }

      // Key Takeaways section
      const keyTakeaways = doc?.keyTakeaways as string[];
      if (keyTakeaways && keyTakeaways.length > 0) {
        pageSections.push({
          _type: 'pageSection',
          _key: generateKey(),
          sectionType: 'takeaways',
          title: 'Key Takeaways',
          takeaways: keyTakeaways,
        });
      }

      // Article Sections → Process section
      const articleSections = doc?.articleSections as ArticleSection[];
      if (articleSections && articleSections.length > 0) {
        pageSections.push({
          _type: 'pageSection',
          _key: generateKey(),
          sectionType: 'process',
          title: 'How To',
          processLayout: 'numbered',
          processSteps: articleSections.map((section) => ({
            _key: generateKey(),
            heading: section.heading,
            content: section.content,
          })),
        });
      }

      // Action Items → Tips section
      const actionItems = doc?.actionItems as string[];
      if (actionItems && actionItems.length > 0) {
        pageSections.push({
          _type: 'pageSection',
          _key: generateKey(),
          sectionType: 'tips',
          title: 'Tips & Pitfalls',
          tips: actionItems,
        });
      }

      // Content Blocks → Various sections
      const contentBlocks = doc?.contentBlocks as ContentBlock[];
      if (contentBlocks && contentBlocks.length > 0) {
        for (const block of contentBlocks) {
          if (block.blockType === 'faq' && block.faqs) {
            pageSections.push({
              _type: 'pageSection',
              _key: generateKey(),
              sectionType: 'faq',
              title: block.title || 'FAQs',
              faqs: block.faqs.map(faq => ({
                _key: generateKey(),
                question: faq.question,
                answer: faq.answer,
              })),
            });
          } else if (block.blockType === 'assets' && block.items) {
            pageSections.push({
              _type: 'pageSection',
              _key: generateKey(),
              sectionType: 'assets',
              title: block.title || 'Resources',
              assetItems: block.items.map(item => ({
                _key: generateKey(),
                icon: item.icon,
                title: item.title,
                description: item.description,
                url: item.url,
              })),
            });
          } else if (block.blockType === 'checklist' && block.columns) {
            pageSections.push({
              _type: 'pageSection',
              _key: generateKey(),
              sectionType: 'checklist',
              title: block.title || 'Checklist',
              checklistColumns: block.columns.map(col => ({
                _key: generateKey(),
                title: col.title,
                items: col.items,
              })),
            });
          } else if (block.blockType === 'text' && block.content) {
            pageSections.push({
              _type: 'pageSection',
              _key: generateKey(),
              sectionType: 'text',
              title: block.title || 'Details',
              textContent: block.content,
            });
          }
        }
      }

      if (pageSections.length === 0) {
        setError('No legacy content found to transform');
        return;
      }

      // Apply the transformation
      patch.execute([{ set: { pageSections } }]);

      showSuccess(`Transformed ${pageSections.length} sections!`);

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  // Format field value for display
  const formatFieldValue = (value: unknown): string => {
    if (value === null || value === undefined) return '(empty)';
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) {
      if (value.length === 0) return '(empty)';
      return value.map((item, i) => {
        if (typeof item === 'string') return `• ${item}`;
        if (item.heading) return `${i + 1}. ${item.heading}`;
        if (item.text) return `• ${item.text}`;
        return `${i + 1}. ${JSON.stringify(item)}`;
      }).join('\n');
    }
    return JSON.stringify(value, null, 2);
  };

  // ==========================================
  // RENDER
  // ==========================================
  return {
    label: 'AI Assistant',
    icon: SparklesIcon,
    tone: 'primary',
    onHandle: () => setIsOpen(true),
    dialog: isOpen && {
      type: 'custom',
      component: (
        <Dialog
          header="AI Content Assistant"
          id="ai-content-assistant-dialog"
          onClose={handleClose}
          width={2}
        >
          <Box padding={4}>
            <Stack space={4}>
              {/* Success message */}
              {success && (
                <Card padding={3} radius={2} tone="positive">
                  <Text weight="semibold">{successMessage}</Text>
                </Card>
              )}

              {/* Context badges */}
              <Inline space={2}>
                {isCoeEntry && coeEntryType && (
                  <Badge tone="primary">{COE_ENTRY_TYPE_LABELS[coeEntryType] || 'CoE Entry'}</Badge>
                )}
                {!isCoeEntry && publishedTo?.includes('enablement') && (
                  <Badge tone="primary">{TEMPLATE_LABELS[pageTemplate || ''] || 'Enablement'}</Badge>
                )}
                {!isCoeEntry && publishedTo?.includes('content') && (
                  <Badge tone="caution">Content Hub</Badge>
                )}
                {doc?.title && (
                  <Badge mode="outline">{(doc.title as string).slice(0, 30)}{(doc.title as string).length > 30 ? '...' : ''}</Badge>
                )}
              </Inline>

              {/* Tabs */}
              <TabList space={2}>
                <Tab
                  aria-controls="generate-panel"
                  selected={activeTab === 'generate'}
                  onClick={() => setActiveTab('generate')}
                  label="Generate"
                  icon={SparklesIcon}
                />
                <Tab
                  aria-controls="edit-field-panel"
                  selected={activeTab === 'edit-field'}
                  onClick={() => setActiveTab('edit-field')}
                  label="Edit Field"
                  icon={EditIcon}
                />
                <Tab
                  aria-controls="bulk-edit-panel"
                  selected={activeTab === 'bulk-edit'}
                  onClick={() => setActiveTab('bulk-edit')}
                  label="Bulk Edit"
                  icon={SyncIcon}
                />
                <Tab
                  aria-controls="transform-panel"
                  selected={activeTab === 'transform'}
                  onClick={() => setActiveTab('transform')}
                  label="Transform"
                  icon={TransferIcon}
                  disabled={!hasLegacyContent}
                />
              </TabList>

              {/* Error display */}
              {error && (
                <Card padding={3} radius={2} tone="critical">
                  <Text size={1}>{error}</Text>
                </Card>
              )}

              {/* ==================== GENERATE TAB ==================== */}
              <TabPanel id="generate-panel" hidden={activeTab !== 'generate'}>
                <Stack space={4}>
                  <Card padding={3} radius={2} tone="primary">
                    <Text size={1}>
                      Upload a file or paste content. Supports DOCX, PDF, PPTX, TXT, and images. AI will generate title, description, takeaways, and more.
                    </Text>
                  </Card>

                  {/* File Upload Section */}
                  <Card padding={4} radius={2} border tone={uploadedFile ? 'positive' : 'default'}>
                    <Stack space={3}>
                      <Flex align="center" gap={2}>
                        <UploadIcon />
                        <Text weight="semibold" size={1}>Upload File</Text>
                        <Text size={0} muted>(or paste content below)</Text>
                      </Flex>

                      {/* Hidden file input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".txt,.docx,.pdf,.pptx,.png,.jpg,.jpeg,.gif,.webp"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                      />

                      {/* File upload UI */}
                      {!uploadedFile && !isParsingFile && (
                        <Box>
                          <Button
                            text="Choose File"
                            mode="ghost"
                            icon={UploadIcon}
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isProcessing}
                          />
                          <Text size={0} muted style={{ marginTop: '8px' }}>
                            Supported: .docx, .pdf, .pptx, .txt, .png, .jpg
                          </Text>
                        </Box>
                      )}

                      {/* Parsing indicator */}
                      {isParsingFile && (
                        <Flex align="center" gap={2}>
                          <Spinner />
                          <Text size={1}>Extracting text from file...</Text>
                        </Flex>
                      )}

                      {/* Uploaded file display */}
                      {uploadedFile && !isParsingFile && (
                        <Flex align="center" justify="space-between">
                          <Inline space={2}>
                            <Badge tone="positive">{uploadedFile.name.split('.').pop()?.toUpperCase()}</Badge>
                            <Text size={1}>{uploadedFile.name}</Text>
                            <Text size={0} muted>({(uploadedFile.size / 1024).toFixed(1)} KB)</Text>
                          </Inline>
                          <Button
                            text="Clear"
                            mode="ghost"
                            tone="critical"
                            fontSize={0}
                            padding={2}
                            onClick={handleClearFile}
                          />
                        </Flex>
                      )}

                      {/* File parse error */}
                      {fileParseError && (
                        <Card padding={2} radius={2} tone="critical">
                          <Text size={1}>{fileParseError}</Text>
                        </Card>
                      )}
                    </Stack>
                  </Card>

                  {/* Optional metadata */}
                  <Stack space={3}>
                    <Text weight="semibold" size={1}>Quick Context (Optional)</Text>
                    <Grid columns={3} gap={2}>
                      <TextInput
                        placeholder="Title hint"
                        value={metadata.title}
                        onChange={(e) => setMetadata({ ...metadata, title: e.currentTarget.value })}
                        fontSize={1}
                      />
                      <TextInput
                        placeholder="Presenter"
                        value={metadata.presenter}
                        onChange={(e) => setMetadata({ ...metadata, presenter: e.currentTarget.value })}
                        fontSize={1}
                      />
                      <TextInput
                        placeholder="Audience (Sales, CS, etc.)"
                        value={metadata.audience}
                        onChange={(e) => setMetadata({ ...metadata, audience: e.currentTarget.value })}
                        fontSize={1}
                      />
                    </Grid>
                  </Stack>

                  {/* Content input */}
                  <Stack space={2}>
                    <Flex align="center" justify="space-between">
                      <Text weight="semibold" size={1}>Content *</Text>
                      {uploadedFile && pasteContent && (
                        <Badge mode="outline" tone="positive">Extracted from file</Badge>
                      )}
                    </Flex>
                    <TextArea
                      rows={10}
                      placeholder="Paste your transcript, notes, or document here (minimum 50 characters)..."
                      value={pasteContent}
                      onChange={(e) => setPasteContent(e.currentTarget.value)}
                      disabled={isProcessing || isParsingFile}
                    />
                    <Text size={0} muted>{pasteContent.length} characters</Text>
                  </Stack>

                  <Button
                    text={isProcessing ? 'Generating...' : 'Generate Content'}
                    tone="primary"
                    onClick={handleGenerate}
                    disabled={isProcessing || isParsingFile || pasteContent.length < 50}
                    icon={isProcessing ? Spinner : SparklesIcon}
                  />
                </Stack>
              </TabPanel>

              {/* ==================== EDIT FIELD TAB ==================== */}
              <TabPanel id="edit-field-panel" hidden={activeTab !== 'edit-field'}>
                <Stack space={4}>
                  {/* Field selector */}
                  <Stack space={2}>
                    <Text weight="semibold" size={1}>Select field to edit</Text>
                    <Select
                      value={selectedField}
                      onChange={(e) => {
                        setSelectedField(e.currentTarget.value);
                        setShowPreview(false);
                        setPreviewData(null);
                      }}
                      fontSize={1}
                    >
                      {availableFields.map(f => (
                        <option key={f.value} value={f.value}>
                          {f.icon} {f.label}
                        </option>
                      ))}
                    </Select>
                  </Stack>

                  {/* Current value preview */}
                  <Card padding={3} radius={2} tone="transparent" border style={{ maxHeight: '150px', overflow: 'auto' }}>
                    <Stack space={2}>
                      <Text size={1} weight="semibold">Current value:</Text>
                      <Text size={1} muted style={{ whiteSpace: 'pre-wrap' }}>
                        {formatFieldValue(doc?.[selectedField])}
                      </Text>
                    </Stack>
                  </Card>

                  {/* Quick edit buttons */}
                  <Stack space={2}>
                    <Text size={1} weight="semibold">Quick edits:</Text>
                    <Flex wrap="wrap" gap={2}>
                      {QUICK_EDITS.map(qe => (
                        <Button
                          key={qe.label}
                          text={qe.label}
                          mode={fieldEditPrompt === qe.prompt ? 'default' : 'ghost'}
                          tone={fieldEditPrompt === qe.prompt ? 'primary' : 'default'}
                          fontSize={0}
                          padding={2}
                          onClick={() => setFieldEditPrompt(qe.prompt)}
                        />
                      ))}
                    </Flex>
                  </Stack>

                  {/* Custom edit prompt */}
                  <Stack space={2}>
                    <Text size={1} weight="semibold">Or describe your edit:</Text>
                    <TextArea
                      rows={2}
                      value={fieldEditPrompt}
                      onChange={(e) => setFieldEditPrompt(e.currentTarget.value)}
                      placeholder="e.g., Make these takeaways more specific to enterprise customers"
                      fontSize={1}
                    />
                  </Stack>

                  {/* Preview area */}
                  {showPreview && previewData && (
                    <Card padding={3} radius={2} tone="positive" border>
                      <Stack space={3}>
                        <Text size={1} weight="semibold">Preview (new value):</Text>
                        <Box style={{ maxHeight: '150px', overflow: 'auto' }}>
                          <Text size={1} style={{ whiteSpace: 'pre-wrap' }}>
                            {formatFieldValue(previewData[selectedField])}
                          </Text>
                        </Box>
                        <Inline space={2}>
                          <Button
                            text="Apply Changes"
                            tone="positive"
                            onClick={handleApplyFieldEdit}
                          />
                          <Button
                            text="Discard"
                            mode="ghost"
                            onClick={() => {
                              setShowPreview(false);
                              setPreviewData(null);
                            }}
                          />
                        </Inline>
                      </Stack>
                    </Card>
                  )}

                  {/* Action button */}
                  {!showPreview && (
                    <Button
                      text={isProcessing ? 'Processing...' : 'Preview Edit'}
                      tone="primary"
                      onClick={handleFieldEdit}
                      disabled={isProcessing || !fieldEditPrompt || !doc?.[selectedField]}
                      icon={isProcessing ? Spinner : EditIcon}
                    />
                  )}
                </Stack>
              </TabPanel>

              {/* ==================== BULK EDIT TAB ==================== */}
              <TabPanel id="bulk-edit-panel" hidden={activeTab !== 'bulk-edit'}>
                <Stack space={4}>
                  <Card padding={3} radius={2} tone="caution">
                    <Text size={1}>
                      Describe changes to apply across multiple fields. Check fields you want to preserve.
                    </Text>
                  </Card>

                  {/* Fields to preserve */}
                  <Stack space={2}>
                    <Text weight="semibold" size={1}>Preserve these fields (won&apos;t be changed):</Text>
                    <Card padding={3} radius={2} border>
                      <Stack space={2}>
                        {availableFields.map(f => (
                          <Flex key={f.value} align="center" gap={2}>
                            <Checkbox
                              checked={fieldsToPreserve.includes(f.value)}
                              onChange={(e) => {
                                if (e.currentTarget.checked) {
                                  setFieldsToPreserve([...fieldsToPreserve, f.value]);
                                } else {
                                  setFieldsToPreserve(fieldsToPreserve.filter(x => x !== f.value));
                                }
                              }}
                            />
                            <Text size={1}>{f.icon} {f.label}</Text>
                            {doc?.[f.value] && (
                              <Badge mode="outline" fontSize={0}>
                                {Array.isArray(doc[f.value])
                                  ? `${(doc[f.value] as unknown[]).length} items`
                                  : 'set'}
                              </Badge>
                            )}
                          </Flex>
                        ))}
                      </Stack>
                    </Card>
                  </Stack>

                  {/* Edit prompt */}
                  <Stack space={2}>
                    <Text weight="semibold" size={1}>What changes do you want?</Text>
                    <TextArea
                      rows={3}
                      value={bulkEditPrompt}
                      onChange={(e) => setBulkEditPrompt(e.currentTarget.value)}
                      placeholder="e.g., Make everything more concise and action-oriented. Focus on enterprise use cases."
                      fontSize={1}
                    />
                  </Stack>

                  <Button
                    text={isProcessing ? 'Processing...' : 'Apply Bulk Edits'}
                    tone="caution"
                    onClick={handleBulkEdit}
                    disabled={isProcessing || bulkEditPrompt.length < 10}
                    icon={isProcessing ? Spinner : SyncIcon}
                  />
                </Stack>
              </TabPanel>

              {/* ==================== TRANSFORM TAB ==================== */}
              <TabPanel id="transform-panel" hidden={activeTab !== 'transform'}>
                <Stack space={4}>
                  {!hasLegacyContent ? (
                    <Card padding={4} radius={2} tone="transparent">
                      <Text align="center" muted>No legacy content to transform.</Text>
                    </Card>
                  ) : (
                    <>
                      <Card padding={3} radius={2} tone="primary">
                        <Stack space={2}>
                          <Text size={1} weight="semibold">Transform legacy fields to Page Sections</Text>
                          <Text size={1}>
                            This will convert your keyTakeaways, articleSections, actionItems, and contentBlocks
                            into the new flexible pageSections format.
                          </Text>
                        </Stack>
                      </Card>

                      {/* Preview what will be transformed */}
                      <Card padding={3} radius={2} border>
                        <Stack space={2}>
                          <Text size={1} weight="semibold">Content to transform:</Text>
                          {doc?.keyTakeaways && (doc.keyTakeaways as unknown[]).length > 0 && (
                            <Inline space={2}>
                              <Badge>Key Takeaways</Badge>
                              <Text size={1} muted>→ Takeaways section</Text>
                            </Inline>
                          )}
                          {doc?.articleSections && (doc.articleSections as unknown[]).length > 0 && (
                            <Inline space={2}>
                              <Badge>How-To Steps</Badge>
                              <Text size={1} muted>→ Process section</Text>
                            </Inline>
                          )}
                          {doc?.actionItems && (doc.actionItems as unknown[]).length > 0 && (
                            <Inline space={2}>
                              <Badge>Tips & Pitfalls</Badge>
                              <Text size={1} muted>→ Tips section</Text>
                            </Inline>
                          )}
                          {doc?.contentBlocks && (doc.contentBlocks as unknown[]).length > 0 && (
                            <Inline space={2}>
                              <Badge>Content Blocks</Badge>
                              <Text size={1} muted>→ Various sections</Text>
                            </Inline>
                          )}
                          {(doc?.resourceLinks as Record<string, string> | undefined)?.videoUrl && (
                            <Inline space={2}>
                              <Badge>Video URL</Badge>
                              <Text size={1} muted>→ Video section</Text>
                            </Inline>
                          )}
                        </Stack>
                      </Card>

                      {hasPageSections && (
                        <Card padding={3} radius={2} tone="caution">
                          <Text size={1}>
                            This document already has pageSections. Transforming will replace them.
                          </Text>
                        </Card>
                      )}

                      <Button
                        text={isProcessing ? 'Transforming...' : 'Transform to Page Sections'}
                        tone="positive"
                        onClick={handleTransform}
                        disabled={isProcessing}
                        icon={isProcessing ? Spinner : TransferIcon}
                      />
                    </>
                  )}
                </Stack>
              </TabPanel>

              {/* Cancel button */}
              <Button
                text="Close"
                mode="ghost"
                onClick={handleClose}
                disabled={isProcessing}
              />
            </Stack>
          </Box>
        </Dialog>
      ),
    },
  };
};
