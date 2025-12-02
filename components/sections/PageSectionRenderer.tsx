'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { PageSection, OverviewCardColorPreset } from '@/lib/types/catalog'

// Video URL conversion helpers
function convertGoogleDriveUrl(url: string): string {
  let fileId = ''
  if (url.includes('/file/d/')) {
    const match = url.match(/\/file\/d\/([^/]+)/)
    if (match) fileId = match[1]
  } else if (url.includes('id=')) {
    const match = url.match(/id=([^&]+)/)
    if (match) fileId = match[1]
  }
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`
  }
  return url
}

function convertWistiaUrl(url: string): string {
  const match = url.match(/wistia\.com\/(?:medias|embed)\/([a-zA-Z0-9]+)/)
  if (match) {
    return `https://fast.wistia.net/embed/iframe/${match[1]}?videoFoam=true`
  }
  return url
}

function convertYouTubeUrl(url: string): string {
  let videoId = ''
  if (url.includes('youtu.be/')) {
    const match = url.match(/youtu\.be\/([^?]+)/)
    if (match) videoId = match[1]
  } else if (url.includes('youtube.com')) {
    const match = url.match(/[?&]v=([^&]+)/)
    if (match) videoId = match[1]
  }
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }
  return url
}

function convertLoomUrl(url: string): string {
  const match = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)
  if (match) {
    return `https://www.loom.com/embed/${match[1]}`
  }
  return url
}

// Video embed component
function VideoEmbed({ url, wistiaId, title }: { url?: string; wistiaId?: string; title: string }) {
  if (wistiaId) {
    return (
      <iframe
        src={`https://fast.wistia.net/embed/iframe/${wistiaId}?videoFoam=true`}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    )
  }

  if (!url) {
    return (
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] w-full h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
          <span className="text-white text-2xl ml-1">▶</span>
        </div>
        <span className="text-white/70 text-[13px]">No video available</span>
      </div>
    )
  }

  if (url.includes('drive.google.com')) {
    return (
      <iframe
        src={convertGoogleDriveUrl(url)}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    )
  }

  if (url.includes('wistia.com')) {
    return (
      <iframe
        src={convertWistiaUrl(url)}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    )
  }

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return (
      <iframe
        src={convertYouTubeUrl(url)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    )
  }

  if (url.includes('loom.com')) {
    return (
      <iframe
        src={convertLoomUrl(url)}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    )
  }

  // Fallback for external video links
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] w-full h-full flex flex-col items-center justify-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 cursor-pointer hover:bg-white/30 transition-all hover:scale-105"
      >
        <span className="text-white text-2xl ml-1">▶</span>
      </a>
      <span className="text-white/70 text-[13px]">Click to watch</span>
    </div>
  )
}

