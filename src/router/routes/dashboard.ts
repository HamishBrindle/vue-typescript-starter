// import { AuthService } from '@/services/AuthService';
import Login from '@/views/Dashboard/Auth/Login.vue';
import Dashboard from '@/views/Dashboard/Dashboard.vue';
import DashboardHome from '@/views/Dashboard/DashboardHome.vue';
import { RouteConfig } from 'vue-router';

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
      meta: {
        layout: 'dashboard',
        requiresAuth: true,
      },
    },
    {
      path: 'settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "Settings" */ '@/views/Dashboard/Settings.vue'),
      meta: {
        layout: 'dashboard',
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
