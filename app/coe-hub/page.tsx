import { client } from '@/lib/sanity'
import CoeHubClient from './CoeHubClient'

// Types
interface CoeSection {
  _id: string
  name: string
  slug: { current: string }
  icon: string
  description: string
  order: number
}

interface CoeEntry {
  _id: string
  title: string
  slug: { current: string }
  summary?: string
  headline?: string
  entryType: string
  proofType?: string
  customer?: string
  icon?: string
  featured?: boolean
  permission?: { name: string; color: string }
  section?: { name: string; icon: string; slug: { current: string } }
  _createdAt: string
  // External link fields
  externalUrl?: string
  videoUrl?: string
  slidesUrl?: string
  // Meeting asset specific fields
  account?: string
  meetingType?: string
  customerLogoUrl?: string
  deliveryDate?: string
  salesStage?: string
}

interface ProofPoint {
  _id: string
  stat: string
  customer: string
  isBlind: boolean
  kpiCategory: string
  product: string[]
  channel: string | null
  approved: boolean
  sourceUrl?: string
  context?: string
  industry?: string
}

// Fetch all CoE sections
async function getCoeSections(): Promise<CoeSection[]> {
  return client.fetch(`
    *[_type == "coeSection"] | order(order asc) {
      _id,
      name,
      slug,
      icon,
      description,
      order
    }
  `, {}, { next: { revalidate: 60 } })
}

// Fetch best practices (excluding proof points and tools)
async function getBestPractices(): Promise<CoeEntry[]> {
  return client.fetch(`
    *[_type == "coeEntry" && entryType in ["best-practice", "process-innovation", "internal-best-practice", "meeting-asset"]] | order(featured desc, _createdAt desc) {
      _id,
      title,
      slug,
      summary,
      headline,
      entryType,
      icon,
      featured,
      "permission": permission->{name, color},
      "section": coeSection->{name, icon, slug},
      _createdAt,
      externalUrl,
      videoUrl,
      slidesUrl,
      // Meeting asset specific fields
      account,
      meetingType,
      customerLogoUrl,
      deliveryDate,
      salesStage
    }
  `, {}, { next: { revalidate: 60 } })
}

// Fetch tools
async function getTools(): Promise<CoeEntry[]> {
  return client.fetch(`
    *[_type == "coeEntry" && entryType == "tool"] | order(featured desc, _createdAt desc) {
      _id,
      title,
      slug,
      summary,
      headline,
      entryType,
      icon,
      featured,
      "permission": permission->{name, color},
      "section": coeSection->{name, icon, slug},
      _createdAt,
      externalUrl,
      videoUrl,
      slidesUrl
    }
  `, {}, { next: { revalidate: 60 } })
}

// Fetch proof points (legacy coeEntry type)
async function getLegacyProofPoints(): Promise<CoeEntry[]> {
  return client.fetch(`
    *[_type == "coeEntry" && entryType == "proof-point"] | order(featured desc, _createdAt desc) {
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
      "section": coeSection->{name, icon, slug},
      _createdAt
    }
  `, {}, { next: { revalidate: 60 } })
}

// Fetch new proof points (proofPoint document type)
async function getNewProofPoints(): Promise<ProofPoint[]> {
  return client.fetch(`
    *[_type == "proofPoint"] | order(customer asc) {
      _id,
      stat,
      customer,
      isBlind,
      kpiCategory,
      product,
      channel,
      approved,
      sourceUrl,
      context,
      industry
    }
  `, {}, { next: { revalidate: 60 } })
}

// Fetch dashboards (entries from Performance Dashboards section or with dashboard-like content)
async function getDashboards(): Promise<CoeEntry[]> {
  return client.fetch(`
    *[_type == "coeEntry" && (
      coeSection->slug.current == "performance-dashboards" ||
      title match "*dashboard*" ||
      title match "*Dashboard*"
    )] | order(featured desc, _createdAt desc) {
      _id,
      title,
      slug,
      summary,
      headline,
      entryType,
      icon,
      featured,
      "permission": permission->{name, color},
      "section": coeSection->{name, icon, slug},
      _createdAt,
      externalUrl,
      videoUrl,
      slidesUrl
    }
  `, {}, { next: { revalidate: 60 } })
}

// Get counts
async function getCounts(): Promise<{
  total: number
  proofPoints: number
  bestPractices: number
  tools: number
}> {
  const [total, proofPoints, bestPractices, tools] = await Promise.all([
    client.fetch(`count(*[_type == "coeEntry"])`),
    client.fetch(`count(*[_type == "coeEntry" && entryType == "proof-point"])`),
    client.fetch(`count(*[_type == "coeEntry" && entryType in ["best-practice", "process-innovation", "internal-best-practice", "meeting-asset"]])`),
    client.fetch(`count(*[_type == "coeEntry" && entryType == "tool"])`),
  ])
  return { total, proofPoints, bestPractices, tools }
}

export default async function CoeHubPage() {
  const [sections, bestPractices, tools, legacyProofPoints, newProofPoints, dashboards, counts] = await Promise.all([
    getCoeSections(),
    getBestPractices(),
    getTools(),
    getLegacyProofPoints(),
    getNewProofPoints(),
    getDashboards(),
    getCounts(),
  ])

  return (
    <CoeHubClient
      sections={sections}
      bestPractices={bestPractices}
      tools={tools}
      proofPoints={legacyProofPoints}
      newProofPoints={newProofPoints}
      dashboards={dashboards}
      counts={counts}
    />
  )
}
