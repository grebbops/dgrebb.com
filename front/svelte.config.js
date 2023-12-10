import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    appDir: 's',
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      precompress: true,
      strict: true,
      hooks: {
        // client: '$lib/_hooks/hooks.client.js',
        server: '$lib/_hooks/hooks.server.js',
      },
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
      ],
      handleHttpError: ({ path, referrer, message }) => {
        if (path === '/404' && referrer === '/privacy/') {
          return;
        }
        if (path.includes('/uploads')) {
          return;
        }
        if (path.includes('/v') || path.includes('/cv')) {
          return;
        }
        throw new Error(message);
      },
      handleMissingId: 'warn',
    },
  },
};

export default config;
