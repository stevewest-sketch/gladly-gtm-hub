import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

async function getAbout() {
  const query = `*[_type == "about"][0]{
    title,
    image,
    body
  }`;
  return await client.fetch(query);
}

export default async function About() {
  const about = await getAbout();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          {about?.title || "About Us"}
        </h1>

        {about?.image && (
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={urlFor(about.image).url()}
              alt={about.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none bg-white rounded-lg p-8 shadow-md">
          {about?.body ? (
            <PortableText value={about.body} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No content yet.</p>
              <p className="text-sm text-gray-500">
                Add content to your About page through the Sanity Studio.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
