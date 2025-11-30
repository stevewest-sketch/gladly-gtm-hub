import { client } from '@/lib/sanity';
import ContentHub from './ContentHub';

// GROQ query to fetch catalog entries published to Content Hub
const query = `{
  "entries": *[
    _type == "catalogEntry" &&
    status == "published" &&
    "content" in publishedTo &&
    contentType->slug.current != "training" &&
    pageTemplate != "training-session"
  ] | order(publishDate desc) {
    _id,
    title,
    description,
    slug,
    contentType->{
      _id,
      name,
      slug,
      icon,
      color
    },
    format,
    publishDate,
    duration,
    presenter,
    thumbnailImage{
      asset->{
        _id,
        url
      }
    },
    externalUrl,
    featured,
    showInUpcoming,
    priority,
    viewCount,
    products[]->{
      _id,
      name,
      slug,
      color
    },
    teams[]->{
      _id,
      name,
      slug
    },
    topics[]->{
      _id,
      name,
      slug
    },
    journeyStages[]->{
      _id,
      name,
      slug,
      icon
    }
  },
  "products": *[_type == "product"] | order(order asc, name asc) {
    _id,
    name,
    slug,
    color
  },
  "teams": *[_type == "team"] | order(order asc, name asc) {
    _id,
    name,
    slug
  },
  "topics": *[_type == "topic"] | order(order asc, name asc) {
    _id,
    name,
    slug
  },
  "contentTypes": *[_type == "contentType"] | order(order asc, name asc) {
    _id,
    name,
    slug,
    icon,
    color
  }
}`;

export default async function ContentPage() {
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
          <div className="text-6xl mb-4">📚</div>
          <h1 className="font-display text-2xl font-bold text-v2-gray-700 mb-3">
            Content Hub
          </h1>
          <p className="font-body text-v2-gray-600 mb-6">
            No catalog entries found. Create your first catalog entry in Sanity
            Studio.
          </p>
          <a
            href="/studio"
            className="inline-block bg-hub-content-primary text-white px-6 py-3 rounded-v2-md font-semibold hover:bg-hub-content-dark transition-all"
          >
            Go to Sanity Studio
          </a>
        </div>
      </div>
    );
  }

  // Pass Sanity data to client component
  return (
    <ContentHub
      entries={data.entries}
      products={data.products}
      teams={data.teams}
      topics={data.topics}
      contentTypes={data.contentTypes}
    />
  );
}

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Content Hub | Gladly Enablement',
    description:
      'Your repository for templates, collateral, and competitive intelligence. Everything you need to win deals and enable success.',
  };
}
