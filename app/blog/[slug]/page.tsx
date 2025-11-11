import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    body,
    publishedAt
  }`;
  return await client.fetch(query, { slug });
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Post not found</h1>
          <p className="text-gray-600">The blog post you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {post.title}
          </h1>
          {post.publishedAt && (
            <time className="text-gray-600">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}
        </header>

        {post.mainImage && (
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none bg-white rounded-lg p-8 shadow-md">
          <PortableText value={post.body} />
        </div>
      </article>
    </div>
  );
}
