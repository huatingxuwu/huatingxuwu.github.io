<script setup>
import { computed } from 'vue'
import { data as posts } from '../data/posts.data'

const groupedPosts = computed(() => {
  return posts.reduce((groups, post) => {
    const year = post.date ? String(new Date(post.date).getFullYear()) : '未标注日期'
    groups[year] ||= []
    groups[year].push(post)
    return groups
  }, {})
})

function formatDate(date) {
  if (!date) return ''
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date))
}
</script>

<template>
  <section class="archive-list">
    <div v-for="(items, year) in groupedPosts" :key="year" class="archive-year">
      <h2>{{ year }}</h2>
      <ol>
        <li v-for="post in items" :key="post.url">
          <time v-if="post.date" :datetime="post.date">{{ formatDate(post.date) }}</time>
          <a :href="post.url">{{ post.title }}</a>
        </li>
      </ol>
    </div>
  </section>
</template>
