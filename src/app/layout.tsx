import "src/scss/_variables-css.scss";
import "src/scss/styles.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ReactNode } from "react";
import { HeadFonts } from "src/components/head-fonts/head-fonts";
import { Offline } from "src/components/offline/offline";
import Pwa from "src/components/pwa/pwa";
import { config } from "src/config";
import HotjarAnalytics from "../components/hotjar-analytics/hotjar-analytics";
import { AprilsFool } from "../components/special/aprils-fool/aprils-fool";
import { Halloween } from "../components/special/halloween/halloween";
import styles from "./layout.module.scss";
import { GoogleAnalytics } from "src/components/google-analytics/google-analytics";
import { config as configFa } from "@fortawesome/fontawesome-svg-core";
import { Welcome } from "src/components/welcome/welcome";
import { Cookie } from "src/components/cookie/cookie";
import { ThemeContextProvider } from "src/providers/theme-context-provider";
import { SvgFilters } from "src/components/svg-filters/svg-filters";
import { Nineties } from "src/components/nineties/nineties";
import { Metadata, Viewport } from "next";
import { Xmas } from "src/components/special/xmas/xmas";
import { ValentinesDay } from "src/components/special/valentines-day/valentines-day";
import { WomensDay } from "src/components/special/womens-day/womens-day";
import { Easter } from "src/components/special/easter/easter";
import { PieDay } from "src/components/special/pie-day/pie-day";
import { KonamiCrt } from "../components/special/konami-crt/konami-crt";
import { Ghostbusters } from "src/components/special/ghostbusters/ghostbusters";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { defaultLocale, isLocale, type Locale } from "src/i18n";
import { getMarkdownContentByPath } from "src/utils/markdown";

configFa.autoAddCss = false;

export const viewport: Viewport = {
  themeColor: config.themeColor,
};

export const metadata: Metadata = {
  metadataBase: new URL(config.baseUrl),
  title: config.title,
  description: config.description,
  openGraph: {
    title: config.title,
    siteName: config.title,
    url: config.baseUrl,
    type: "website",
    images: [
      {
        url: config.websiteImage.url,
        width: config.websiteImage.width,
        height: config.websiteImage.height,
      },
    ],
  },
  twitter: {
    title: config.title,
    description: config.description,
    images: [
      {
        url: config.websiteImage.url,
        width: config.websiteImage.width,
        height: config.websiteImage.height,
        alt: config.websiteImage.alt,
      },
    ],
    card: "summary_large_image",
    site: config.twitterId,
  },
  manifest: config.manifest,
  robots: {
    index: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const locale = await getLocale();
  const htmlLang: Locale = isLocale(locale) ? locale : defaultLocale;
  const messages = await getMessages();
  const cookiePolicyPath = `${config.folders.contents}/cookie-policy.md`;
  const cookiePolicyContent = getMarkdownContentByPath(cookiePolicyPath, htmlLang);

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <HeadFonts />
        <GoogleAnalytics />
        <HotjarAnalytics />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SvgFilters />
          <Nineties />
          <Xmas />
          <ValentinesDay />
          <WomensDay />
          <Easter />
          <Halloween />
          <AprilsFool />
          <PieDay />
          <Ghostbusters />
          <KonamiCrt />
          <ThemeContextProvider>
            <main className={styles.mainContent}>
              {children}
              <Offline />
            </main>
            <Pwa />
            <Welcome />
            <Cookie policyContent={cookiePolicyContent} />
          </ThemeContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
