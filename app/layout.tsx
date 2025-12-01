import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import TopNavigation from "@/components/TopNavigation";
import { client } from "@/lib/sanity";

// V2 Design System Fonts
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "GTM Hub - Gladly Revenue Enablement",
  description: "Your central hub for selling, supporting, and growing with Gladly",
};

interface SearchableItem {
  title: string;
  description: string;
  url: string;
  category: string;
  keywords: string[];
  priority: number;
  isActive: boolean;
}

async function getSearchableContent(): Promise<SearchableItem[]> {
  try {
    const query = `*[_type == "searchableContent" && isActive == true]
      | order(priority desc, title asc)
      [0...200] {
        title,
        description,
        url,
        category,
        keywords,
        priority,
        isActive
      }`;
    return await client.fetch(query, {}, { next: { revalidate: 300 } });
  } catch (error) {
    console.error('Failed to fetch searchable content:', error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchableContent = await getSearchableContent();

  return (
    <html lang="en" className={`${dmSans.variable} ${ibmPlexSans.variable}`} suppressHydrationWarning>
      <body className="font-body" suppressHydrationWarning>
        <TopNavigation searchableContent={searchableContent} />
        <main className="pt-16 min-h-screen overflow-x-clip">{children}</main>
      </body>
    </html>
  );
}
