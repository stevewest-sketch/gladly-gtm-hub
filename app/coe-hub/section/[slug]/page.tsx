import { notFound } from 'next/navigation';
import Link from 'next/link';
import { client } from '@/lib/sanity';

interface CoeSection {
  _id: string;
  name: string;
  slug: { current: string };
  icon: string;
  description: string;
}

interface CoeEntry {
  _id: string;
  title: string;
  slug: { current: string };
  summary?: string;
  headline?: string;
  entryType: string;
  proofType?: string;
  customer?: string;
  icon?: string;
  featured?: boolean;
  permission?: { name: string; color: string };
  _createdAt: string;
}

async function getCoeSection(slug: string): Promise<CoeSection | null> {
  return client.fetch(`
    *[_type == "coeSection" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      icon,
      description
    }
  `, { slug }, { next: { revalidate: 60 } });
}

async function getSectionEntries(sectionId: string): Promise<CoeEntry[]> {
  return client.fetch(`
    *[_type == "coeEntry" && coeSection._ref == $sectionId] | order(featured desc, _createdAt desc) {
      _id,
      title,
      slug,
      summary,
      headline,
      entryType,
      proofType,
      customer,
      icon,
      featured,
      "permission": permission->{name, color},
      _createdAt
    }
  `, { sectionId }, { next: { revalidate: 60 } });
}

async function getAllSections(): Promise<CoeSection[]> {
  return client.fetch(`
    *[_type == "coeSection"] | order(order asc) {
      _id,
      name,
      slug,
      icon,
      description
    }
  `, {}, { next: { revalidate: 60 } });
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

export default async function CoeSectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [section, allSections] = await Promise.all([
    getCoeSection(slug),
    getAllSections(),
  ]);

  if (!section) {
    notFound();
  }

  const entries = await getSectionEntries(section._id);

  // Group entries by entry type
  const groupedEntries = entries.reduce((acc, entry) => {
    const type = entry.entryType;
    if (!acc[type]) acc[type] = [];
    acc[type].push(entry);
    return acc;
  }, {} as Record<string, CoeEntry[]>);

  const entryTypes = Object.keys(groupedEntries);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-purple-200 mb-6">
            <Link href="/coe-hub" className="hover:text-white">CoE Hub</Link>
            <span>/</span>
            <span className="text-white">{section.name}</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{section.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{section.name}</h1>
              <p className="text-purple-200 mt-1">{entries.length} resources</p>
            </div>
          </div>
          {section.description && (
            <p className="text-lg text-purple-100 max-w-2xl mt-4">{section.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Section Navigation */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Sections</h3>
              <nav className="space-y-1">
                {allSections.map((s) => (
                  <Link
                    key={s._id}
                    href={`/coe-hub/section/${s.slug.current}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      s._id === section._id
                        ? 'bg-purple-100 text-purple-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{s.icon}</span>
                    <span>{s.name}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t">
                <Link
                  href="/coe-hub"
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  ← Back to CoE Hub
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Entry Type Filter Chips */}
            {entryTypes.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {entryTypes.map((type) => (
                  <a
                    key={type}
                    href={`#${type}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm hover:border-purple-300 transition-colors"
                  >
                    <span>{getEntryTypeIcon(type)}</span>
                    <span>{getEntryTypeLabel(type)}</span>
                    <span className="text-gray-400 ml-1">({groupedEntries[type].length})</span>
                  </a>
                ))}
              </div>
            )}

            {/* Entries by Type */}
            {entryTypes.map((type) => (
              <section key={type} id={type} className="mb-12 scroll-mt-24">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{getEntryTypeIcon(type)}</span>
                  <h2 className="text-xl font-semibold text-gray-900">{getEntryTypeLabel(type)}s</h2>
                  <span className="text-sm text-gray-400">({groupedEntries[type].length})</span>
                </div>

                <div className="grid gap-4">
                  {groupedEntries[type].map((entry) => (
                    <Link
                      key={entry._id}
                      href={`/coe-hub/${entry.slug.current}`}
                      className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-purple-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-2xl shrink-0">{entry.icon || getEntryTypeIcon(entry.entryType)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            {entry.featured && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                Featured
                              </span>
                            )}
                            {entry.proofType && (
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${getProofTypeColor(entry.proofType)}`}>
                                {entry.proofType}
                              </span>
                            )}
                            {entry.permission && (
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getPermissionColor(entry.permission.color)}`}>
                                {entry.permission.name}
                              </span>
                            )}
                            {entry.customer && entry.customer !== 'N/A' && (
                              <span className="text-xs text-gray-500">{entry.customer}</span>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                            {entry.title}
                          </h3>
                          {(entry.summary || entry.headline) && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {entry.summary || entry.headline}
                            </p>
                          )}
                        </div>
                        <span className="text-gray-400 group-hover:text-purple-600 transition-colors shrink-0">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}

            {entries.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-2">No entries in this section yet</p>
                <p className="text-gray-400 text-sm">Check back soon for new content</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
