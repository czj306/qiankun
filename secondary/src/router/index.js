import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import apps from '../../package.json'

const router = createRouter({
  history: createWebHistory(
    window.__POWERED_BY_QIANKUN__ ? `/${apps.name}/` : "/"
  ),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
