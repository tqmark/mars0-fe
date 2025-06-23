import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestcaseView from '@/views/TestcaseView.vue'
import AutomationTestcaseView from '@/views/AutomationTestcaseView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/analyze-specs/:id',
      name: 'analyze-specs',
      component: () => import('../views/AnalyzeSpecsView.vue'),
    },
    {
      path: '/analyze-testcases',
      name: 'generate-testcases',
      component: () => import('../views/GenerateTestcaseView.vue'),
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/DemoView.vue'),
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: () => import('../views/ConfirmationView.vue'),
    },
    {
      path: '/testcase/:id',
      name: 'testcase',
      component: TestcaseView,
      props: true
    },
    {
      path: '/auto-testcase/:id',
      name: 'auto-testcase',
      component: AutomationTestcaseView,
      props: true
    }
  ],
})

export default router
