import { AuthService } from '@/services/AuthService';
import Login from '@/views/Dashboard/Auth/Login.vue';
import Dashboard from '@/views/Dashboard/Dashboard.vue';
import DashboardHome from '@/views/Dashboard/DashboardHome.vue';
import { RouteConfig } from 'vue-router';

const authService = AuthService.getInstance();

/**
 * Helper to check user access against app abilities
 *
 * @param action
 * @param subject
 */
function can(action: any, entity: any): boolean {
  return authService.getAbility().can(action, entity);
}

const config: Array<RouteConfig> = [{
  path: '/dashboard',
  component: Dashboard,
  children: [
    {
      path: '',
      redirect: 'login',
    },
    {
      path: 'home',
      name: 'home',
      component: DashboardHome,
      beforeEnter: (to, from, next) => {
        if (can('read', 'Report')) {
          return next();
        }
        return next({ name: 'orders-list' });
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "Settings" */ '@/views/Dashboard/Settings.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'login',
      name: 'login',
      meta: {
        layout: 'full-screen',
      },
      component: Login,
    },
    {
      path: 'logout',
      name: 'logout',
      meta: {
        layout: 'full-screen',
      },
      component: () => import(/* webpackChunkName: "Auth" */ '@/views/Dashboard/Auth/Logout.vue'),
    },
  ],
}];

export default config;
