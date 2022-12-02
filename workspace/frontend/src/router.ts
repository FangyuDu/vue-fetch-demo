import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const basicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home.vue')
  },
  {
    path: '/xhr',
    name: 'Xhr',
    component: () => import('@/pages/xhr.vue')
  },
  {
    path: '/fetch',
    name: 'Fetch',
    component: () => import('@/pages/fetch.vue')
  },
  {
    path: '/websocket',
    name: 'WebSocket',
    component: () => import('@/pages/websocket.vue')
  },
  {
    path: '/longpolling',
    name: 'LongPolling',
    component: () => import('@/pages/longpolling.vue')
  },
  {
    path: '/sse',
    name: 'SSE',
    component: () => import('@/pages/serverSentEvent.vue')
  }
]

// 创建一个可以被 Vue 应用程序使用的路由实例
const router = createRouter({
  // 创建一个 hash 历史记录。
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  // 应该添加到路由的初始路由列表。
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
