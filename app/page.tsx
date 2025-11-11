import { client } from '@/lib/sanity';
import HeroWithSearchSection from '@/components/sections/HeroWithSearchSection';
import QuickNav from '@/components/QuickNav';
import TeamToolkitsSection from '@/components/sections/TeamToolkitsSection';
import QuickTasksSection from '@/components/sections/QuickTasksSection';
import ProductsGridSection from '@/components/sections/ProductsGridSection';
import WhatsNewSection from '@/components/sections/WhatsNewSection';
import PopularResourcesSection from '@/components/sections/PopularResourcesSection';
import HelpSection from '@/components/sections/HelpSection';

async function getHomepage() {
  const query = `*[_type == "homepage"][0]{
    heroTitle,
    heroSubtitle,
    searchPlaceholder,
    heroPaddingTop,
    quickNav,
    pageBuilder,
    teamToolkitsTitle,
    teamToolkitsSubtitle,
    teamToolkits,
    quickTasksTitle,
    quickTasks,
    productsTitle,
    productsSubtitle,
    products,
    whatsNewBadge,
    whatsNew,
    popularResourcesTitle,
    popularResources,
    helpSection
  }`;
  return await client.fetch(query);
}

function renderSection(section: any, index: number) {
  const { _type } = section;

  switch (_type) {
    case 'teamToolkitsSection':
      return (
        <TeamToolkitsSection
          key={index}
          sectionTitle={section.sectionTitle}
          sectionSubtitle={section.sectionSubtitle}
          toolkits={section.toolkits}
        />
      );

    case 'quickTasksSection':
      return (
        <QuickTasksSection
          key={index}
          sectionTitle={section.sectionTitle}
          tasks={section.tasks}
        />
      );

    case 'productsGridSection':
      return (
        <ProductsGridSection
          key={index}
          sectionTitle={section.sectionTitle}
          sectionSubtitle={section.sectionSubtitle}
          products={section.products}
        />
      );

    case 'whatsNewSection':
      return (
        <WhatsNewSection
          key={index}
          badgeText={section.badgeText}
          updates={section.updates}
        />
      );

    case 'popularResourcesSection':
      return (
        <PopularResourcesSection
          key={index}
          sectionTitle={section.sectionTitle}
          resources={section.resources}
        />
      );

    case 'helpSection':
      return (
        <HelpSection
          key={index}
          title={section.title}
          description={section.description}
          buttons={section.buttons}
        />
      );

    default:
      return null;
  }
}

export default async function Home() {
  const homepage = await getHomepage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Always at Top */}
      <HeroWithSearchSection
        heroTitle={homepage?.heroTitle || 'The GTM Hub'}
        heroSubtitle={homepage?.heroSubtitle || 'Your central hub for selling, supporting, and growing with Gladly'}
        searchPlaceholder={homepage?.searchPlaceholder || 'Search for battle cards, templates, demos, product info...'}
        paddingTop={homepage?.heroPaddingTop || 'medium'}
      />

      {/* Quick Navigation */}
      {homepage?.quickNav && homepage.quickNav.length > 0 && (
        <QuickNav links={homepage.quickNav} />
      )}

      {/* Page Builder Content */}
      <div className="max-w-[1200px] mx-auto px-10 py-[50px]">
        {homepage?.pageBuilder && homepage.pageBuilder.length > 0 ? (
          homepage.pageBuilder.map((section: any, index: number) =>
            renderSection(section, index)
          )
        ) : (
          // Legacy fallback if no pageBuilder
          <LegacyContent homepage={homepage} />
        )}
      </div>
    </div>
  );
}

function LegacyContent({ homepage }: { homepage: any }) {
  if (!homepage) return null;

  return (
    <>
      {/* Team Toolkits */}
      {homepage?.teamToolkits && homepage.teamToolkits.length > 0 && (
        <TeamToolkitsSection
          sectionTitle={homepage.teamToolkitsTitle}
          sectionSubtitle={homepage.teamToolkitsSubtitle}
          toolkits={homepage.teamToolkits}
        />
      )}

      {/* Quick Tasks */}
      {homepage?.quickTasks && homepage.quickTasks.length > 0 && (
        <QuickTasksSection
          sectionTitle={homepage.quickTasksTitle}
          tasks={homepage.quickTasks}
        />
      )}

      {/* Products */}
      {homepage?.products && homepage.products.length > 0 && (
        <ProductsGridSection
          sectionTitle={homepage.productsTitle}
          sectionSubtitle={homepage.productsSubtitle}
          products={homepage.products}
        />
      )}

      {/* What's New */}
      {homepage?.whatsNew && homepage.whatsNew.length > 0 && (
        <WhatsNewSection
          badgeText={homepage.whatsNewBadge}
          updates={homepage.whatsNew}
        />
      )}

      {/* Popular Resources */}
      {homepage?.popularResources && homepage.popularResources.length > 0 && (
        <PopularResourcesSection
          sectionTitle={homepage.popularResourcesTitle || 'Most Useful Resources'}
          resources={homepage.popularResources}
        />
      )}

      {/* Help Section */}
      {homepage?.helpSection && (
        <HelpSection
          title={homepage.helpSection.title}
          description={homepage.helpSection.description}
          buttons={homepage.helpSection.buttons}
        />
      )}
    </>
  );
}
