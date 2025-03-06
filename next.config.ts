import { type NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  cacheStartUrl: true,  // Cache home page
  cacheOnFrontEndNav: true, // Cache client-side navigation
  disable: isDev,
  exclude: [
    // add buildExcludes here
    ({ asset, compilation }) => {
      if (
        asset.name.startsWith('server/') ||
        asset.name.match(/^((app-|^)build-manifest\.json|react-loadable-manifest\.json)$/)
      ) {
        return true;
      }
      return isDev && !asset.name.startsWith('static/runtime/');
    }
  ]
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  }
};

module.exports = withPWA(nextConfig);
