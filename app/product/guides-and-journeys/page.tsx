import { client } from '@/lib/sanity';
import QuickNav from '@/components/QuickNav';
import HeroSection from '@/components/sections/HeroSection';
import FeatureGridSection from '@/components/sections/FeatureGridSection';
import ContentSection from '@/components/sections/ContentSection';
import CTASection from '@/components/sections/CTASection';

async function getPage(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    title,
    quickNav,
    pageBuilder
  }`;
  return await client.fetch(query, { slug });
}

function renderSection(section: any, index: number) {
  const { _type } = section;

  switch (_type) {
    case 'heroSection':
      return <HeroSection key={index} {...section} />;
    case 'featureGridSection':
      return <FeatureGridSection key={index} {...section} />;
    case 'contentSection':
      return <ContentSection key={index} {...section} />;
    case 'ctaSection':
      return <CTASection key={index} {...section} />;
    default:
      return null;
  }
}

export default async function Page() {
  const page = await getPage('guides-and-journeys');

  if (!page || !page.pageBuilder) {
    return <div className="p-8">Page not found</div>;
  }

  // Separate sections by type to match original HTML structure
  const heroSection = page.pageBuilder.find((s: any) => s._type === 'heroSection');
  const darkSections = page.pageBuilder.filter((s: any) => s._type === 'contentSection' && s.backgroundColor === 'dark');
  const otherSections = page.pageBuilder.filter((s: any) => s._type !== 'heroSection' && !(s._type === 'contentSection' && s.backgroundColor === 'dark'));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero FIRST */}
      {heroSection && renderSection(heroSection, 0)}

      {/* Then QuickNav */}
      {page.quickNav && <QuickNav links={page.quickNav} />}

      {/* Dark background sections (full-width, outside container) */}
      {darkSections.map((section: any, index: number) => renderSection(section, index + 1))}

      {/* Container for all other sections */}
      <div className="max-w-[1200px] mx-auto px-10 pt-[50px] pb-[50px]">
        {otherSections.map((section: any, index: number) => renderSection(section, index + darkSections.length + 1))}
      </div>
    </div>
  );
}
