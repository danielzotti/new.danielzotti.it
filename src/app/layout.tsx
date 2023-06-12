import '../scss/_variables-css.scss';
import '../scss/styles.scss';
import { ReactNode, Suspense } from 'react';
import { HeadFonts } from '../components/head-fonts/head-fonts';
import Pwa from '../components/pwa/pwa';
import { config } from '../config';
import styles from './layout.module.scss';
import { GoogleAnalytics } from '../components/google-analytics/google-analytics';
import { config as configFa } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Welcome } from '../components/welcome/welcome';
import { Cookie } from '../components/cookie/cookie';
import { ThemeContextProvider } from '../providers/theme-context-provider';
import { SvgFilters } from '../components/svg-filters/svg-filters';
import { Nineties } from '../components/nineties/nineties';

configFa.autoAddCss = false;

export const metadata = {
  title: config.title,
  description: config.description,
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
  themeColor: config.themeColor,
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
