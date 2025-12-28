import { client } from '@/lib/sanity';
import { CoEHubV2 } from './CoEHubV2';

// GROQ query to fetch catalog entries and collections for CoE Hub
const query = `{
  "entries": *[
    _type == "catalogEntry" &&
    status == "published" &&
    "coe" in publishedTo
  ] | order(publishDate desc) {
    _id,
    _updatedAt,
    title,
    slug,
    description,
    coeType,
    teams,
    displayPriority,
    featured,
    publishDate,
    thumbnailImage{
      asset->{
        _id,
        url
      }
    },
    externalUrl,
    videoUrl,
    slidesUrl,
    // Proof point specific fields
    customer,
    isBlindCustomer,
    kpiCategory,
    productTags,
    channelTag,
    approvedForExternal,
    externalLinks[]{
      title,
      url
    },
    coeHubCollections[]{
      collection->{
        _id,
        name,
        slug,
        icon,
        color
      },
      subsections
    }
  },
  "collections": *[
    _type == "collection" &&
    hub == "coe" &&
    isEnabled == true
  ] | order(order asc) {
    _id,
    name,
    slug,
    hub,
    description,
    icon,
    color,
    order,
    showInNavigation,
    isEnabled,
    subsections[]{
      name,
      icon,
      filterLogic,
      maxItems,
      order
    }
  }
}`;

export default async function CoeHubPage() {
  // Fetch all catalog entries and collections from Sanity
  const data = await client.fetch(
    query,
    {},
    {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    }
  );

  // If no data, show message to create content in Sanity
  if (!data.entries || data.entries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-2xl font-bold text-gray-700 mb-3">
            Center of Excellence
          </h1>
          <p className="text-gray-600 mb-6">
            No CoE content found. Create your first catalog entry in
            Sanity Studio and publish it to the CoE Hub.
          </p>
          <a
            href="/studio"
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-all"
          >
            Go to Sanity Studio
          </a>
        </div>
      </div>
    );
  }

  // Pass Sanity data to client component (matching HTML mock design)
  return (
    <CoEHubV2
      entries={data.entries}
      collections={data.collections || []}
    />
  );
}

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Center of Excellence | Gladly Revenue Enablement',
    description:
      'Customer success stories, best practices, and proven strategies from the field.',
  };
}
