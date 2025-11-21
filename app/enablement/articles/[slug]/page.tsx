import { client } from '@/lib/sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import QuickNav from '@/components/QuickNav';

interface EnablementArticle {
  _id: string;
  title: string;
  slug: { current: string };
  summary: string;
  category: string;
  contentType: string;
  audience: string;
  keyTakeaways?: string[];
  sections?: Array<{
    heading: string;
    content: string;
  }>;
  actionItems?: string[];
  videoUrl?: string;
  slidesUrl?: string;
  transcriptUrl?: string;
  keyAssetUrl?: string;
  keyAssetLabel?: string;
  tags?: string[];
  readingTime?: string;
  publishedDate: string;
}

async function getEnablementArticle(slug: string): Promise<EnablementArticle | null> {
  const query = `*[_type == "enablementArticle" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    summary,
    category,
    contentType,
    audience,
    keyTakeaways,
    sections,
    actionItems,
    videoUrl,
    slidesUrl,
    transcriptUrl,
    keyAssetUrl,
    keyAssetLabel,
    tags,
    readingTime,
    publishedDate
  }`;

  return await client.fetch(query, { slug });
}

function getCategoryStyles(category: string) {
  const styles: Record<string, { gradient: string; badge: string; text: string; hoverColor: string }> = {
    Product: {
      gradient: 'bg-gradient-to-br from-[#4A90E2] to-[#357ABD]',
      badge: 'bg-white/20',
      text: 'text-[#4A90E2]',
      hoverColor: 'hover:border-[#4A90E2]',
    },
    Toolkit: {
      gradient: 'bg-gradient-to-br from-[#8C69F0] to-[#7557d9]',
      badge: 'bg-white/20',
      text: 'text-[#8C69F0]',
      hoverColor: 'hover:border-[#8C69F0]',
    },
    Competitive: {
      gradient: 'bg-gradient-to-br from-[#FF6B35] to-[#F7931E]',
      badge: 'bg-white/20',
      text: 'text-[#FF6B35]',
      hoverColor: 'hover:border-[#FF6B35]',
    },
    Learning: {
      gradient: 'bg-gradient-to-br from-[#10B981] to-[#059669]',
      badge: 'bg-white/20',
      text: 'text-[#10B981]',
      hoverColor: 'hover:border-[#10B981]',
    },
    CoE: {
      gradient: 'bg-gradient-to-br from-[#0D0D0D] via-[#2D2D2D] to-[#1A1A1A]',
      badge: 'bg-white/10 border border-white/20',
      text: 'text-[#8C69F0]',
      hoverColor: 'hover:border-[#8C69F0]',
    },
    Resources: {
      gradient: 'bg-gradient-to-br from-[#6366F1] to-[#4F46E5]',
      badge: 'bg-white/20',
      text: 'text-[#6366F1]',
      hoverColor: 'hover:border-[#6366F1]',
    },
  };
  return styles[category] || styles.Product;
}