// Section wrapper with optional collapsible functionality
function SectionWrapper({
  id,
  title,
  description,
  children,
  collapsible = false,
  defaultExpanded = true
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
  collapsible?: boolean
  defaultExpanded?: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <section id={id} className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
      <div
        className={`px-6 py-4 border-b border-[#E8EBF2] ${collapsible ? 'cursor-pointer select-none hover:bg-[#F8F9FC] transition-colors' : ''}`}
        onClick={collapsible ? () => setIsExpanded(!isExpanded) : undefined}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-[16px] text-[#1A1D26]">{title}</h2>
            {description && (
              <p className="text-[13px] text-[#8B93A7] mt-0.5">{description}</p>
            )}
          </div>
          {collapsible && (
            <div className={`text-[#8B93A7] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          collapsible && !isExpanded ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-[5000px] opacity-100'
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </div>
    </section>
  )
}

// Color presets for overview cards - matches Sanity schema options
const colorPresets: Record<OverviewCardColorPreset | 'default', { bg: string; color: string; defaultIcon: string }> = {
  blue: { bg: 'bg-blue-100', color: 'text-blue-600', defaultIcon: '📋' },
  green: { bg: 'bg-green-100', color: 'text-green-600', defaultIcon: '👥' },
  rose: { bg: 'bg-rose-100', color: 'text-rose-600', defaultIcon: '🎯' },
  purple: { bg: 'bg-purple-100', color: 'text-purple-600', defaultIcon: '💡' },
  amber: { bg: 'bg-amber-100', color: 'text-amber-600', defaultIcon: '⏰' },
  indigo: { bg: 'bg-indigo-100', color: 'text-indigo-600', defaultIcon: '🏛️' },
  cyan: { bg: 'bg-cyan-100', color: 'text-cyan-600', defaultIcon: '⚙️' },
  pink: { bg: 'bg-pink-100', color: 'text-pink-600', defaultIcon: '🎁' },
  gray: { bg: 'bg-gray-100', color: 'text-gray-600', defaultIcon: '📌' },
  default: { bg: 'bg-gray-100', color: 'text-gray-600', defaultIcon: '📌' },
}

// Keyword-based intelligent detection for colors
// Maps keywords found in labels to appropriate color presets
const keywordToColorPreset: Array<{ keywords: string[]; color: OverviewCardColorPreset }> = [
  // Blue - Information, definitions, explanations
  { keywords: ['what it is', 'what is', 'definition', 'overview', 'about', 'description', 'summary'], color: 'blue' },
  // Green - People, audience, teams
  { keywords: ['who', 'audience', 'team', 'people', 'user', 'customer', 'prospect', 'for whom'], color: 'green' },
  // Rose - Outcomes, results, goals, success
  { keywords: ['outcome', 'result', 'goal', 'success', 'achieve', 'benefit', 'impact', 'value', 'roi'], color: 'rose' },
  // Purple - Insights, reasons, importance
  { keywords: ['why', 'matter', 'important', 'reason', 'insight', 'learn', 'understand'], color: 'purple' },
  // Amber - Timing, when, triggers
  { keywords: ['when', 'time', 'trigger', 'moment', 'stage', 'phase', 'timing', 'schedule'], color: 'amber' },
  // Indigo - Structure, pillars, framework, principles
  { keywords: ['pillar', 'framework', 'principle', 'foundation', 'structure', 'component', 'element', 'step'], color: 'indigo' },
  // Cyan - Process, how, method
  { keywords: ['how', 'process', 'method', 'approach', 'workflow', 'procedure', 'guide', 'instruction'], color: 'cyan' },
  // Pink - Benefits, what you get, deliverables
  { keywords: ['get', 'receive', 'deliverable', 'include', 'feature', 'offer', 'provide', 'expect'], color: 'pink' },
]

// Keyword-based intelligent detection for emojis
// Maps keywords found in labels to appropriate emojis
const keywordToIcon: Array<{ keywords: string[]; icon: string }> = [
  // Information/Definition
  { keywords: ['what it is', 'what is', 'definition', 'overview', 'about', 'description'], icon: '📋' },
  { keywords: ['summary', 'brief', 'snapshot'], icon: '📝' },
  // People/Audience
  { keywords: ['who it\'s for', 'who\'s it for', 'who is it for', 'audience', 'for whom'], icon: '👥' },
  { keywords: ['team', 'people', 'user'], icon: '👤' },
  { keywords: ['customer', 'client'], icon: '🤝' },
  // Outcomes/Goals
  { keywords: ['outcome', 'result', 'goal'], icon: '🎯' },
  { keywords: ['success', 'win', 'achieve'], icon: '🏆' },
  { keywords: ['value', 'roi', 'impact'], icon: '💰' },
  // Insights/Why
  { keywords: ['why', 'matter', 'important', 'reason'], icon: '💡' },
  { keywords: ['insight', 'learn'], icon: '🧠' },
  // Timing/When
  { keywords: ['when to use', 'when to', 'timing'], icon: '⏰' },
  { keywords: ['time to value', 'timeline'], icon: '⚡' },
  { keywords: ['stage', 'phase'], icon: '📊' },
  // Structure/Framework
  { keywords: ['pillar', 'foundation'], icon: '🏛️' },
  { keywords: ['framework', 'structure'], icon: '🔧' },
  { keywords: ['step', 'component', 'element'], icon: '🔢' },
  // Process/How
  { keywords: ['how it works', 'how to', 'process'], icon: '⚙️' },
  { keywords: ['method', 'approach', 'workflow'], icon: '🔄' },
  { keywords: ['guide', 'instruction'], icon: '📖' },
  // Benefits/What you get
  { keywords: ['what you get', 'get', 'receive'], icon: '🎁' },
  { keywords: ['benefit', 'advantage'], icon: '✨' },
  { keywords: ['feature', 'include'], icon: '✅' },
  // Special labels
  { keywords: ['key takeaway', 'takeaway'], icon: '💎' },
  { keywords: ['prerequisite', 'require'], icon: '📌' },
  { keywords: ['tip', 'best practice'], icon: '💪' },
  { keywords: ['warning', 'caution', 'avoid'], icon: '⚠️' },
  { keywords: ['example', 'case', 'scenario'], icon: '📎' },
  { keywords: ['resource', 'tool', 'asset'], icon: '🛠️' },
  { keywords: ['contact', 'support', 'help'], icon: '📞' },
  { keywords: ['next step', 'action'], icon: '➡️' },
]

// Intelligent label detection - finds the best match based on keywords
function detectColorFromLabel(label: string): OverviewCardColorPreset {
  const normalized = label.toLowerCase()

  for (const mapping of keywordToColorPreset) {
    for (const keyword of mapping.keywords) {
      if (normalized.includes(keyword)) {
        return mapping.color
      }
    }
  }

  return 'gray' // Default fallback
}

function detectIconFromLabel(label: string): string {
  const normalized = label.toLowerCase()

  for (const mapping of keywordToIcon) {
    for (const keyword of mapping.keywords) {
      if (normalized.includes(keyword)) {
        return mapping.icon
      }
    }
  }

  return '📌' // Default fallback
}

// Get style for an overview card - prefers CMS values, falls back to intelligent label detection
function getOverviewCardStyle(
  label: string,
  cmsIcon?: string,
  cmsColorPreset?: OverviewCardColorPreset
): { icon: string; bg: string; color: string } {
  // Determine color preset: CMS value > intelligent detection
  const colorPreset = cmsColorPreset || detectColorFromLabel(label)
  const preset = colorPresets[colorPreset] || colorPresets.default

  // Determine icon: CMS value > intelligent detection
  const icon = cmsIcon || detectIconFromLabel(label)

  return {
    icon,
    bg: preset.bg,
    color: preset.color
  }
}

// Individual section renderers
function OverviewSection({ section }: { section: PageSection }) {
  if (!section.overviewCards || section.overviewCards.length === 0) return null

  return (
    <SectionWrapper
      id={`section-${section._key}`}
      title={section.title}
      description={section.description}
      collapsible={section.collapsible}
      defaultExpanded={section.defaultExpanded}
    >
      <div className="space-y-2 -mt-2">
        {section.overviewCards.map((card, idx) => {
          // Use CMS values with fallback to label-based detection
          const style = getOverviewCardStyle(card.label, card.icon, card.colorPreset)
          return (
            <div key={idx} className="flex gap-3 p-3 bg-[#F8F9FC] rounded-lg">
              <div className={`w-9 h-9 ${style.bg} rounded-lg flex items-center justify-center text-base flex-shrink-0`}>
                {style.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-[11px] font-bold uppercase tracking-wider ${style.color} mb-0.5`}>
                  {card.label}
                </div>
                <div className="text-[13px] text-[#374151] leading-snug">
                  {card.content}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}

function VideoSection({ section }: { section: PageSection }) {
  const hasVideo = section.videoUrl || section.wistiaId
  const hasMaterials = section.sessionMaterials?.videoUrl || section.sessionMaterials?.slidesUrl || section.sessionMaterials?.transcriptUrl

  if (!hasVideo && !hasMaterials) return null

  return (
    <SectionWrapper
      id={`section-${section._key}`}
      title={section.title}
      description={section.description}
      collapsible={section.collapsible}
      defaultExpanded={section.defaultExpanded}
    >
      <div className={`grid grid-cols-1 ${hasMaterials ? 'lg:grid-cols-[1fr_260px]' : ''} gap-6 items-start`}>
        {/* Video Container */}
        {hasVideo && (
          <div className="relative bg-[#1a1a1a] rounded-[10px] overflow-hidden aspect-video">
            <VideoEmbed
              url={section.videoUrl}
              wistiaId={section.wistiaId}
              title={section.title}
            />
          </div>
        )}

        {/* Session Materials */}
        {hasMaterials && (
          <div className="space-y-2">
            <div className="text-[12px] font-semibold uppercase tracking-wide text-[#8B93A7] mb-2">
              Session Materials
            </div>

            {section.sessionMaterials?.videoUrl && (
              <a
                href={section.sessionMaterials.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-[#F8F9FC] rounded-md hover:bg-[#DCFCE7] transition-colors"
              >
                <div className="w-9 h-9 bg-[#FEE2E2] rounded-md flex items-center justify-center text-base flex-shrink-0">
                  🎬
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-[#1A1D26]">Watch Recording</div>
                  <div className="text-[12px] text-[#8B93A7]">Full session video</div>
                </div>
              </a>
            )}

            {section.sessionMaterials?.slidesUrl && (
              <a
                href={section.sessionMaterials.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-[#F8F9FC] rounded-md hover:bg-[#DCFCE7] transition-colors"
              >
                <div className="w-9 h-9 bg-[#FEF3C7] rounded-md flex items-center justify-center text-base flex-shrink-0">
                  📊
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-[#1A1D26]">Presentation Slides</div>
                  <div className="text-[12px] text-[#8B93A7]">Download deck</div>
                </div>
              </a>
            )}

            {section.sessionMaterials?.transcriptUrl && (
              <a
                href={section.sessionMaterials.transcriptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-[#F8F9FC] rounded-md hover:bg-[#DCFCE7] transition-colors"
              >
                <div className="w-9 h-9 bg-[#E0E7FF] rounded-md flex items-center justify-center text-base flex-shrink-0">
                  📄
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-[#1A1D26]">Transcript</div>
                  <div className="text-[12px] text-[#8B93A7]">Full session notes</div>
                </div>
              </a>
            )}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}

function TakeawaysSection({ section }: { section: PageSection }) {
  if (!section.takeaways || section.takeaways.length === 0) return null

  return (
    <SectionWrapper
      id={`section-${section._key}`}
      title={section.title}
      description={section.description}
      collapsible={section.collapsible}
      defaultExpanded={section.defaultExpanded}
    >
      <div className="space-y-2">
        {section.takeaways.map((takeaway, index) => (
          <div key={index} className="flex gap-3 p-3 bg-[#F8F9FC] rounded-md">
            <span className="flex-shrink-0 w-5 h-5 bg-[#DCFCE7] text-[#16A34A] rounded-full flex items-center justify-center text-[12px]">
              ✓
            </span>
            <span className="text-[14px] text-[#5C6578] leading-relaxed">
              <ReactMarkdown
                components={{
                  strong: ({ children }) => <strong className="text-[#1A1D26]">{children}</strong>,
                  p: ({ children }) => <>{children}</>
                }}
              >
                {takeaway}
              </ReactMarkdown>
            </span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

function ProcessSection({ section }: { section: PageSection }) {
  const hasSteps = section.processSteps && section.processSteps.length > 0
  const hasText = section.processText

  if (!hasSteps && !hasText) return null

  // Determine layout - default to 'steps' if we have processSteps
  const layout = section.processLayout || (hasSteps ? 'steps' : 'text')
  const useStepsLayout = (layout === 'steps' || layout === 'numbered') && hasSteps
  const useTextLayout = (layout === 'text' || layout === 'bullets') && hasText

  return (
    <SectionWrapper
      id={`section-${section._key}`}
      title={section.title}
      description={section.description}
      collapsible={section.collapsible}
      defaultExpanded={section.defaultExpanded}
    >
      {/* Step-by-step layout */}
      {useStepsLayout && (
        <div className="space-y-0">
          {section.processSteps!.map((step, index) => (
            <div
              key={index}
              className="flex gap-4 py-4 border-b border-[#E8EBF2] last:border-0"
            >
              <div className="flex flex-col items-center gap-1">
                <span className="w-7 h-7 bg-[#16A34A] text-white rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0">
                  {index + 1}
                </span>
                {index < section.processSteps!.length - 1 && (
                  <div className="w-0.5 flex-1 bg-[#E8EBF2] min-h-[20px]" />
                )}
              </div>
              <div className="flex-1 pt-0.5">
                <h4 className="text-[15px] font-semibold text-[#1A1D26] mb-1">{step.heading}</h4>
                <p className="text-[14px] text-[#5C6578] leading-relaxed">
                  <ReactMarkdown
                    components={{
                      strong: ({ children }) => <strong className="text-[#1A1D26]">{children}</strong>,
                      p: ({ children }) => <>{children}</>
                    }}
                  >
                    {step.content}
                  </ReactMarkdown>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Text/bullet layout */}
      {useTextLayout && (
        <div className="prose prose-sm max-w-none text-[14px] text-[#5C6578] leading-relaxed">
          <ReactMarkdown
            components={{
              strong: ({ children }) => <strong className="text-[#1A1D26]">{children}</strong>,
              li: ({ children }) => (
                <li className="flex gap-2">
                  <span className="text-[#16A34A] flex-shrink-0">•</span>
                  <span>{children}</span>
                </li>
              )
            }}
          >
            {section.processText!}
          </ReactMarkdown>
        </div>
      )}

      {/* Fallback: render steps if we have them but no layout matched */}
      {!useStepsLayout && !useTextLayout && hasSteps && (
        <div className="space-y-3">
          {section.processSteps!.map((step, index) => (
            <div key={index} className="p-4 bg-[#F8F9FC] rounded-md border-l-[3px] border-[#16A34A]">
              <div className="text-[14px] font-semibold text-[#1A1D26] mb-1">{step.heading}</div>
              <div className="text-[13px] text-[#5C6578] leading-relaxed">{step.content}</div>
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}

function TipsSection({ section }: { section: PageSection }) {
  if (!section.tips || section.tips.length === 0) return null

  // Separate tips (normal items) from pitfalls (items starting with "Don't")
  const tips = section.tips.filter(item =>
    !item.toLowerCase().startsWith("don't") && !item.toLowerCase().startsWith("dont")
  )
  const pitfalls = section.tips.filter(item =>
    item.toLowerCase().startsWith("don't") || item.toLowerCase().startsWith("dont")
  )

  return (
    <SectionWrapper
      id={`section-${section._key}`}
      title={section.title}
      description={section.description}
      collapsible={section.collapsible}
      defaultExpanded={section.defaultExpanded}
    >
      {/* Tips */}
      {tips.length > 0 && (
        <div className="mb-4 p-4 bg-[#DCFCE7] border border-[#16A34A]/20 rounded-md">
          <div className="text-[13px] font-semibold text-[#15803D] mb-2">Best Practices</div>
          <ul className="space-y-1">
            {tips.map((tip, idx) => (
              <li key={idx} className="text-[13px] text-[#5C6578] pl-4 relative">
                <span className="absolute left-0 text-[#16A34A]">✓</span>
                <ReactMarkdown
                  components={{
                    strong: ({ children }) => <strong className="text-[#1A1D26]">{children}</strong>,
                    p: ({ children }) => <>{children}</>
                  }}
                >
                  {tip}
                </ReactMarkdown>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pitfalls */}
      {pitfalls.length > 0 && (
        <div>
          <h4 className="text-[14px] font-semibold text-[#1A1D26] mb-3">Common Pitfalls</h4>
          <div className="space-y-2">
            {pitfalls.map((item, index) => (
              <div key={index} className="flex gap-2 text-[14px] text-[#5C6578] py-1">
                <span className="flex-shrink-0 text-amber-500">⚠</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

function FAQSection({ section }: { section: PageSection }) {
  if (!section.faqs || section.faqs.length === 0) return null

  return (
    <SectionWrapper
      id={`section-${section._key}`}
      title={section.title}
      description={section.description}
      collapsible={section.collapsible}
      defaultExpanded={section.defaultExpanded}
    >
      <div className="space-y-3">
        {section.faqs.map((faq, index) => (
          <div key={index} className="pb-3 border-b border-[#E8EBF2] last:border-0 last:pb-0">
            <div className="text-[14px] font-semibold text-[#1A1D26] mb-1">{faq.question}</div>
            <div className="text-[14px] text-[#5C6578] leading-relaxed">
              <ReactMarkdown
                components={{
                  strong: ({ children }) => <strong className="text-[#1A1D26]">{children}</strong>,
                  p: ({ children }) => <>{children}</>
                }}
              >
                {faq.answer}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

function AssetsSection({ section }: { section: PageSection }) {
  if (!section.assetItems || section.assetItems.length === 0) return null

  return (
    <section id={`section-${section._key}`} className="bg-white rounded-[14px] border border-[#E2E6EF] overflow-hidden">
      <div className="px-4 py-3 border-b border-[#E8EBF2]">
        <h2 className="font-semibold text-[15px] text-[#1A1D26]">{section.title}</h2>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {section.assetItems.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 bg-[#F8F9FC] rounded-lg hover:bg-[#DCFCE7] transition-colors border border-[#E2E6EF]"
            >
              <div className="w-8 h-8 bg-[#E0E7FF] rounded-md flex items-center justify-center text-sm flex-shrink-0">
                {item.icon || '📄'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-[#1A1D26]">{item.title}</div>
                {item.description && (
                  <div className="text-[11px] text-[#5C6578] leading-tight line-clamp-1">
                    {item.description}
                  </div>
                )}
              </div>
              <span className="text-[#16A34A] text-[13px]">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function TextSection({ section }: { section: PageSection }) {
  if (!section.textContent) return null

  return (
    <SectionWrapper
      id={`section-${section._key}`}
      title={section.title}
      description={section.description}
      collapsible={section.collapsible}
      defaultExpanded={section.defaultExpanded}
    >
      <div className="prose prose-sm max-w-none text-[14px] text-[#5C6578] leading-relaxed">
        <ReactMarkdown
          components={{
            strong: ({ children }) => <strong className="text-[#1A1D26]">{children}</strong>,
            h1: ({ children }) => <h1 className="text-[18px] font-bold text-[#1A1D26] mt-4 mb-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-[16px] font-semibold text-[#1A1D26] mt-3 mb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-[15px] font-semibold text-[#1A1D26] mt-2 mb-1">{children}</h3>,
            ul: ({ children }) => <ul className="space-y-1 my-2">{children}</ul>,
            li: ({ children }) => (
              <li className="flex gap-2">
                <span className="text-[#16A34A] flex-shrink-0">•</span>
                <span>{children}</span>
              </li>
            )
          }}
        >
          {section.textContent}
        </ReactMarkdown>
      </div>
    </SectionWrapper>
  )
}

function ChecklistSection({ section }: { section: PageSection }) {
  if (!section.checklistColumns || section.checklistColumns.length === 0) return null

  // Determine column colors based on position (green, yellow, red pattern)
  const getColumnStyle = (index: number, total: number) => {
    if (total === 1) return { bg: 'bg-[#DCFCE7]', border: 'border-[#16A34A]/20', text: 'text-[#15803D]', check: 'text-[#16A34A]' }
    if (total === 2) {
      return index === 0
        ? { bg: 'bg-[#DCFCE7]', border: 'border-[#16A34A]/20', text: 'text-[#15803D]', check: 'text-[#16A34A]' }
        : { bg: 'bg-[#FEE2E2]', border: 'border-[#EF4444]/20', text: 'text-[#DC2626]', check: 'text-[#EF4444]' }
    }
    // 3+ columns
    if (index === 0) return { bg: 'bg-[#DCFCE7]', border: 'border-[#16A34A]/20', text: 'text-[#15803D]', check: 'text-[#16A34A]' }
    if (index === total - 1) return { bg: 'bg-[#FEE2E2]', border: 'border-[#EF4444]/20', text: 'text-[#DC2626]', check: 'text-[#EF4444]' }
    return { bg: 'bg-[#FEF3C7]', border: 'border-[#F59E0B]/20', text: 'text-[#B45309]', check: 'text-[#F59E0B]' }
  }

  return (
    <SectionWrapper
      id={`section-${section._key}`}
      title={section.title}
      description={section.description}
      collapsible={section.collapsible}
      defaultExpanded={section.defaultExpanded}
    >
      <div className={`grid grid-cols-1 md:grid-cols-${Math.min(section.checklistColumns.length, 3)} gap-4`}>
        {section.checklistColumns.map((column, colIdx) => {
          const style = getColumnStyle(colIdx, section.checklistColumns!.length)
          return (
            <div key={colIdx} className={`p-4 rounded-[10px] border ${style.bg} ${style.border}`}>
              <div className={`text-[14px] font-semibold mb-3 ${style.text}`}>
                {column.title}
              </div>
              <ul className="space-y-2">
                {column.items?.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex gap-2 text-[13px] text-[#5C6578]">
                    <span className={`flex-shrink-0 mt-0.5 ${style.check}`}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}

// Main renderer component
interface PageSectionRendererProps {
  sections: PageSection[]
  className?: string
  excludeTypes?: string[] // Section types to exclude from rendering (e.g., 'assets' for sidebar-only)
}

export default function PageSectionRenderer({ sections, className = '', excludeTypes = ['assets'] }: PageSectionRendererProps) {
  if (!sections || sections.length === 0) return null

  // Filter out excluded section types (assets go in sidebar, not main content)
  const filteredSections = sections.filter(s => !excludeTypes.includes(s.sectionType))

  return (
    <div className={`space-y-4 ${className}`}>
      {filteredSections.map((section) => {
        switch (section.sectionType) {
          case 'overview':
            return <OverviewSection key={section._key} section={section} />
          case 'video':
            return <VideoSection key={section._key} section={section} />
          case 'takeaways':
            return <TakeawaysSection key={section._key} section={section} />
          case 'process':
            return <ProcessSection key={section._key} section={section} />
          case 'tips':
            return <TipsSection key={section._key} section={section} />
          case 'faq':
            return <FAQSection key={section._key} section={section} />
          case 'assets':
            return <AssetsSection key={section._key} section={section} />
          case 'text':
            return <TextSection key={section._key} section={section} />
          case 'checklist':
            return <ChecklistSection key={section._key} section={section} />
          default:
            return null
        }
      })}
    </div>
  )
}

// Export individual sections for direct use if needed
export {
  SectionWrapper,
  OverviewSection,
  VideoSection,
  TakeawaysSection,
  ProcessSection,
  TipsSection,
  FAQSection,
  AssetsSection,
  TextSection,
  ChecklistSection,
  VideoEmbed
}
