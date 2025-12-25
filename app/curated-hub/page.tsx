import { client } from '@/lib/sanity';
import { CuratedHub } from './CuratedHub';

// GROQ query to fetch catalog entries and collections for Curated Hub
const query = `{
  "entries": *[
    _type == "catalogEntry" &&
    status == "published" &&
    "curated" in publishedTo
  ] | order(publishDate desc) {
    _id,
    title,
    slug,
    description,
    contentType->{
      _id,
      name,
      slug,
      icon,
      color
    },
    format,
    teams,
    displayPriority,
    featured,
    publishDate,
    _updatedAt,
    thumbnailImage{
      asset->{
        _id,
        url
      }
    },
    externalUrl,
    videoUrl,
    slidesUrl,
    curatedHubCollections[]{
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
    hub == "curated" &&
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

export default async function CuratedHubPage() {
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
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-2xl font-bold text-gray-700 mb-3">
            Curated Hub
          </h1>
          <p className="text-gray-600 mb-6">
            No curated content found. Create your first catalog entry in
            Sanity Studio and publish it to the Curated Hub.
          </p>
          <a
            href="/studio"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
          >
            Go to Sanity Studio
          </a>
        </div>
      </div>
    );
  }

  // Pass Sanity data to client component
  return (
    <CuratedHub
      entries={data.entries}
      collections={data.collections || []}
    />
  );
}

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Curated Hub | Gladly Revenue Enablement',
    description:
      'Hand-picked content from across all hubs. The best resources curated for your success.',
  };
}
