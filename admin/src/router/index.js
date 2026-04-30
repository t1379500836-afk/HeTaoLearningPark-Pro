import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import StatsView from '../views/StatsView.vue'
import TeachersView from '../views/TeachersView.vue'
import MessagesView from '../views/MessagesView.vue'
import LibraryView from '../views/LibraryView.vue'

const routes = [
  {
    path: '/',
    component: Dashboard,
    redirect: '/stats',
    children: [
      { path: 'stats', name: 'stats', component: StatsView },
      { path: 'teachers', name: 'teachers', component: TeachersView },
      { path: 'messages', name: 'messages', component: MessagesView },
      { path: 'library', name: 'library', component: LibraryView },
      { path: 'questions', redirect: '/library' },
      { path: 'questions/tags', redirect: '/library' },
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/admin/'),
  routes
})

export default router
