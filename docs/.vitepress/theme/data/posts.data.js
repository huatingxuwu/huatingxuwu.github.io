import { createContentLoader } from 'vitepress'

const utilityPages = new Set(['/', '/blog', '/archive', '/tags'])

function normalizeUrl(url) {
  return url.replace(/\.html$/, '').replace(/\/$/, '') || '/'
}

function extractTitle(src = '') {
  const content = src.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  const heading = content.match(/^#{1,2}\s+(.+)$/m)
  return heading?.[1]?.trim()
}

function titleFromUrl(url) {
  return decodeURIComponent(url.split('/').filter(Boolean).at(-1) || '文章')
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags.map(String).filter(Boolean)
  if (typeof tags === 'string') return tags.split(',').map((tag) => tag.trim()).filter(Boolean)
  return []
}

function normalizeDate(date) {
  if (!date) return ''
  if (date instanceof Date) return date.toISOString().slice(0, 10)
  return String(date)
}

export default createContentLoader('**/*.md', {
  includeSrc: true,
  transform(rawPosts) {
    return rawPosts
      .map((post) => {
        const url = normalizeUrl(post.url)
        const frontmatter = post.frontmatter || {}

        return {
          title: frontmatter.title || extractTitle(post.src) || titleFromUrl(url),
          url,
          date: normalizeDate(frontmatter.date),
          description: frontmatter.description || '',
          category: frontmatter.category || '随笔',
          tags: normalizeTags(frontmatter.tags),
          draft: frontmatter.draft === true,
        }
      })
      .filter((post) => !post.draft && !utilityPages.has(post.url))
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  },
})
