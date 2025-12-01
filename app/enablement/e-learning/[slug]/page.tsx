import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import QuickNav from '@/components/QuickNav';
import ResourcesPanel from '@/components/learning/ResourcesPanel';
import ExampleCard from '@/components/learning/ExampleCard';
import CoEResourcesPanel from '@/components/coe/CoEResourcesPanel';
import StatCallout from '@/components/coe/StatCallout';
import CaseStudyCard from '@/components/coe/CaseStudyCard';
import BenchmarkTable from '@/components/coe/BenchmarkTable';
import PageSectionRenderer from '@/components/sections/PageSectionRenderer';
import { PageSection } from '@/lib/types/catalog';

interface LearningModule {
  _id: string;
  _type: 'learningModule';
  title: string;
  slug: { current: string };
  category: 'competitive' | 'product' | 'process' | 'coe';
  moduleType: string;
  description: string;
  oneLiner: string;
  videoUrl?: string;
  videoDuration?: number;
  lastUpdated: string;
  keyTakeaways: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  interactiveFlow?: {
    question: string;
    paths: Array<{
      label: string;
      route: string;
      description?: string;
    }>;
  };
  examples: Array<{
    title: string;
    content: any[];
  }>;
  faqs: Array<{
    question: string;
    answer: any[];
  }>;
  quickActions: {
    pdfUrl?: string;
    slackTemplates?: string[];
    resources?: Array<{
      label: string;
      url: string;
      type: 'doc' | 'video' | 'tool' | 'link';
    }>;
    relatedLinks?: Array<{
      label: string;
      url: string;
    }>;
    quizUrl?: string;
  };
  relatedModules?: Array<{
    title: string;
    slug: string;
    description: string;
  }>;
  productTags: string[];
  isActive: boolean;
  // New flexible page sections
  pageSections?: PageSection[];
  coeCaseStudies?: Array<{
    company: string;
    challenge: string;
    approach: string[];
    metrics: Array<{ value: string; label: string }>;
    keyTakeaway: string;
  }>;
  coeStats?: Array<{
    metric: string;
    label: string;
    context?: string;
    variant?: 'primary' | 'success' | 'warning' | 'info';
  }>;
  coeBenchmarks?: Array<{
    period: string;
    target: string;
    focus: string;
    metrics: string;
    actions: string;
  }>;
}

async function getLearningModule(slug: string): Promise<LearningModule | null> {
  const query = `*[_type == "learningModule" && slug.current == $slug && isActive == true][0] {
    _id,
    _type,
    title,
    slug,
    category,
    moduleType,
    description,
    oneLiner,
    videoUrl,
    videoDuration,
    lastUpdated,
    keyTakeaways,
    interactiveFlow,
    examples,
    faqs,
    quickActions,
    relatedModules,
    productTags,
    isActive,
    // New flexible page sections
    pageSections[] {
      _key,
      sectionType,
      title,
      description,
      collapsible,
      defaultExpanded,
      overviewCards[] { label, content },
      videoUrl,
      wistiaId,
      sessionMaterials { videoUrl, slidesUrl, transcriptUrl },
      takeaways,
      processLayout,
      processSteps[] { heading, content },
      processText,
      tips,
      faqs[] { question, answer },
      assetItems[] { icon, title, description, url },
      textContent,
      checklistColumns[] { title, items }
    },
    coeCaseStudies,
    coeStats,
    coeBenchmarks
  }`;

  return await client.fetch(query, { slug });
}

function getCategoryStyles(category: 'competitive' | 'product' | 'process' | 'coe') {
  const styles = {
    competitive: {
      gradient: 'bg-gradient-to-br from-[#FF6B35] to-[#F7931E]',
      badge: 'bg-white/20',
      text: 'text-[#FF6B35]',
      label: 'Competitive',
      hoverColor: 'hover:border-[#FF6B35]',
    },
    product: {
      gradient: 'bg-gradient-to-br from-[#4A90E2] to-[#357ABD]',
      badge: 'bg-white/20',
      text: 'text-[#4A90E2]',
      label: 'Product Training',
      hoverColor: 'hover:border-[#4A90E2]',
    },
    process: {
      gradient: 'bg-gradient-to-br from-[#8C69F0] to-[#7557d9]',
      badge: 'bg-white/20',
      text: 'text-[#8C69F0]',
      label: 'Process & Operations',
      hoverColor: 'hover:border-[#8C69F0]',
    },
    coe: {
      gradient: 'bg-gradient-to-br from-[#0D0D0D] via-[#2D2D2D] to-[#1A1A1A]',
      badge: 'bg-white/10 border border-white/20',
      text: 'text-[#8C69F0]',
      label: 'Center of Excellence',
      hoverColor: 'hover:border-[#8C69F0]',
    },
  };
  return styles[category];
}

