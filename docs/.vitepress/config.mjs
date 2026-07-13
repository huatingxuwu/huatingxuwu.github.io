import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsRoot = path.resolve(__dirname, '..')
const extendsDir = path.resolve(docsRoot, 'extends')
const extendsOutDir = path.resolve(__dirname, 'dist', 'extends')
const distDir = path.resolve(__dirname, 'dist')

const siteTitle = '我的博客'
const siteDescription = '个人技术笔记与学习分享'
const siteUrl = 'https://huatingxuwu.github.io'
const authorName = 'huatingxuwu'

const mimeTypes = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const encodePath = (value) =>
  value
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

function obsidianExtendsImages(md) {
  md.core.ruler.before('normalize', 'obsidian_extends_images', (state) => {
    state.src = state.src.replace(/!\[\[([^\]|]+?)(?:\|(\d+))?\]\]/g, (_, imagePath, width) => {
      const normalizedPath = imagePath.trim().replace(/\\/g, '/').replace(/^\/+/, '')
      const widthAttr = width ? ` width="${Number(width)}"` : ''

      return `<img src="/extends/${encodePath(normalizedPath)}" alt="${escapeHtml(normalizedPath)}"${widthAttr}>`
    })
  })
}

function extendsAssetsPlugin() {
  return {
    name: 'serve-and-copy-extends-assets',
    configureServer(server) {
      server.middlewares.use('/extends/', (req, res, next) => {
        const requestPath = decodeURIComponent((req.url || '').split('?')[0]).replace(/^\/+/, '')
        const filePath = path.resolve(extendsDir, requestPath)

        if (!filePath.startsWith(extendsDir + path.sep) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
          next()
          return
        }

        res.setHeader('Content-Type', mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream')
        fs.createReadStream(filePath).pipe(res)
      })
    },
    closeBundle() {
      if (!fs.existsSync(extendsDir)) return

      fs.rmSync(extendsOutDir, { recursive: true, force: true })
      fs.cpSync(extendsDir, extendsOutDir, { recursive: true })
    },
  }
}

function parseFrontmatter(src) {
  const match = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}

  return match[1].split(/\r?\n/).reduce((frontmatter, line) => {
    const separator = line.indexOf(':')
    if (separator === -1) return frontmatter

    const key = line.slice(0, separator).trim()
    let value = line.slice(separator + 1).trim()
    if (!key) return frontmatter

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    } else if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    } else if (value === 'true' || value === 'false') {
      value = value === 'true'
    }

    frontmatter[key] = value
    return frontmatter
  }, {})
}

function extractTitle(src) {
  const content = src.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim()
  const heading = content.match(/^#{1,2}\s+(.+)$/m)
  return heading?.[1]?.trim()
}

function routeFromMarkdown(filePath) {
  const relative = path.relative(docsRoot, filePath).replace(/\\/g, '/')
  if (relative === 'index.md') return '/'
  return `/${relative.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')}`
}

function walkMarkdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || ['public', 'extends'].includes(entry.name)) return []
      return walkMarkdownFiles(fullPath)
    }

    return entry.isFile() && entry.name.endsWith('.md') ? [fullPath] : []
  })
}

function collectMarkdownPages() {
  return walkMarkdownFiles(docsRoot).map((filePath) => {
    const src = fs.readFileSync(filePath, 'utf8')
    const frontmatter = parseFrontmatter(src)
    const url = routeFromMarkdown(filePath)

    return {
      title: frontmatter.title || extractTitle(src) || path.basename(filePath, '.md'),
      description: frontmatter.description || '',
      date: frontmatter.date || '',
      draft: frontmatter.draft === true,
      url,
    }
  })
}

function collectPosts() {
  const utilityPages = new Set(['/', '/blog', '/archive', '/tags'])
  return collectMarkdownPages()
    .filter((page) => !page.draft && !utilityPages.has(page.url))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
}

function absolutize(url, base = '/') {
  const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '')
  return new URL(`${normalizedBase}${url}`, siteUrl).href
}

function escapeXml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function renderRss(posts, base = '/') {
  const items = posts
    .map((post) => {
      const link = absolutize(post.url, base)
      const pubDate = post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ''

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      ${pubDate}
      <description>${escapeXml(post.description)}</description>
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${absolutize('/', base)}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`
}

function renderSitemap(pages, base = '/') {
  const urls = pages
    .filter((page) => !page.draft)
    .map((page) => {
      const lastmod = page.date ? `\n    <lastmod>${page.date}</lastmod>` : ''
      return `  <url>
    <loc>${absolutize(page.url, base)}</loc>${lastmod}
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

function blogMetadataPlugin() {
  return {
    name: 'generate-blog-metadata',
    closeBundle() {
      const pages = collectMarkdownPages()
      const posts = collectPosts()
      const base = '/'

      fs.mkdirSync(distDir, { recursive: true })
      fs.writeFileSync(path.join(distDir, 'rss.xml'), renderRss(posts, base), 'utf8')
      fs.writeFileSync(path.join(distDir, 'sitemap.xml'), renderSitemap(pages, base), 'utf8')
      fs.writeFileSync(path.join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${absolutize('/sitemap.xml', base)}\n`, 'utf8')
    },
  }
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  cleanUrls: true,
  lang: 'zh-CN',
  title: siteTitle,
  description: siteDescription,
  lastUpdated: true,
  head: [
    ['meta', { name: 'author', content: authorName }],
    ['meta', { name: 'theme-color', content: '#2563eb' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: siteTitle }],
    ['meta', { property: 'og:title', content: siteTitle }],
    ['meta', { property: 'og:description', content: siteDescription }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: `${siteTitle} RSS`, href: '/rss.xml' }],
  ],

  markdown: {
    config: (md) => {
      md.use(mathjax3)
      md.use(obsidianExtendsImages)
    },
  },

  vite: {
    plugins: [extendsAssetsPlugin(), blogMetadataPlugin()],
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog' },
      { text: '归档', link: '/archive' },
      { text: '标签', link: '/tags' },
      {
        text: '现代密码学',
        items: [
          { text: '第 1 章笔记', link: '/ModernCryptography/Chapter1' },
          { text: '第 1 章习题', link: '/ModernCryptography/Exercise1' },
          { text: '第 2 章笔记', link: '/ModernCryptography/Chapter2' },
          { text: '第 2 章习题', link: '/ModernCryptography/Exercise2' },
          { text: '第 3 章笔记 1', link: '/ModernCryptography/Chapter3.1-2' },
          { text: '第 3 章笔记 2', link: '/ModernCryptography/Chapter3.3-4' },
        ],
      },
    ],

    sidebar: [
      {
        text: '博客',
        items: [
          { text: '全部文章', link: '/blog' },
          { text: '文章归档', link: '/archive' },
          { text: '标签索引', link: '/tags' },
        ],
      },
      {
        text: '现代密码学',
        items: [
          { text: '第 1 章笔记', link: '/ModernCryptography/Chapter1' },
          { text: '第 1 章习题', link: '/ModernCryptography/Exercise1' },
          { text: '第 2 章笔记', link: '/ModernCryptography/Chapter2' },
          { text: '第 2 章习题', link: '/ModernCryptography/Exercise2' },
          { text: '第 3 章笔记 1', link: '/ModernCryptography/Chapter3.1-2' },
          { text: '第 3 章笔记 2', link: '/ModernCryptography/Chapter3.3-4' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/huatingxuwu' },
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: `Copyright © ${new Date().getFullYear()} ${authorName}`,
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    outline: {
      label: '目录',
      level: [2, 3],
    },
  },
})
