import { UserService } from '@/services/UserService';
import { Utilities } from '@/tools/Utilities';
import Home from '@/views/Home.vue';
import Vue from 'vue';
import VueRouter, { Route, RouteConfig } from 'vue-router';
import { dashboard, misc } from './routes';

Vue.use(VueRouter);

const userService = UserService.getInstance();

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Home,
  },
  ...dashboard,
  ...misc,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/**
 * Returns true if user is authenticated.
 *
 * @returns {boolean}
 */
function isAuthenticated(): boolean {
  return !!userService.getActive()?.authenticationToken;
}

/**
 * Returns true if given route requires authentication.
 */
function isAuthenticationRequired(route: Route): boolean {
  return route.matched.some((record) => record.meta.requiresAuth);
}

router.beforeEach((to, from, next) => {
  if (Utilities.isUsingIEBrowser() && to.name !== 'unsupported-browser') {
    return next({
      name: 'unsupported-browser',
    });
  }

  if (isAuthenticationRequired(to)) {
    // not authenticated; go to login
    if (!isAuthenticated()) {
      const route = {
        name: 'login',
        params: to.params,
        query: {
          redirect: to.path,
        },
      };
      return next(route);
    }
  }

  return next();
});

export default router;
