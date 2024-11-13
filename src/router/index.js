import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/generator',
      name: 'generator',
      component: () => import('../views/GeneratorView.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/NameHistoryView.vue')
    },
    {
      path: '/names/:slug',
      name: 'name-detail',
      component: () => import('../views/NameDetailView.vue')
    }
  ]
})

export default router 