/**
 * PreviewCard - Custom preview component for Sanity Studio
 * Provides better visual preview of content in the CMS
 */

import { Card, Text, Stack } from '@sanity/ui';

interface PreviewCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  media?: any;
}

export function PreviewCard({ title, subtitle, description, media }: PreviewCardProps) {
  return (
    <Card padding={3} radius={2} shadow={1}>
      <Stack space={3}>
        {media && <div>{media}</div>}
        {title && (
          <Text size={2} weight="bold">
            {title}
          </Text>
        )}
        {subtitle && (
          <Text size={1} muted>
            {subtitle}
          </Text>
        )}
        {description && (
          <Text size={1} style={{ lineClamp: 3 }}>
            {description}
          </Text>
        )}
      </Stack>
    </Card>
  );
}
