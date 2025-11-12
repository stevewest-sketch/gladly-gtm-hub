import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { client } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "GTM Hub - Gladly Revenue Enablement",
  description: "Your central hub for selling, supporting, and growing with Gladly",
};

interface NavigationChild {
  title: string;
  href: string;
  activeColor: string;
}

interface NavigationItem {
  title: string;
  icon?: string;
  href?: string;
  defaultExpanded: boolean;
  activeColor: string;
  children?: NavigationChild[];
}

interface NavigationData {
  logoText: string;
  items: NavigationItem[];
}

interface SearchableItem {
  title: string;
  description: string;
  url: string;
  category: string;
  keywords: string[];
  priority: number;
  isActive: boolean;
}

async function getNavigation(): Promise<NavigationData | null> {
  try {
    const query = `*[_type == "navigation" && _id == "navigation"][0] {
      logoText,
      items
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error('Failed to fetch navigation:', error);
    return null;
  }
}

async function getSearchableContent(): Promise<SearchableItem[]> {
  try {
    const query = `*[_type == "searchableContent" && isActive == true] | order(priority desc, title asc) {
      title,
      description,
      url,
      category,
      keywords,
      priority,
      isActive
    }`;
    return await client.fetch(query);
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
  const navigationData = await getNavigation();
  const searchableContent = await getSearchableContent();

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="flex">
          <Navigation data={navigationData} searchableContent={searchableContent} />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
