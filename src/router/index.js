import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/auth';

const routes = [
  {
    path: '/',
    name: 'Public',
    component: () => import('../pages/PublicPage.vue')
  },
  {
    path: '/admin',
    name: 'AdminLogin',
    component: () => import('../pages/AdminLogin.vue'),
    beforeEnter: (to, from, next) => {
      if (isAuthenticated.value) {
        next('/admin/dashboard');
      } else {
        next();
      }
    }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('../pages/AdminDashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/students',
    name: 'AdminStudents',
    component: () => import('../pages/AdminStudents.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/admin');
  } else {
    next();
  }
});

export default router;
