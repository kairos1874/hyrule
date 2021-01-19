import { defineConfig } from 'dumi';

export default defineConfig({
  // more config: https://d.umijs.org/config
  title: 'Hyrule',
  favicon: '/favicon.ico',
  logo: '/logo.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  navs: [
    null,
    {
      title: 'gitlab',
      path: 'http://172.16.120.120/hy-department-ai/hyrule-wild/hyrule',
    },
  ],
});
