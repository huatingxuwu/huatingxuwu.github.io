---
title: 第一篇文章
date: 2026-06-13
category: 随笔
tags: [VitePress, 博客]
description: 记录这个 VitePress 博客的起点和基本使用方式。
---

# 第一篇文章

欢迎来到我的博客。这是第一篇文章，用来记录站点的搭建方式和后续写作入口。

## 关于本站

本站使用 [VitePress](https://vitepress.dev/) 搭建，适合整理技术笔记、课程学习内容和长期更新的知识文档。

## 为什么选择 VitePress

- 构建速度快，本地预览反馈很及时。
- Markdown 写作足够轻量，可以专注内容本身。
- 默认主题适合技术文章，也方便继续扩展。
- 支持 Vue 组件，可以逐步加入博客索引、标签、归档等功能。

## 开始写作

在 `docs` 目录下新建 `.md` 文件即可添加文章。建议每篇文章都加上类似下面的 frontmatter：

```yaml
---
title: 文章标题
date: 2026-07-10
category: 分类
tags: [标签一, 标签二]
description: 一句话概括文章内容。
---
```

本地预览和构建命令：

```bash
npm run docs:dev
npm run docs:build
```
