import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  onwarn: (warning, handler) => {
    if (warning.code === 'css-unused-selector') {
      return;
    }
    handler(warning);
  },
  kit: {
    appDir: 's',
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      precompress: true,
      // strict: true,
    }),
    alias: {
      '@api': path.resolve('./src/lib/api'),
      '@components': path.resolve('./src/lib/components'),
      '@layout': path.resolve('./src/lib/layout'),
      '@store': path.resolve('./src/lib/store'),
      '@styles': path.resolve('./src/lib/styles'),
      '@utils': path.resolve('./src/lib/_utils'),
      '@shape-shifters': path.resolve('./src/lib/_utils/shape-shifters'),
    },
    inlineStyleThreshold: Infinity,
    prerender: {
      entries: [
        '/cv',
        '/cv/awards',
        '/cv/certifications',
        '/cv/classifications',
        '/cv/industries',
        '/cv/organizations',
        '/cv/experiences',
        '/cv/projects',
        '/cv/skills',
        '/cv/skill/fixing-errors',
        '/posts/category',
        '/privacy',
        '/404',
        '/RSS.xml',
      ],
      handleHttpError: ({ path, referrer, message }) => {
        if (path === '/404' && referrer === '/privacy/') {
          return;
        }
        if (path.includes('/uploads') || /^\/cv\//.test(path)) {
          return;
        }
        if (path.includes('/v')) {
          return;
        }
        throw new Error(message);
      },
      handleMissingId: 'ignore',
    },
    csp: {
      mode: 'auto',
      directives: {
        'script-src': ['strict-dynamic'],
        'style-src': ['self', 'unsafe-inline'],
      },
    },
    csrf: {
      checkOrigin: false,
    },
  },
};

export default config;
