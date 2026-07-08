import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

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
    },
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
