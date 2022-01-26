import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },

  theme: {
    '@primary-color': '#794019',

    '@border-radius-base': '12px',

    '@btn-default-color': '#794019',
    '@btn-default-border': '#794019',

    '@btn-primary-color': '#794019',
    '@btn-primary-bg': '#bf8f2b',
  },

  routes: [
    {
      path: '/',
      component: '@/layout',
      routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: '@/pages/home' },
      ],
    },
  ],
  fastRefresh: {},
});
