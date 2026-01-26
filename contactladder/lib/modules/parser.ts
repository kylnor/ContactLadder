import { marked } from 'marked'
import { PersonalizationData } from '@/types'

/**
 * Parse markdown to HTML with personalization
 */
export async function parseMarkdown(
  content: string,
  personalization?: PersonalizationData
): Promise<string> {
  // Replace personalization variables
  let processedContent = content

  if (personalization) {
    processedContent = replacePersonalizationVariables(content, personalization)
  }

  // Configure marked for better output
  marked.setOptions({
    gfm: true,
    breaks: true,
  })

  // Convert markdown to HTML
  const html = await marked.parse(processedContent)

  return html
}

/**
 * Replace personalization variables in content
 */
function replacePersonalizationVariables(
  content: string,
  data: PersonalizationData
): string {
  let result = content

  const replacements: Record<string, string> = {
    '[Name]': data.name || '[Your Name]',
    '[GCI Goal]': data.gciGoal || '[Your GCI Goal]',
    '[Average Sale Price]': data.averageSalePrice || '[Your Average Sale Price]',
    '[Commission Percent]': data.commissionPercent || '[Your Commission %]',
    '[Magic Number]': data.magicNumber || '[Your Magic Number]',
  }

  Object.entries(replacements).forEach(([placeholder, value]) => {
    result = result.replace(new RegExp(escapeRegExp(placeholder), 'g'), value)
  })

  return result
}

/**
 * Escape special regex characters
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Extract video information from frontmatter
 */
export function extractVideoInfo(videoUrls: Record<string, string>): Array<{
  key: string
  platform: 'youtube' | 'vimeo'
  videoId: string
  url: string
}> {
  const videos: Array<{
    key: string
    platform: 'youtube' | 'vimeo'
    videoId: string
    url: string
  }> = []

  Object.entries(videoUrls).forEach(([key, value]) => {
    if (value.startsWith('youtube:')) {
      const videoId = value.replace('youtube:', '')
      videos.push({
        key,
        platform: 'youtube',
        videoId,
        url: `https://www.youtube.com/embed/${videoId}`,
      })
    } else if (value.startsWith('vimeo:')) {
      const videoId = value.replace('vimeo:', '')
      videos.push({
        key,
        platform: 'vimeo',
        videoId,
        url: `https://player.vimeo.com/video/${videoId}`,
      })
    }
  })

  return videos
}

/**
 * Generate table of contents from markdown headings
 */
export function generateTableOfContents(content: string): Array<{
  id: string
  text: string
  level: number
}> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const toc: Array<{ id: string; text: string; level: number }> = []

  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    toc.push({ id, text, level })
  }

  return toc
}

/**
 * Estimate reading time in minutes
 */
export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
