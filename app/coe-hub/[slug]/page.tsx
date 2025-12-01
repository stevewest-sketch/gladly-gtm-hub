import { notFound } from 'next/navigation';
import Link from 'next/link';
import { client } from '@/lib/sanity';

interface CoeEntry {
  _id: string;
  title: string;
  slug: { current: string };
  summary?: string;
  headline?: string;
  entryType: string;
  proofType?: string;
  customer?: string;
  source?: string;
  proofSourceUrl?: string;
  howToUse?: string;
  reformattingRecommendations?: string;
  kpis?: string[];
  icon?: string;
  tags?: string[];
  externalUrl?: string;
  linkType?: string;
  toolType?: string;
  toolUrl?: string;
  ctaLabel?: string;
  benefits?: string[];
  account?: string;
  outcomes?: string;
  learnings?: string;
  positioning?: string;
  executiveSummaryUrl?: string;
  modelUrl?: string;
  recordingUrl?: string;
  section?: { _id: string; name: string; slug: { current: string }; icon: string };
  channels?: Array<{ name: string; icon: string }>;
  capabilities?: Array<{ name: string; icon: string }>;
  audiences?: Array<{ name: string; icon: string }>;
  industry?: { name: string; icon: string };
  permission?: { name: string; color: string };
  assetType?: { name: string; icon: string };
  additionalResources?: Array<{ label: string; url: string; resourceType: string }>;
  relatedEntries?: Array<{ _id: string; title: string; slug: { current: string }; entryType: string; icon?: string }>;
  _createdAt: string;
  _updatedAt: string;
}

async function getCoeEntry(slug: string): Promise<CoeEntry | null> {
  return client.fetch(`
    *[_type == "coeEntry" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      summary,
      headline,
      entryType,
      proofType,
      customer,
      source,
      proofSourceUrl,
      howToUse,
      reformattingRecommendations,
      kpis,
      icon,
      tags,
      externalUrl,
      linkType,
      toolType,
      toolUrl,
      ctaLabel,
      benefits,
      account,
      outcomes,
      learnings,
      positioning,
      executiveSummaryUrl,
      modelUrl,
      recordingUrl,
      "section": coeSection->{_id, name, slug, icon},
      "channels": channels[]->{name, icon},
      "capabilities": capabilities[]->{name, icon},
      "audiences": audiences[]->{name, icon},
      "industry": industry->{name, icon},
      "permission": permission->{name, color},
      "assetType": assetType->{name, icon},
      additionalResources,
      "relatedEntries": relatedEntries[]->{_id, title, slug, entryType, icon},
      _createdAt,
      _updatedAt
    }
  `, { slug }, { next: { revalidate: 60 } });
}

function getEntryTypeIcon(entryType: string): string {
  const icons: Record<string, string> = {
    'proof-point': '📊',
    'best-practice': '✨',
    'process-innovation': '💡',
    'internal-best-practice': '🏢',
    'tool': '🛠️',
    'meeting-asset': '📁',
  };
  return icons[entryType] || '📄';
}

function getEntryTypeLabel(entryType: string): string {
  const labels: Record<string, string> = {
    'proof-point': 'Proof Point',
    'best-practice': 'Best Practice',
    'process-innovation': 'Process Innovation',
    'internal-best-practice': 'Internal Best Practice',
    'tool': 'Tool',
    'meeting-asset': 'Meeting Asset',
  };
  return labels[entryType] || entryType;
}

function getProofTypeColor(proofType: string): string {
  const colors: Record<string, string> = {
    'stat': 'bg-green-100 text-green-700 border-green-200',
    'benchmark': 'bg-blue-100 text-blue-700 border-blue-200',
    'anecdote': 'bg-purple-100 text-purple-700 border-purple-200',
    'quote': 'bg-amber-100 text-amber-700 border-amber-200',
    'case-study': 'bg-pink-100 text-pink-700 border-pink-200',
  };
  return colors[proofType] || 'bg-gray-100 text-gray-700 border-gray-200';
}

function getPermissionColor(color: string): string {
  const colors: Record<string, string> = {
    'green': 'bg-green-100 text-green-700',
    'yellow': 'bg-yellow-100 text-yellow-700',
    'red': 'bg-red-100 text-red-700',
    'gray': 'bg-gray-100 text-gray-600',
  };
  return colors[color] || 'bg-gray-100 text-gray-600';
}

function getResourceTypeIcon(resourceType: string): string {
  const icons: Record<string, string> = {
    'document': '📄',
    'spreadsheet': '📊',
    'presentation': '📽️',
    'recording': '🎬',
    'link': '🔗',
  };
  return icons[resourceType] || '📄';
}