export default async function LearningModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const module = await getLearningModule(slug);

  if (!module) {
    notFound();
  }

  const categoryStyles = getCategoryStyles(module.category);

  // Build QuickNav links dynamically based on available sections
  const quickNavLinks = [
    module.category === 'coe' && module.coeStats && module.coeStats.length > 0 && { label: 'Benchmarks', anchor: 'stats' },
    module.keyTakeaways && module.keyTakeaways.length > 0 && { label: 'Takeaways', anchor: 'takeaways' },
    module.interactiveFlow && { label: 'Decision Flow', anchor: 'flow' },
    module.category === 'coe' && module.coeCaseStudies && module.coeCaseStudies.length > 0 && { label: 'Success Stories', anchor: 'case-studies' },
    module.category === 'coe' && module.coeBenchmarks && module.coeBenchmarks.length > 0 && { label: 'Timeline', anchor: 'benchmarks' },
    module.examples && module.examples.length > 0 && { label: module.category === 'coe' ? 'Best Practices' : 'Examples', anchor: 'examples' },
    module.faqs && module.faqs.length > 0 && { label: 'FAQs', anchor: 'faqs' },
    { label: 'Resources', anchor: 'actions' },
  ].filter(Boolean) as { label: string; anchor: string }[];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className={`${categoryStyles.gradient} text-white py-[60px]`}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <span className={`${categoryStyles.badge} px-4 py-2 rounded text-sm font-semibold`}>
              {categoryStyles.label}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded text-sm font-semibold">
              {module.moduleType}
            </span>
          </div>
          <h1 className="text-[48px] font-bold mb-4 leading-tight max-w-4xl">{module.title}</h1>
          <p className="text-[20px] opacity-95 leading-relaxed max-w-3xl mb-6">{module.description}</p>

          {/* CoE CTAs - Only for CoE modules */}
          {module.category === 'coe' && (
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="https://gemini.google.com/gem/1023d5795d56?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border-2 border-white/30 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/20 hover:border-white/50 transition-all"
              >
                <span>🤖</span> Ask CoE Assistant
              </a>
              <a
                href="/coe/submit"
                className="inline-flex items-center gap-2 bg-[#8C69F0] border-2 border-[#8C69F0] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#7557d9] hover:border-[#7557d9] transition-all"
              >
                <span>🎯</span> Submit Your Results
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Quick Navigation */}
      <QuickNav links={quickNavLinks} />

      {/* Main Content Container */}
      <div className="max-w-[1400px] mx-auto px-6 pt-[50px] pb-[50px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Column (2/3) */}
          <div className="lg:col-span-2">
            {/* NEW: Use PageSectionRenderer if pageSections exist */}
            {module.pageSections && module.pageSections.length > 0 ? (
              <PageSectionRenderer sections={module.pageSections} />
            ) : (
              <>
            {/* LEGACY: Video Section */}
            {module.videoUrl && (
              <section id="video" className="mb-[60px]">
                <div className="bg-white border-2 border-[#F3F3F3] rounded-lg overflow-hidden shadow-sm">
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-6xl mb-4">▶️</div>
                      <p className="text-sm opacity-75">Video: {module.videoUrl}</p>
                      <p className="text-xs opacity-60 mt-2">
                        {module.videoDuration} min video
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* CoE Stats Section (CoE modules only) */}
            {module.category === 'coe' && module.coeStats && module.coeStats.length > 0 && (
              <section id="stats" className="mb-[60px]">
                <h2 className="text-[32px] font-bold mb-6 text-[#0D0D0D]">See the Numbers: Real Companies, Real Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {module.coeStats.map((stat, index) => (
                    <StatCallout
                      key={index}
                      metric={stat.metric}
                      label={stat.label}
                      context={stat.context}
                      variant={stat.variant}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Key Takeaways Section */}
            {module.keyTakeaways && module.keyTakeaways.length > 0 && (
              <section id="takeaways" className="mb-[60px]">
                <h2 className="text-[32px] font-bold mb-6 text-[#0D0D0D]">Key Takeaways</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {module.keyTakeaways.map((takeaway, index) => (
                    <div
                      key={index}
                      className={`bg-white border-2 border-[#F3F3F3] rounded-lg p-6 ${categoryStyles.hoverColor} hover:shadow-lg hover:-translate-y-1 transition-all`}
                    >
                      <div className="text-[32px] mb-3">{takeaway.icon}</div>
                      <h4 className="text-lg font-bold mb-2 text-[#0D0D0D]">
                        {takeaway.title}
                      </h4>
                      <p className="text-[13px] text-[#0D0D0D] leading-relaxed">
                        {takeaway.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interactive Flow Section */}
            {module.interactiveFlow && (
              <section id="flow" className="mb-[60px]">
                <h2 className="text-[32px] font-bold mb-6 text-[#0D0D0D]">Decision Flow</h2>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2 text-[#0D0D0D]">
                      {module.interactiveFlow.question}
                    </h3>
                    <p className="text-sm text-gray-600">All criteria must be met to move forward</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {module.interactiveFlow.paths.map((path, index) => {
                      const colors = [
                        { bg: 'bg-blue-600', border: 'border-blue-600', text: 'text-blue-600', icon: '🎯' },
                        { bg: 'bg-emerald-600', border: 'border-emerald-600', text: 'text-emerald-600', icon: '👤' },
                        { bg: 'bg-gray-700', border: 'border-gray-700', text: 'text-gray-700', icon: '⏰' },
                        { bg: 'bg-[#8C69F0]', border: 'border-[#8C69F0]', text: 'text-[#8C69F0]', icon: '✅' },
                      ];
                      const color = colors[index % colors.length];

                      return (
                        <div
                          key={index}
                          className="bg-white rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all overflow-hidden"
                        >
                          <div className={`${color.bg} text-white p-4 flex items-center gap-3`}>
                            <span className="text-2xl">{color.icon}</span>
                            <div className="flex-1">
                              <div className="text-xs font-semibold opacity-90 uppercase tracking-wide">
                                Step {index + 1}
                              </div>
                              <h4 className="font-bold text-sm leading-tight">
                                {path.label}
                              </h4>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-sm font-semibold text-[#0D0D0D] mb-2">
                              {path.route}
                            </p>
                            {path.description && (
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {path.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}
              </>
            )}
          </div>

          {/* Sidebar (1/3) */}
          <div id="actions" className="lg:col-span-1">
            <div className="space-y-6">
              {/* PDF Download */}
              {module.quickActions.pdfUrl && (
                <a
                  href={module.quickActions.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#8C69F0] text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-[#7557d9] hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  📄 Download Training Slides
                </a>
              )}

              {/* Resources Panel with Quiz */}
              {(module.quickActions.resources || module.quickActions.quizUrl) && (
                <>
                  {module.category === 'coe' ? (
                    <CoEResourcesPanel
                      resources={module.quickActions.resources || []}
                      quizUrl={module.quickActions.quizUrl}
                    />
                  ) : (
                    <ResourcesPanel
                      resources={module.quickActions.resources || []}
                      quizUrl={module.quickActions.quizUrl}
                    />
                  )}
                </>
              )}

              {/* Module Info */}
              <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-[#0D0D0D]">Module Info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-[#0D0D0D]">Category:</span>
                    <span className={`ml-2 ${categoryStyles.text} font-medium`}>
                      {categoryStyles.label}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#0D0D0D]">Type:</span>
                    <span className="ml-2 text-gray-600">{module.moduleType}</span>
                  </div>
                  {module.videoDuration && (
                    <div>
                      <span className="font-semibold text-[#0D0D0D]">Duration:</span>
                      <span className="ml-2 text-gray-600">{module.videoDuration} minutes</span>
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-[#0D0D0D]">Last Updated:</span>
                    <span className="ml-2 text-gray-600">
                      {new Date(module.lastUpdated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  {module.productTags && module.productTags.length > 0 && (
                    <div>
                      <span className="font-semibold text-[#0D0D0D] block mb-2">Products:</span>
                      <div className="flex flex-wrap gap-2">
                        {module.productTags.map((tag, index) => (
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
                  href="/enablement/e-learning"
                  className={`inline-block ${categoryStyles.text} hover:underline font-semibold text-sm`}
                >
                  ← Back to E-Learning Hub
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Content Sections */}
        <div className="mt-16">
          {/* CoE Case Studies Section (CoE modules only) */}
          {module.category === 'coe' && module.coeCaseStudies && module.coeCaseStudies.length > 0 && (
            <section id="case-studies" className="mb-[60px]">
              <h2 className="text-[32px] font-bold mb-6 text-[#0D0D0D]">How Top Companies Did It: Step-by-Step Success Stories</h2>
              <div className="space-y-8">
                {module.coeCaseStudies.map((caseStudy, index) => (
                  <CaseStudyCard
                    key={index}
                    company={caseStudy.company}
                    challenge={caseStudy.challenge}
                    approach={caseStudy.approach}
                    metrics={caseStudy.metrics}
                    keyTakeaway={caseStudy.keyTakeaway}
                    variant={index % 2 === 0 ? 'primary' : 'secondary'}
                  />
                ))}
              </div>
            </section>
          )}

          {/* CoE Benchmarks Section (CoE modules only) */}
          {module.category === 'coe' && module.coeBenchmarks && module.coeBenchmarks.length > 0 && (
            <section id="benchmarks" className="mb-[60px]">
              <BenchmarkTable
                phases={module.coeBenchmarks}
                title="Your 90-Day Roadmap: What to Expect Each Month"
              />
            </section>
          )}

          {/* Examples Section (Regular modules or CoE with additional examples) */}
          {module.examples && module.examples.length > 0 && (
            <section id="examples" className="mb-[60px]">
              <h2 className="text-[32px] font-bold mb-6 text-[#0D0D0D]">
                {module.category === 'coe' ? 'Best Practices & Guidelines' : 'Real-World Examples'}
              </h2>
              <div className="space-y-6">
                {module.examples.map((example, index) => (
                  <ExampleCard
                    key={index}
                    title={example.title}
                    content={example.content}
                    index={index}
                  />
                ))}
              </div>
            </section>
          )}

          {/* FAQs Section */}
          {module.faqs && module.faqs.length > 0 && (
            <section id="faqs" className="mb-[60px]">
              <h2 className="text-[32px] font-bold mb-6 text-[#0D0D0D]">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {module.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className={`bg-white border-2 border-[#F3F3F3] rounded-lg overflow-hidden ${categoryStyles.hoverColor} transition-all group`}
                  >
                    <summary className="cursor-pointer p-5 font-bold text-lg text-[#0D0D0D] hover:bg-[#F3F3F3] transition-colors">
                      {faq.question}
                    </summary>
                    <div className="p-5 pt-4 border-t-2 border-[#F3F3F3]">
                      <div className="prose prose-sm max-w-none text-[#0D0D0D]">
                        <PortableText value={faq.answer} />
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Related Training Section */}
        {module.relatedModules && module.relatedModules.length > 0 && (
          <div className="mt-16 pt-12 border-t-2 border-gray-200">
            <h2 className="text-[32px] font-bold mb-6 text-[#0D0D0D] text-center">Related Training</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {module.relatedModules.map((relatedModule, index) => (
                <Link
                  key={index}
                  href={`/enablement/e-learning/${relatedModule.slug}`}
                  className="group bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#8C69F0] to-[#7557d9] rounded-lg flex items-center justify-center text-white text-xl">
                      📚
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#0D0D0D] mb-2 group-hover:text-[#8C69F0] transition-colors">
                        {relatedModule.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {relatedModule.description}
                      </p>
                      <div className="mt-3 text-sm font-semibold text-[#8C69F0] flex items-center gap-1">
                        View Training
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