export default async function EnablementArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getEnablementArticle(slug);

  if (!article) {
    notFound();
  }

  const categoryStyles = getCategoryStyles(article.category);

  // Build QuickNav links dynamically based on available sections
  const quickNavLinks = [
    article.videoUrl && { label: 'Video', anchor: 'video' },
    article.keyTakeaways && article.keyTakeaways.length > 0 && { label: 'Takeaways', anchor: 'takeaways' },
    article.sections && article.sections.length > 0 && { label: 'Why This Matters', anchor: 'details' },
    article.actionItems && article.actionItems.length > 0 && { label: 'Actions', anchor: 'actions' },
  ].filter(Boolean) as { label: string; anchor: string }[];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className={`${categoryStyles.gradient} text-white py-[60px]`}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <span className={`${categoryStyles.badge} px-4 py-2 rounded text-sm font-semibold`}>
              {article.category}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded text-sm font-semibold">
              {article.contentType}
            </span>
          </div>
          <h1 className="text-[48px] font-bold mb-4 leading-tight max-w-4xl">{article.title}</h1>
          <p className="text-[20px] opacity-95 leading-relaxed max-w-3xl mb-6">{article.summary}</p>
        </div>
      </div>

      {/* Quick Navigation */}
      <QuickNav links={quickNavLinks} />

      {/* Main Content Container */}
      <div className="max-w-[1400px] mx-auto px-6 pt-[50px] pb-[50px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Column (2/3) */}
          <div className="lg:col-span-2">
            {/* Video Section */}
            {article.videoUrl && (
              <section id="video" className="mb-[60px]">
                <div className="bg-white border-2 border-[#F3F3F3] rounded-lg overflow-hidden shadow-sm">
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <a
                      href={article.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-center hover:opacity-80 transition-opacity"
                    >
                      <div className="text-6xl mb-4">▶️</div>
                      <p className="text-sm opacity-75">Session Recording</p>
                      <p className="text-xs opacity-60 mt-2">
                        {article.readingTime && `${article.readingTime} • `}Click to watch
                      </p>
                    </a>
                  </div>
                </div>
              </section>
            )}

            {/* Key Takeaways Section */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <section id="takeaways" className="mb-[60px]">
                <h2 className="text-[32px] font-bold mb-6 text-[#0D0D0D]">Key Takeaways</h2>
                <div className="grid grid-cols-1 gap-4">
                  {article.keyTakeaways.map((takeaway, index) => (
                    <div
                      key={index}
                      className={`bg-white border-2 border-[#F3F3F3] rounded-lg p-6 ${categoryStyles.hoverColor} hover:shadow-lg hover:-translate-y-1 transition-all`}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8C69F0] text-white flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-[15px] text-[#0D0D0D] leading-relaxed flex-1">
                          {takeaway}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Content Sections */}
            {article.sections && article.sections.length > 0 && (
              <section id="details" className="mb-[60px]">
                <h2 className="text-[32px] font-bold mb-6 text-[#0D0D0D]">Why This Matters</h2>
                <div className="space-y-6">
                  {article.sections.map((section, index) => (
                    <div
                      key={index}
                      className={`bg-white border-2 border-[#F3F3F3] rounded-lg p-8 ${categoryStyles.hoverColor} transition-all`}
                    >
                      <h3 className="text-[24px] font-bold mb-4 text-[#0D0D0D]">
                        {section.heading}
                      </h3>
                      <div className="text-[15px] text-[#0D0D0D] leading-relaxed whitespace-pre-wrap">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Action Items */}
            {article.actionItems && article.actionItems.length > 0 && (
              <section id="actions" className="mb-[60px]">
                <h2 className="text-[32px] font-bold mb-6 text-[#0D0D0D]">Next Steps</h2>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
                  <div className="space-y-4">
                    {article.actionItems.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-[#8C69F0] transition-all"
                      >
                        <div className="flex gap-4 items-start">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8C69F0] text-white flex items-center justify-center text-xs font-bold">
                            ✓
                          </div>
                          <span className="text-[15px] text-[#0D0D0D] font-medium flex-1">
                            {item}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar (1/3) */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Presentation Slides */}
              {article.slidesUrl && (
                <a
                  href={article.slidesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#8C69F0] text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-[#7557d9] hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  📄 Download Training Slides
                </a>
              )}

              {/* Quick Access Buttons */}
              {(article.transcriptUrl || article.slidesUrl || article.keyAssetUrl) && (
                <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-[#0D0D0D]">Quick Access</h3>
                  <div className="space-y-3">
                    {article.transcriptUrl && (
                      <a
                        href={article.transcriptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full bg-white border-2 border-[#F3F3F3] text-[#0D0D0D] py-3 px-4 rounded-lg font-semibold hover:border-[#009B00] hover:bg-[#DCFCE7] hover:shadow-md transition-all group"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-lg">📄</span>
                          <span>Meeting Transcript</span>
                        </span>
                        <svg className="w-4 h-4 opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {article.slidesUrl && (
                      <a
                        href={article.slidesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full bg-white border-2 border-[#F3F3F3] text-[#0D0D0D] py-3 px-4 rounded-lg font-semibold hover:border-[#009B00] hover:bg-[#DCFCE7] hover:shadow-md transition-all group"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-lg">📊</span>
                          <span>Enablement Deck</span>
                        </span>
                        <svg className="w-4 h-4 opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {article.keyAssetUrl && (
                      <a
                        href={article.keyAssetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full bg-white border-2 border-[#F3F3F3] text-[#0D0D0D] py-3 px-4 rounded-lg font-semibold hover:border-[#009B00] hover:bg-[#DCFCE7] hover:shadow-md transition-all group"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-lg">🎯</span>
                          <span>{article.keyAssetLabel || 'Key Asset'}</span>
                        </span>
                        <svg className="w-4 h-4 opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Article Info */}
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#0D0D0D]">Session Info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-[#0D0D0D]">Category:</span>
                    <span className={`ml-2 ${categoryStyles.text} font-medium`}>
                      {article.category}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#0D0D0D]">Type:</span>
                    <span className="ml-2 text-gray-600">{article.contentType}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#0D0D0D]">Audience:</span>
                    <span className="ml-2 text-gray-600">{article.audience}</span>
                  </div>
                  {article.readingTime && (
                    <div>
                      <span className="font-semibold text-[#0D0D0D]">Duration:</span>
                      <span className="ml-2 text-gray-600">{article.readingTime}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-[#0D0D0D]">Published:</span>
                    <span className="ml-2 text-gray-600">
                      {new Date(article.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  {article.tags && article.tags.length > 0 && (
                    <div>
                      <span className="font-semibold text-[#0D0D0D] block mb-2">Topics:</span>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-[#F3F3F3] px-3 py-1 rounded text-xs font-medium text-[#0D0D0D]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Back Link */}
              <div className="mt-6 text-center">
                <Link
                  href="/enablement/training"
                  className={`inline-block ${categoryStyles.text} hover:underline font-semibold text-sm`}
                >
                  ← Back to Training Hub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
