const { URL, md, xl, xxl } = require('../vars');
const POSTS_URL = `${URL}/posts`;

module.exports = {
  label: 'Posts - Hover Seventh Post',
  url: POSTS_URL,
  viewports: [md, xl, xxl],
  onReadyScript: 'playwright/onReadyPosts.js',
  hoverSelector: '.posts-grid li:nth-child(7) .post-link',
  postInteractionWait: 800,
  selectors: ['document'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
