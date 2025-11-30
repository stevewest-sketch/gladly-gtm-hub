import { ThemeProvider } from '@/components/providers/ThemeProvider';

/**
 * Enablement Hub Layout
 * Wraps the Enablement Hub in the green theme
 */
export default function EnablementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider hub="enablement">{children}</ThemeProvider>;
}
