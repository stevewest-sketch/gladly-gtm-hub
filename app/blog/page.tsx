import { client } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

async function getPosts() {
  const query = `*[_type == "post" && !(_id in path("drafts.**"))]
    | order(publishedAt desc)
    [0...50] {
      _id,
      title,
      slug,
      excerpt,
      "imageUrl": mainImage.asset->url,
      publishedAt
    }`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Blog</h1>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <article
                key={post._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {post.imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-gray-900">
                    <Link href={`/blog/${post.slug.current}`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  )}
                  {post.publishedAt && (
                    <time className="text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">No blog posts yet.</p>
            <p className="text-sm text-gray-500">
              Add your first post through the{" "}
              <Link href="/studio" className="text-blue-600 hover:underline">
                Sanity Studio
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
