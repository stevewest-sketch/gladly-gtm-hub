import { client } from '@/lib/sanity';
import EnablementHub from './EnablementHub';

// GROQ query to fetch catalog entries published to Enablement Hub
const query = `{
  "entries": *[
    _type == "catalogEntry" &&
    status == "published" &&
    "enablement" in publishedTo
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
    pageTemplate,
    format,
    audiences[]->{
      _id,
      name,
      slug
    },
    learningPaths[]->{
      _id,
      name,
      slug,
      description,
      icon,
      color,
      order
    },
    products[]->{
      _id,
      name,
      slug,
      color
    },
    enablementCategory,
    publishDate,
    duration,
    difficulty,
    presenter,
    thumbnailImage{
      asset->{
        _id,
        url
      }
    },
    externalUrl,
    featured,
    priority,
    showInUpcoming
  },
  "audiences": *[_type == "audience"] | order(order asc, name asc) {
    _id,
    name,
    slug
  },
  "learningPaths": *[_type == "learningPath"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    icon,
    color,
    order
  },
  "products": *[_type == "product"] | order(order asc, name asc) {
    _id,
    name,
    slug,
    color
  }
}`;

export default async function EnablementPage() {
  // Fetch all catalog entries and taxonomies from Sanity
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
      <div className="min-h-screen bg-v2-gray-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="font-display text-2xl font-bold text-v2-gray-700 mb-3">
            Enablement Hub
          </h1>
          <p className="font-body text-v2-gray-600 mb-6">
            No enablement content found. Create your first catalog entry in
            Sanity Studio and publish it to the Enablement Hub.
          </p>
          <a
            href="/studio"
            className="inline-block bg-hub-enablement-primary text-white px-6 py-3 rounded-v2-md font-semibold hover:bg-hub-enablement-dark transition-all"
          >
            Go to Sanity Studio
          </a>
        </div>
      </div>
    );
  }

  // Pass Sanity data to client component
  return (
    <EnablementHub
      entries={data.entries}
      audiences={data.audiences || []}
      learningPaths={data.learningPaths || []}
      products={data.products || []}
    />
  );
}

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Enablement Hub | Gladly Revenue Enablement',
    description:
      'Your learning center for product enablement, certifications, and skill development. Everything you need to master Gladly.',
  };
}
