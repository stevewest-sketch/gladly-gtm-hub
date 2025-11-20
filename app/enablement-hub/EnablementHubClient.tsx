'use client'

import { useState } from 'react'
import ButtonNav from '@/components/hub/ButtonNav'
import HubSection from '@/components/hub/HubSection'
import EnablementCard from '@/components/enablement/EnablementCard'

interface EnablementArticle {
  _id: string
  title: string
  slug: { current: string }
  summary: string
  category: string
  contentType: string
  audience: string
  keyTakeaways?: string[]
  tags?: string[]
  readingTime?: string
  publishedDate: string
  videoUrl?: string
  slidesUrl?: string
}

interface EnablementHubClientProps {
  entries: EnablementArticle[]
}

const CATEGORIES = [
  {
    id: 'all',
    label: 'All Enablements',
    icon: '🎓',
    color: 'bg-[#009B00]',  // Gladly green
    contentTypes: [],
  },
  {
    id: 'live-replay',
    label: 'Live Replays',
    icon: '🎥',
    color: 'bg-[#3B82F6]',  // Blue
    contentTypes: ['Training', 'Meeting', 'Demo'],
  },
  {
    id: 'e-learning',
    label: 'E-Learning',
    icon: '📖',
    color: 'bg-[#8C69F0]',  // Purple
    contentTypes: ['Guide'],
  },
  {
    id: 'by-product',
    label: 'By Product',
    icon: '🛠️',
    color: 'bg-[#F97316]',  // Orange
    categories: ['Product'],
  },
  {
    id: 'certifications',
    label: 'Certifications',
    icon: '🏆',
    color: 'bg-[#10B981]',  // Emerald
    categories: ['Learning'],
  },
]

export default function EnablementHubClient({
  entries,
}: EnablementHubClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const activeCategoryData = CATEGORIES.find(c => c.id === activeCategory)

  // Filter out incomplete draft entries (missing required fields)
  const validEntries = entries.filter(
    (entry) => entry.slug?.current && entry.title && entry.contentType && entry.category
  )

  // Filter entries based on active category
  const getFilteredEntries = (): EnablementArticle[] => {
    if (!activeCategoryData) return validEntries

    if (activeCategoryData.contentTypes?.length) {
      return validEntries.filter((entry) =>
        activeCategoryData.contentTypes.includes(entry.contentType)
      )
    }

    if (activeCategoryData.categories?.length) {
      return validEntries.filter((entry) =>
        activeCategoryData.categories.includes(entry.category)
      )
    }

    return validEntries
  }

  // Get featured entries (first 3, sorted by date)
  const getFeaturedEntries = (): EnablementArticle[] => {
    return validEntries
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
      .slice(0, 3)
  }

  // Get new entries (last 30 days)
  const getNewEntries = (): EnablementArticle[] => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
    return validEntries
      .filter((e) => new Date(e.publishedDate).getTime() > thirtyDaysAgo)
      .slice(0, 4)
  }

  // Get popular courses (entries with video URLs)
  const getPopularCourses = (): EnablementArticle[] => {
    return validEntries
      .filter((e) => e.videoUrl)
      .slice(0, 6)
  }

  // Get certifications (Learning category)
  const getCertifications = (): EnablementArticle[] => {
    return validEntries
      .filter((e) => e.category === 'Learning')
      .slice(0, 4)
  }

  const filteredEntries = getFilteredEntries()
  const featuredEntries = getFeaturedEntries()
  const newEntries = getNewEntries()
  const popularCourses = getPopularCourses()
  const certifications = getCertifications()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section - Gladly Design */}
      <div className="bg-[#252525] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🎓</span>
            <h1 className="text-[28px] leading-[32px] tracking-[-0.01em] font-bold">
              Enablement Hub
            </h1>
          </div>
          <p className="text-[15px] leading-[24px] text-gray-300 max-w-2xl">
            Your learning center for product enablement, certifications, and skill development. Everything
            you need to master Gladly.
          </p>
        </div>
      </div>

      {/* Button Navigation */}
      <ButtonNav
        buttons={CATEGORIES}
        activeButton={activeCategory}
        onButtonChange={setActiveCategory}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Section - Always Visible */}
        {featuredEntries.length > 0 && (
          <HubSection
            title="⭐ Featured Enablements"
            description="Recently added and recommended learning resources"
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredEntries.map((entry) => (
                <EnablementCard key={entry._id} entry={entry} variant="featured" />
              ))}
            </div>
          </HubSection>
        )}

        {/* New Resources Section - Always Visible */}
        {newEntries.length > 0 && (
          <HubSection
            title="🆕 New Enablements"
            description={`${newEntries.length} new in the last 30 days`}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newEntries.map((entry) => (
                <EnablementCard key={entry._id} entry={entry} variant="compact" />
              ))}
            </div>
          </HubSection>
        )}

        {/* Learning Paths - Only on All Enablements */}
        {activeCategory === 'all' && popularCourses.length > 0 && (
          <HubSection
            title="🎯 Popular Courses"
            description="Most accessed enablement content with video recordings"
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCourses.map((entry) => (
                <EnablementCard key={entry._id} entry={entry} variant="standard" showVideo />
              ))}
            </div>
          </HubSection>
        )}

        {/* Certifications - Only on All Enablements or Certifications tab */}
        {(activeCategory === 'all' || activeCategory === 'certifications') && certifications.length > 0 && (
          <HubSection
            title="🏆 Certifications"
            description="Structured learning paths and certification tracks"
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((entry) => (
                <EnablementCard key={entry._id} entry={entry} variant="compact" />
              ))}
            </div>
          </HubSection>
        )}

        {/* Category Description - Changes per Button */}
        {activeCategoryData && activeCategoryData.id !== 'all' && (
          <HubSection className="mb-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-[#DFDFDF] border-l-4 border-l-[#009B00] rounded-lg p-6">
              <h2 className="text-[18px] leading-[24px] font-semibold tracking-[-0.005em] text-[#0D0D0D] mb-2">
                {activeCategoryData.icon} {activeCategoryData.label}
              </h2>
              <p className="text-[15px] leading-[24px] text-[#252525]">
                {activeCategoryData.id === 'live-replay' && 'Watch recordings of live training sessions, product demos, and team meetings.'}
                {activeCategoryData.id === 'e-learning' && 'Self-paced guides and documentation for learning at your own pace.'}
                {activeCategoryData.id === 'by-product' && 'Product-specific enablement content organized by feature and capability.'}
                {activeCategoryData.id === 'certifications' && 'Complete certification tracks to validate your Gladly expertise.'}
              </p>
            </div>
          </HubSection>
        )}

        {/* Universal Enablement Catalog - Pre-filtered by Active Button */}
        <HubSection
          title="Browse All Enablements"
          description={`${filteredEntries.length} enablements available`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntries.map((entry) => (
              <EnablementCard key={entry._id} entry={entry} variant="standard" />
            ))}
          </div>
        </HubSection>
      </div>
    </div>
  )
}
