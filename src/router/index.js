import { createRouter, createWebHistory } from 'vue-router'

// 有效的路由前缀列表
const validPrefixes = ['p1', 'py2', 'python3']

// 基础路由配置（无前缀，完整访问）
const baseRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/levels',
    name: 'course-levels',
    component: () => import('@/views/CourseLevelsView.vue')
  },
  {
    path: '/levels/:stage',
    name: 'stage',
    component: () => import('@/views/StageView.vue'),
    props: true
  },
  {
    path: '/levels/:stage/:unit',
    name: 'unit',
    component: () => import('@/views/UnitView.vue'),
    props: true
  },
  {
    path: '/lesson/:stage/:unit/:lesson',
    name: 'lesson',
    component: () => import('@/views/LessonView.vue'),
    props: true
  },
  {
    path: '/practice',
    name: 'practice',
    component: () => import('@/views/PracticeView.vue')
  },
  {
    path: '/typing',
    name: 'typing',
    component: () => import('@/views/TypingView.vue')
  },
  {
    path: '/python',
    name: 'python',
    component: () => import('@/views/PythonIDEView.vue')
  },
  {
    path: '/ycl',
    name: 'ycl',
    component: () => import('@/views/YCLZoneView.vue')
  },
  {
    path: '/ycl/practice/:level',
    name: 'ycl-practice',
    component: () => import('@/views/YCLPracticeView.vue'),
    props: true
  },
  {
    path: '/ycl/exam/:level/:setId',
    name: 'ycl-exam',
    component: () => import('@/views/YCLExamView.vue'),
    props: true
  },
  {
    path: '/locked',
    name: 'locked',
    component: () => import('@/components/shared/StageLocked.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue')
  },
  {
    path: '/messages',
    name: 'messages',
    component: () => import('@/views/MessagesView.vue')
  }
]

// 为带前缀的路由生成路由配置
function createPrefixedRoutes(prefix) {
  return [
    {
      path: `/${prefix}`,
      name: `${prefix}-home`,
      component: () => import('@/views/HomeView.vue'),
      props: { prefix }
    },
    {
      path: `/${prefix}/levels`,
      name: `${prefix}-course-levels`,
      component: () => import('@/views/CourseLevelsView.vue'),
      props: { prefix }
    },
    {
      path: `/${prefix}/levels/:stage`,
      name: `${prefix}-stage`,
      component: () => import('@/views/StageView.vue'),
      props: true
    },
    {
      path: `/${prefix}/levels/:stage/:unit`,
      name: `${prefix}-unit`,
      component: () => import('@/views/UnitView.vue'),
      props: true
    },
    {
      path: `/${prefix}/lesson/:stage/:unit/:lesson`,
      name: `${prefix}-lesson`,
      component: () => import('@/views/LessonView.vue'),
      props: true
    },
    {
      path: `/${prefix}/practice`,
      name: `${prefix}-practice`,
      component: () => import('@/views/PracticeView.vue'),
      props: { prefix }
    },
    {
      path: `/${prefix}/typing`,
      name: `${prefix}-typing`,
      component: () => import('@/views/TypingView.vue'),
      props: { prefix }
    },
    {
      path: `/${prefix}/python`,
      name: `${prefix}-python`,
      component: () => import('@/views/PythonIDEView.vue'),
      props: { prefix }
    },
    {
      path: `/${prefix}/ycl`,
      name: `${prefix}-ycl`,
      component: () => import('@/views/YCLZoneView.vue'),
      props: { prefix }
    },
    {
      path: `/${prefix}/ycl/practice/:level`,
      name: `${prefix}-ycl-practice`,
      component: () => import('@/views/YCLPracticeView.vue'),
      props: true
    },
    {
      path: `/${prefix}/ycl/exam/:level/:setId`,
      name: `${prefix}-ycl-exam`,
      component: () => import('@/views/YCLExamView.vue'),
      props: true
    },
    {
      path: `/${prefix}/locked`,
      name: `${prefix}-locked`,
      component: () => import('@/components/shared/StageLocked.vue'),
      props: { prefix }
    },
    {
      path: `/${prefix}/contact`,
      name: `${prefix}-contact`,
      component: () => import('@/views/ContactView.vue'),
      props: { prefix }
    },
    {
      path: `/${prefix}/messages`,
      name: `${prefix}-messages`,
      component: () => import('@/views/MessagesView.vue'),
      props: { prefix }
    }
  ]
}

// 合并所有路由：基础路由 + 三个前缀路由 + 404
const routes = [
  ...baseRoutes,
  ...createPrefixedRoutes('p1'),
  ...createPrefixedRoutes('py2'),
  ...createPrefixedRoutes('python3'),
  // 404 路由必须放在最后
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { is404: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 瞬间滚动到顶部，不使用 smooth 动画避免闪烁
    return { top: 0 }
  }
})

// 路由守卫：检测无效前缀，阻止猜测访问
router.beforeEach((to, from, next) => {
  // 如果已经是要跳转 404 页面，直接放行
  if (to.name === 'not-found') {
    return next()
  }

  const path = to.path
  const pathSegments = path.split('/').filter(Boolean)

  // 如果没有路径段，放行（根路径）
  if (pathSegments.length === 0) {
    return next()
  }

  const firstSegment = pathSegments[0]

  // 如果第一个段是有效前缀，放行
  if (validPrefixes.includes(firstSegment)) {
    return next()
  }

  // 有效的基础路由路径（不带前缀）
  const baseRoutePaths = ['levels', 'lesson', 'practice', 'typing', 'python', 'ycl', 'locked', 'contact', 'messages']

  // 如果第一个段是基础路由路径，放行
  if (baseRoutePaths.includes(firstSegment)) {
    return next()
  }

  // 其他情况（如 /py1, /py3, /abc, /random 等）跳转 404
  return next({ name: 'not-found', replace: true })
})

router.onError((error) => {
  const msg = error.message || ''
  const isChunkLoadError =
    msg.includes('Failed to fetch dynamically imported module') ||
    msg.includes('Loading chunk') ||
    msg.includes('Loading CSS chunk') ||
    msg.includes('dynamically imported module')

  if (isChunkLoadError) {
    console.error('[Router] Chunk load failed, prompting reload.', error)
    if (window.confirm('页面版本已更新，点击确定立即刷新以继续访问')) {
      window.location.reload()
    }
  }
})

export { validPrefixes }
export default router
