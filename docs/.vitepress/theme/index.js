import DefaultTheme from 'vitepress/theme'
import './styles/custom.css'
import ArchiveView from './components/ArchiveView.vue'
import BlogIndex from './components/BlogIndex.vue'
import TagsView from './components/TagsView.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ArchiveView', ArchiveView)
    app.component('BlogIndex', BlogIndex)
    app.component('TagsView', TagsView)
  },
}
