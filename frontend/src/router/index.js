import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/Layout.vue'
import StudentView from '@/views/StudentView.vue'
import CourseView from '@/views/CourseView.vue'
import ScoreView from '@/views/ScoreView.vue'
import StatView from '@/views/StatView.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/students',
    children: [
      { path: 'students', name: 'students', component: StudentView, meta: { title: '学生管理' } },
      { path: 'courses', name: 'courses', component: CourseView, meta: { title: '课程管理' } },
      { path: 'scores', name: 'scores', component: ScoreView, meta: { title: '成绩管理' } },
      { path: 'stat', name: 'stat', component: StatView, meta: { title: '统计报表' } }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
