<script setup>
import { computed } from 'vue'
import { data as posts } from '../data/posts.data'

const tagGroups = computed(() => {
  const groups = new Map()

  for (const post of posts) {
    for (const tag of post.tags) {
      if (!groups.has(tag)) groups.set(tag, [])
      groups.get(tag).push(post)
    }
  }

  return [...groups.entries()]
    .map(([tag, items]) => ({ tag, items }))
    .sort((a, b) => a.tag.localeCompare(b.tag, 'zh-CN'))
})
</script>

<template>
  <section class="tag-index">
    <div class="tag-cloud" aria-label="所有标签">
      <a v-for="group in tagGroups" :key="group.tag" :href="`#${encodeURIComponent(group.tag)}`">
        {{ group.tag }} <span>{{ group.items.length }}</span>
      </a>
    </div>

    <div v-for="group in tagGroups" :id="group.tag" :key="group.tag" class="tag-group">
      <h2>{{ group.tag }}</h2>
      <ul>
        <li v-for="post in group.items" :key="post.url">
          <a :href="post.url">{{ post.title }}</a>
          <time v-if="post.date" :datetime="post.date">{{ post.date }}</time>
        </li>
      </ul>
    </div>
  </section>
</template>
