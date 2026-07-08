import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsRoot = path.resolve(__dirname, '..')
const extendsDir = path.resolve(docsRoot, 'extends')
const extendsOutDir = path.resolve(__dirname, 'dist', 'extends')

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

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  cleanUrls: true,
  lang: 'zh-CN',
  title: '我的博客',
  description: '个人技术笔记与分享',
  lastUpdated: true,

  markdown: {
    config: (md) => {
      md.use(mathjax3)
      md.use(obsidianExtendsImages)
    },
  },

  vite: {
    plugins: [extendsAssetsPlugin()],
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/first-article' },
      {
        text: '现代密码学',
        items: [
          { text: '第1章 笔记', link: '/ModernCryptography/Chapter1' },
          { text: '第1章 习题', link: '/ModernCryptography/Exercise1' },
        ],
      },
    ],

    sidebar: [
      {
        text: '文章',
        items: [
          { text: '第一篇文章', link: '/first-article' },
        ],
      },
      {
        text: '现代密码学',
        items: [
          { text: '第1章 笔记', link: '/ModernCryptography/Chapter1' },
          { text: '第1章 习题', link: '/ModernCryptography/Exercise1' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/huatingxuwu' },
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: `Copyright © ${new Date().getFullYear()}`,
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
