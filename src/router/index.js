import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/css',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/js',
    name: 'js',
    component: () => import('../views/js.vue')
  },
  {
    path: '/vue',
    name: 'vue',
    component: () => import('../views/vue.vue')
  },
  {
    path: '/theInternet',
    name: 'theInternet',
    component: () => import('../views/theInternet.vue')
  },
  {
    path: '/browser',
    name: 'browser',
    component: () => import('../views/Browser.vue')
  },
  {
    path: '/optimization',
    name: 'optimization',
    component: () => import('../views/optimization.vue')
  }
]
// event
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
