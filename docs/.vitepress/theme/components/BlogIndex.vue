<script setup>
import { data as posts } from '../data/posts.data'

function formatDate(date) {
  if (!date) return '未标注日期'
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date))
}
</script>

<template>
  <section class="blog-list">
    <article v-for="post in posts" :key="post.url" class="blog-card">
      <div class="blog-card__meta">
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        <span>{{ post.category }}</span>
      </div>

      <h2>
        <a :href="post.url">{{ post.title }}</a>
      </h2>

      <p v-if="post.description">{{ post.description }}</p>

      <div v-if="post.tags.length" class="blog-tags" aria-label="文章标签">
        <a v-for="tag in post.tags" :key="tag" :href="`/tags#${encodeURIComponent(tag)}`">
          {{ tag }}
        </a>
      </div>
    </article>
  </section>
</template>
