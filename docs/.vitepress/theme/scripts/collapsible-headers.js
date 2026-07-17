/**
 * 小标题折叠/展开功能
 *
 * 点击 h2/h3 标题会折叠或展开该标题下的内容。
 * - h2 折叠时，会包含其下所有内容直到下一个 h2
 * - h3 折叠时，会包含其下所有内容直到下一个 h2 或 h3
 *
 * 状态会保存到 sessionStorage，刷新后丢失（所有标题恢复展开）。
 */

let initialized = false
const COLLAPSED_KEYS = new Set()

function getHeadingId(heading) {
  return heading.id || heading.textContent.trim().slice(0, 60)
}

function wrapCollapsible(heading) {
  // 防止重复包裹
  if (heading.classList.contains('collapsible-heading')) return

  const level = parseInt(heading.tagName.charAt(1))

  // 收集该标题之后、下一个同级或更高级标题之前的所有兄弟元素
  const content = []
  let next = heading.nextElementSibling

  while (next) {
    const tag = next.tagName
    if (tag === 'H2' || tag === 'H3') {
      const nextLevel = parseInt(tag.charAt(1))
      if (nextLevel <= level) break
    }
    // 跳过已包裹的容器
    if (next.classList.contains('collapsible-section')) break
    content.push(next)
    next = next.nextElementSibling
  }

  if (content.length === 0) return

  // 创建包裹容器
  const wrapper = document.createElement('div')
  wrapper.className = 'collapsible-section'
  heading.parentNode.insertBefore(wrapper, content[0])
  content.forEach(el => wrapper.appendChild(el))

  // 标题添加可点击样式
  heading.classList.add('collapsible-heading')

  // 恢复保存的折叠状态
  const id = getHeadingId(heading)
  if (COLLAPSED_KEYS.has(id)) {
    heading.classList.add('collapsed')
    wrapper.classList.add('collapsed')
  }

  // 点击切换
  heading.addEventListener('click', () => {
    heading.classList.toggle('collapsed')
    wrapper.classList.toggle('collapsed')

    const nowCollapsed = heading.classList.contains('collapsed')
    if (nowCollapsed) {
      COLLAPSED_KEYS.add(id)
    } else {
      COLLAPSED_KEYS.delete(id)
    }

    try {
      sessionStorage.setItem('collapsed-headings', JSON.stringify([...COLLAPSED_KEYS]))
    } catch (_) { /* ignore */ }
  })
}

function init() {
  // 恢复保存状态
  try {
    const saved = sessionStorage.getItem('collapsed-headings')
    if (saved) {
      const arr = JSON.parse(saved)
      arr.forEach(k => COLLAPSED_KEYS.add(k))
    }
  } catch (_) { /* ignore */ }

  const doc = document.querySelector('.vp-doc')
  if (!doc) return

  doc.querySelectorAll('h2, h3').forEach(wrapCollapsible)
  initialized = true
}

if (typeof window !== 'undefined') {
  // 初次加载
  document.addEventListener('DOMContentLoaded', init)
  window.addEventListener('load', init)

  // VitePress SPA 路由切换：监听 <title> 变化触发重新初始化
  let lastHref = location.href
  const titleEl = document.querySelector('title')
  if (titleEl) {
    new MutationObserver(() => {
      if (location.href !== lastHref) {
        lastHref = location.href
        setTimeout(init, 50)
      }
    }).observe(titleEl, { childList: true })
  }
}

export { init }
