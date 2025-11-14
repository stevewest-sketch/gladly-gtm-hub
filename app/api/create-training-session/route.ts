import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/sanity-admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      enablementArticleId,
      title,
      summary,
      category,
      audience,
      tags,
      slug,
      publishedDate,
    } = body;

    if (!enablementArticleId || !title || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    //Map category to productLabel for training sessions
    const categoryMap: Record<string, string> = {
      Product: 'Product',
      Toolkit: 'Sales Skills',
      Competitive: 'Competitive',
      Learning: 'Professional Skills',
      CoE: 'GTM Strategy',
      Resources: 'Professional Skills',
    };

    const productLabel = categoryMap[category] || 'Product';

    // Format date for display
    const date = publishedDate ? new Date(publishedDate) : new Date();
    const dateDisplay = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Create training session document
    const trainingSession = await adminClient.create({
      _type: 'trainingSession',
      title: title,
      date: date.toISOString(),
      dateDisplay: dateDisplay,
      product: 'all', // Default to all products
      productLabel: productLabel,
      description: summary || 'AI-generated training session from transcript',
      duration: '', // Can be filled manually later
      materials: 'Article + Recording', // Indicate both are available
      link: `/enablement/articles/${slug}`, // Link to the article page
      tags: tags || [],
      dateFilter: '30days', // Default to recent
      // Store reference to the enablement article
      enablementArticle: {
        _type: 'reference',
        _ref: enablementArticleId,
      },
    });

    return NextResponse.json({
      success: true,
      trainingSessionId: trainingSession._id,
    });
  } catch (error: unknown) {
    console.error('Error creating training session:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to create training session', message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create training session', message: 'Unknown error' },
      { status: 500 }
    );
  }
}
