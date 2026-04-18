import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import StatsView from '../views/StatsView.vue'
import TeachersView from '../views/TeachersView.vue'

const routes = [
  {
    path: '/',
    component: Dashboard,
    redirect: '/stats',
    children: [
      { path: 'stats', name: 'stats', component: StatsView },
      { path: 'teachers', name: 'teachers', component: TeachersView },
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/admin/'),
  routes
})

export default router
