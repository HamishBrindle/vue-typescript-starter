import { RouteConfig } from 'vue-router';

const config: Array<RouteConfig> = [
  {
    path: '*',
    name: 'error',
    component: () => import(/* webpackChunkName: "Error" */ '@/views/Misc/Error.vue'),
    meta: {
      layout: 'full-screen',
    },
    props: {
      code: 404,
      reason: 'Page Not Found',
      message: 'Sorry, we\'re unable to find the page you\'re looking for!',
    },
  },
  {
    path: '*',
    name: 'unsupported-browser',
    component: () => import(/* webpackChunkName: "UnsupportedBrowser" */ '@/views/Misc/UnsupportedBrowser.vue'),
    meta: {
      layout: 'full-screen',
    },
  },
];

export default config;
