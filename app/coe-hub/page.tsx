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
  // Meeting asset specific fields
  account?: string
  meetingType?: string
  customerLogoUrl?: string
  deliveryDate?: string
  salesStage?: string
  slidesUrl?: string
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
      // Meeting asset specific fields
      account,
      meetingType,
      customerLogoUrl,
      deliveryDate,
      salesStage,
      slidesUrl
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
      _createdAt
    }
  `, {}, { next: { revalidate: 60 } })
}

// Fetch proof points
async function getProofPoints(): Promise<CoeEntry[]> {
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
      _createdAt
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
  const [sections, bestPractices, tools, proofPoints, dashboards, counts] = await Promise.all([
    getCoeSections(),
    getBestPractices(),
    getTools(),
    getProofPoints(),
    getDashboards(),
    getCounts(),
  ])

  return (
    <CoeHubClient
      sections={sections}
      bestPractices={bestPractices}
      tools={tools}
      proofPoints={proofPoints}
      dashboards={dashboards}
      counts={counts}
    />
  )
}
