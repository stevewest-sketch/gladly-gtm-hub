import { ThemeProvider } from '@/components/providers/ThemeProvider';

/**
 * Content Hub Layout
 * Wraps the Content Hub in the purple theme
 */
export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider hub="content">{children}</ThemeProvider>;
}
