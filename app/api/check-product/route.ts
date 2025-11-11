import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug') || 'sidekick-standalone';

    const query = `*[_type == "page" && slug.current == $slug][0]{
      title,
      subtitle,
      heroColor,
      content,
      sections,
      quickNav,
      pageBuilder
    }`;

    const data = await client.fetch(query, { slug });

    return NextResponse.json({
      slug,
      found: !!data,
      data
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
