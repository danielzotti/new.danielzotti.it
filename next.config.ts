import { type NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPWAInit from "@ducanh2912/next-pwa";
import { getOfflineManifestEntries } from "./src/utils/pwa";

const withNextIntl = createNextIntlPlugin();

const isDev = process.env.NODE_ENV !== "production";

const withPWA = withPWAInit({
  dest: "public",
  register: false, // handled manually in src/components/pwa/pwa.tsx
  cacheStartUrl: true,
  dynamicStartUrl: false,
  cacheOnFrontEndNav: true,
  disable: isDev,
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
    additionalManifestEntries: getOfflineManifestEntries(),
    ignoreURLParametersMatching: [/^v$/],
    exclude: [
      /_buildManifest\.js$/,
      /_ssgManifest\.js$/,
      /^server\//,
      /build-manifest\.json$/,
      /react-loadable-manifest\.json$/,
      /\.map$/,
    ],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-webfonts",
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "google-fonts-stylesheets",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
          },
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    mcpServer: true,
  },
};

export default withPWA(withNextIntl(nextConfig));