export default async function CoeEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getCoeEntry(slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/coe-hub" className="text-purple-600 hover:text-purple-700">CoE Hub</Link>
            <span className="text-gray-400">/</span>
            {entry.section && (
              <>
                <Link
                  href={`/coe-hub/section/${entry.section.slug.current}`}
                  className="text-purple-600 hover:text-purple-700"
                >
                  {entry.section.name}
                </Link>
                <span className="text-gray-400">/</span>
              </>
            )}
            <span className="text-gray-600 truncate max-w-[200px]">{entry.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
          {/* Entry Type Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{entry.icon || getEntryTypeIcon(entry.entryType)}</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              {getEntryTypeLabel(entry.entryType)}
            </span>
            {entry.proofType && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getProofTypeColor(entry.proofType)}`}>
                {entry.proofType}
              </span>
            )}
            {entry.permission && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPermissionColor(entry.permission.color)}`}>
                {entry.permission.name}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{entry.title}</h1>

          {/* Headline for proof points */}
          {entry.headline && entry.entryType === 'proof-point' && (
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4 rounded-r-lg">
              <p className="text-lg text-gray-800 font-medium">{entry.headline}</p>
            </div>
          )}

          {/* Summary */}
          {entry.summary && (
            <p className="text-gray-600 text-lg mb-6">{entry.summary}</p>
          )}

          {/* Customer/Account */}
          {(entry.customer || entry.account) && (
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <span className="font-medium">
                {entry.entryType === 'meeting-asset' ? 'Account:' : 'Customer:'}
              </span>
              <span>{entry.account || entry.customer}</span>
            </div>
          )}

          {/* Taxonomy badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {entry.section && (
              <Link
                href={`/coe-hub/section/${entry.section.slug.current}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {entry.section.icon} {entry.section.name}
              </Link>
            )}
            {entry.industry && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {entry.industry.icon} {entry.industry.name}
              </span>
            )}
            {entry.channels?.map((channel) => (
              <span key={channel.name} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                {channel.icon} {channel.name}
              </span>
            ))}
            {entry.capabilities?.map((cap) => (
              <span key={cap.name} className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                {cap.icon} {cap.name}
              </span>
            ))}
          </div>

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Proof Point Details */}
        {entry.entryType === 'proof-point' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Proof Point Details</h2>

            {entry.source && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Source</h3>
                {entry.proofSourceUrl ? (
                  <a href={entry.proofSourceUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">
                    {entry.source} →
                  </a>
                ) : (
                  <p className="text-gray-700">{entry.source}</p>
                )}
              </div>
            )}

            {entry.howToUse && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">How to Use</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{entry.howToUse}</p>
              </div>
            )}

            {entry.reformattingRecommendations && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Reformatting Recommendations</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{entry.reformattingRecommendations}</p>
              </div>
            )}

            {entry.kpis && entry.kpis.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">KPIs</h3>
                <div className="flex flex-wrap gap-2">
                  {entry.kpis.map((kpi) => (
                    <span key={kpi} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                      {kpi}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tool Details */}
        {entry.entryType === 'tool' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tool Details</h2>

            {entry.toolType && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Tool Type</h3>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                  {entry.toolType}
                </span>
              </div>
            )}

            {entry.benefits && entry.benefits.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Benefits</h3>
                <ul className="list-disc list-inside space-y-1">
                  {entry.benefits.map((benefit, i) => (
                    <li key={i} className="text-gray-700">{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {entry.toolUrl && (
              <a
                href={entry.toolUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                {entry.ctaLabel || 'Open Tool'} →
              </a>
            )}
          </div>
        )}

        {/* Meeting Asset Details */}
        {entry.entryType === 'meeting-asset' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Meeting Asset Details</h2>

            {entry.assetType && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Asset Type</h3>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {entry.assetType.icon} {entry.assetType.name}
                </span>
              </div>
            )}

            {entry.positioning && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Positioning</h3>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize">
                  {entry.positioning.replace('-', ' ')}
                </span>
              </div>
            )}

            {entry.outcomes && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Outcomes</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{entry.outcomes}</p>
              </div>
            )}

            {entry.learnings && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Learnings</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{entry.learnings}</p>
              </div>
            )}

            {/* Resource Links */}
            <div className="flex flex-wrap gap-3 mt-6">
              {entry.executiveSummaryUrl && (
                <a
                  href={entry.executiveSummaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                >
                  📄 Executive Summary
                </a>
              )}
              {entry.modelUrl && (
                <a
                  href={entry.modelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  📊 BVA Model
                </a>
              )}
              {entry.recordingUrl && (
                <a
                  href={entry.recordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                >
                  🎬 Recording
                </a>
              )}
            </div>
          </div>
        )}

        {/* External Link / Best Practice Link */}
        {entry.externalUrl && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <a
              href={entry.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              View Resource →
            </a>
          </div>
        )}

        {/* Additional Resources */}
        {entry.additionalResources && entry.additionalResources.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Resources</h2>
            <div className="space-y-3">
              {entry.additionalResources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-xl">{getResourceTypeIcon(resource.resourceType)}</span>
                  <span className="text-gray-700 font-medium">{resource.label}</span>
                  <span className="ml-auto text-purple-600">→</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Related Entries */}
        {entry.relatedEntries && entry.relatedEntries.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entry.relatedEntries.map((related) => (
                <Link
                  key={related._id}
                  href={`/coe-hub/${related.slug.current}`}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors group"
                >
                  <span className="text-xl">{related.icon || getEntryTypeIcon(related.entryType)}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                      {related.title}
                    </h3>
                    <span className="text-xs text-gray-500">{getEntryTypeLabel(related.entryType)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="text-center text-sm text-gray-400">
          <p>Last updated: {new Date(entry._updatedAt).toLocaleDateString()}</p>
        </div>

        {/* Back Links */}
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/coe-hub" className="text-purple-600 hover:text-purple-700 font-medium">
            ← Back to CoE Hub
          </Link>
          {entry.section && (
            <Link
              href={`/coe-hub/section/${entry.section.slug.current}`}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              View {entry.section.name} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
