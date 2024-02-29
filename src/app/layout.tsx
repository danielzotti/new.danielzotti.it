import 'src/scss/_variables-css.scss';
import 'src/scss/styles.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ReactNode, Suspense } from 'react';
import { HeadFonts } from 'src/components/head-fonts/head-fonts';
import Pwa from 'src/components/pwa/pwa';
import { config } from 'src/config';
import styles from './layout.module.scss';
import { GoogleAnalytics } from 'src/components/google-analytics/google-analytics';
import { config as configFa } from '@fortawesome/fontawesome-svg-core';
import { Welcome } from 'src/components/welcome/welcome';
import { Cookie } from 'src/components/cookie/cookie';
import { ThemeContextProvider } from 'src/providers/theme-context-provider';
import { SvgFilters } from 'src/components/svg-filters/svg-filters';
import { Nineties } from 'src/components/nineties/nineties';
import { Viewport } from 'next';
import { Xmas } from 'src/components/xmas/xmas';
import { ValentinesDay } from 'src/components/valentines-day/valentines-day';

configFa.autoAddCss = false;

export const viewport: Viewport = {
  themeColor: config.themeColor
};

export const metadata = {
  metadataBase: new URL(config.baseUrl),
  title: config.title,
  description: config.description,
  alternates: {
    canonical: config.baseUrl,
  },
  openGraph: {
    title: config.title,
    siteName: config.title,
    url: config.baseUrl,
    type: 'website',
    images: [
      {
        url: config.websiteImage.url,
        width: config.websiteImage.width,
        height: config.websiteImage.height
      }
    ]
  },
  twitter: {
    title: config.title,
    description: config.description,
    images: [
      {
        url: config.websiteImage.url,
        width: config.websiteImage.width,
        height: config.websiteImage.height,
        alt: config.websiteImage.alt
      }
    ],
    card: 'summary_large_image',
    site: config.twitterId
  },
  manifest: config.manifest,
  robots: {
    index: true
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <HeadFonts />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </head>
      <body>
        <SvgFilters />
        <Nineties />
        <Xmas />
        <ValentinesDay />
        <ThemeContextProvider>
          <main className={styles.mainContent}>
            {children}
          </main>
          <Pwa />
          <Welcome />
          <Cookie />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
