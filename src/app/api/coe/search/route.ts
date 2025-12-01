import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get('q') || '';
  const entryType = searchParams.get('type');
  const section = searchParams.get('section');
  const channel = searchParams.get('channel');
  const capability = searchParams.get('capability');
  const audience = searchParams.get('audience');
  const industry = searchParams.get('industry');
  const product = searchParams.get('product');
  const proofType = searchParams.get('proofType');
  const permission = searchParams.get('permission');
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');
  const sortBy = searchParams.get('sort') || 'priority';

  // Build filter conditions
  const conditions: string[] = ['_type == "coeEntry"'];

  // Text search
  if (query) {
    conditions.push(`(
      title match $query ||
      summary match $query ||
      headline match $query ||
      customer match $query ||
      account match $query ||
      lower($queryLower) in tags[]
    )`);
  }

  // Entry type filter
  if (entryType) {
    conditions.push('entryType == $entryType');
  }

  // Section filter
  if (section) {
    conditions.push('coeSection._ref == $section');
  }

  // Channel filter
  if (channel) {
    conditions.push('$channel in channels[]._ref');
  }

  // Capability filter
  if (capability) {
    conditions.push('$capability in capabilities[]._ref');
  }

  // Audience filter
  if (audience) {
    conditions.push('$audience in audiences[]._ref');
  }

  // Industry filter
  if (industry) {
    conditions.push('industry._ref == $industry');
  }

  // Product filter
  if (product) {
    conditions.push('product == $product');
  }

  // Proof type filter
  if (proofType) {
    conditions.push('proofType == $proofType');
  }

  // Permission filter
  if (permission) {
    conditions.push('permission._ref == $permission');
  }

  // Build sort order
  const sortOrders: Record<string, string> = {
    priority: 'priority desc, _updatedAt desc',
    updated: '_updatedAt desc',
    created: '_createdAt desc',
    title: 'title asc',
    customer: 'customer asc',
  };
  const orderBy = sortOrders[sortBy] || sortOrders.priority;

  // Build the full query
  const groqQuery = `{
    "results": *[${conditions.join(' && ')}] | order(${orderBy}) [$offset...$end] {
      _id,
      _updatedAt,
      _createdAt,
      entryType,
      title,
      slug,
      summary,
      headline,
      proofType,
      customer,
      account,
      toolType,
      featured,
      priority,
      "coeSection": coeSection->{_id, name, slug, icon},
      "industry": industry->{_id, name, icon},
      "permission": permission->{_id, name, color},
      "channels": channels[]->{_id, name, icon},
      "audiences": audiences[]->{_id, name, icon}
    },
    "total": count(*[${conditions.join(' && ')}]),
    "facets": {
      "entryTypes": *[_type == "coeEntry"] {entryType} | order(entryType asc),
      "sections": *[_type == "coeSection"] | order(order asc) {
        "_id": _id,
        "name": name,
        "icon": icon,
        "count": count(*[_type == "coeEntry" && coeSection._ref == ^._id])
      },
      "channels": *[_type == "coeChannel"] | order(order asc) {
        "_id": _id,
        "name": name,
        "icon": icon,
        "count": count(*[_type == "coeEntry" && ^._id in channels[]._ref])
      },
      "industries": *[_type == "coeIndustry"] | order(order asc) {
        "_id": _id,
        "name": name,
        "icon": icon,
        "count": count(*[_type == "coeEntry" && industry._ref == ^._id])
      },
      "audiences": *[_type == "coeAudience"] | order(order asc) {
        "_id": _id,
        "name": name,
        "icon": icon,
        "count": count(*[_type == "coeEntry" && ^._id in audiences[]._ref])
      }
    }
  }`;

  try {
    const result = await client.fetch(groqQuery, {
      query: query ? `*${query}*` : '',
      queryLower: query?.toLowerCase() || '',
      entryType,
      section,
      channel,
      capability,
      audience,
      industry,
      product,
      proofType,
      permission,
      offset,
      end: offset + limit,
    });

    // Deduplicate and count entry types
    const entryTypeCounts: Record<string, number> = {};
    result.facets.entryTypes.forEach((item: { entryType: string }) => {
      if (item.entryType) {
        entryTypeCounts[item.entryType] = (entryTypeCounts[item.entryType] || 0) + 1;
      }
    });

    const entryTypeFacets = Object.entries(entryTypeCounts).map(([value, count]) => ({
      value,
      count,
    }));

    return NextResponse.json({
      results: result.results,
      total: result.total,
      facets: {
        entryTypes: entryTypeFacets,
        sections: result.facets.sections,
        channels: result.facets.channels,
        industries: result.facets.industries,
        audiences: result.facets.audiences,
      },
      pagination: {
        offset,
        limit,
        hasMore: offset + limit < result.total,
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
