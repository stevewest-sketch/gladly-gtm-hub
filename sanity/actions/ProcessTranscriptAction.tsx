import { DocumentActionComponent, useDocumentOperation } from 'sanity';
import { SparklesIcon } from '@sanity/icons';
import { useState } from 'react';
import {
  Dialog,
  Box,
  Stack,
  Text,
  TextArea,
  TextInput,
  Button,
  Card,
  Spinner,
} from '@sanity/ui';

export const ProcessTranscriptAction: DocumentActionComponent = (props) => {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const [isOpen, setIsOpen] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [metadata, setMetadata] = useState({
    title: '',
    date: '',
    participants: '',
    audience: '',
    contentType: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!transcript || transcript.trim().length < 50) {
      setError('Please enter a transcript with at least 50 characters');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/process-transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript,
          metadata: {
            title: metadata.title || undefined,
            date: metadata.date || undefined,
            participants: metadata.participants || undefined,
            audience: metadata.audience || undefined,
            contentType: metadata.contentType || undefined,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process transcript');
      }

      const result = await response.json();
      const processedData = result.data;

      // Add unique _key to each section for Sanity
      const sectionsWithKeys = processedData.sections?.map((section: any) => ({
        ...section,
        _key: Math.random().toString(36).substring(2, 11),
      })) || [];

      // Patch the document with processed content
      patch.execute([
        { set: { title: processedData.title } },
        { set: { summary: processedData.summary } },
        { set: { category: processedData.category } },
        { set: { contentType: processedData.contentType } },
        { set: { audience: processedData.audience } },
        { set: { keyTakeaways: processedData.keyTakeaways } },
        { set: { sections: sectionsWithKeys } },
        { set: { actionItems: processedData.actionItems || [] } },
        { set: { videoUrl: processedData.videoUrl || undefined } },
        { set: { slidesUrl: processedData.slidesUrl || undefined } },
        { set: { tags: processedData.tags } },
        { set: { readingTime: processedData.readingTime } },
        { set: { publishedDate: new Date().toISOString() } },
        {
          set: {
            slug: {
              _type: 'slug',
              current: processedData.slug,
            },
          },
        },
        { set: { rawTranscript: transcript } }, // Save original
      ]);

      // Publish the document to ensure it's saved in Sanity
      publish.execute();

      // Wait a moment for Sanity to process the publish
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create corresponding training session
      try {
        await fetch('/api/create-training-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            enablementArticleId: props.id,
            title: processedData.title,
            summary: processedData.summary,
            category: processedData.category,
            audience: processedData.audience,
            tags: processedData.tags,
            slug: processedData.slug,
            publishedDate: new Date().toISOString(),
          }),
        });
      } catch (trainingError) {
        console.error('Failed to create training session:', trainingError);
        // Don't fail the whole operation if training session creation fails
      }

      // Close dialog
      setIsOpen(false);
      setTranscript('');
      setMetadata({
        title: '',
        date: '',
        participants: '',
        audience: '',
        contentType: '',
      });
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

  return {
    label: 'Process Transcript',
    icon: SparklesIcon,
    onHandle: () => {
      setIsOpen(true);
    },
    dialog: isOpen && {
      type: 'custom',
      component: (
        <Dialog
          header="Process Transcript with AI"
          id="process-transcript-dialog"
          onClose={() => setIsOpen(false)}
          width={2}
        >
          <Box padding={4}>
            <Stack space={4}>
              <Card padding={3} radius={2} shadow={1} tone="primary">
                <Text size={1}>
                  Paste a meeting transcript below and optionally add metadata. AI will
                  automatically generate a structured article with title, summary, sections,
                  tags, and SEO metadata.
                </Text>
              </Card>

              <Stack space={3}>
                <Text weight="semibold">Metadata (Optional)</Text>
                <TextInput
                  placeholder="Meeting title"
                  value={metadata.title}
                  onChange={(e) =>
                    setMetadata({ ...metadata, title: e.currentTarget.value })
                  }
                />
                <TextInput
                  placeholder="Date (e.g., November 14, 2024)"
                  value={metadata.date}
                  onChange={(e) =>
                    setMetadata({ ...metadata, date: e.currentTarget.value })
                  }
                />
                <TextInput
                  placeholder="Participants"
                  value={metadata.participants}
                  onChange={(e) =>
                    setMetadata({ ...metadata, participants: e.currentTarget.value })
                  }
                />
                <TextInput
                  placeholder="Target audience (Sales, CSM, etc.)"
                  value={metadata.audience}
                  onChange={(e) =>
                    setMetadata({ ...metadata, audience: e.currentTarget.value })
                  }
                />
                <TextInput
                  placeholder="Content type (Training, Meeting, Demo)"
                  value={metadata.contentType}
                  onChange={(e) =>
                    setMetadata({ ...metadata, contentType: e.currentTarget.value })
                  }
                />
              </Stack>

              <Stack space={2}>
                <Text weight="semibold">Transcript *</Text>
                <TextArea
                  rows={12}
                  placeholder="Paste your meeting transcript here (minimum 50 characters)..."
                  value={transcript}
                  onChange={(e) => setTranscript(e.currentTarget.value)}
                  disabled={isProcessing}
                />
              </Stack>

              {error && (
                <Card padding={3} radius={2} tone="critical">
                  <Text size={1}>{error}</Text>
                </Card>
              )}

              <Stack space={2}>
                <Button
                  text={isProcessing ? 'Processing...' : 'Process Transcript'}
                  tone="primary"
                  onClick={handleProcess}
                  disabled={isProcessing || !transcript}
                  icon={isProcessing ? Spinner : SparklesIcon}
                />
                <Button
                  text="Cancel"
                  mode="ghost"
                  onClick={() => setIsOpen(false)}
                  disabled={isProcessing}
                />
              </Stack>
            </Stack>
          </Box>
        </Dialog>
      ),
    },
  };
};
