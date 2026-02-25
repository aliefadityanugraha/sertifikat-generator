import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated, checkAuth } from '../services/auth';

/**
 * Definition of application routes.
 * @type {Array<import('vue-router').RouteRecordRaw>}
 */
const routes = [
  {
    path: '/',
    name: 'Public',
    component: () => import('../pages/PublicPage.vue')
  },
  {
    path: '/verify/:id',
    name: 'Verify',
    component: () => import('../pages/VerifyPage.vue')
  },
  {
    path: '/admin',
    name: 'AdminLogin',
    component: () => import('../pages/AdminLogin.vue'),
    beforeEnter: (to, from, next) => {
      if (checkAuth()) {
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
  },
  {
    path: '/admin/logs',
    name: 'AdminLogs',
    component: () => import('../pages/AdminLogs.vue'),
    meta: { requiresAuth: true }
  }
];

/**
 * Creates and exports the active router instance.
 * Managed by Vue Router utilizing the Web History API.
 */
const router = createRouter({
  history: createWebHistory(),
  routes
});

/**
 * Global before guard.
 * Validates any route attempting to be accessed, enforcing authentication
 * using the logic defined in `auth.js` for paths designated with `meta.requiresAuth`.
 * Routes users unconditionally back to the `/admin` login view upon rejection.
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !checkAuth()) {
    next('/admin');
  } else {
    next();
  }
});

export default router;
