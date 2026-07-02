"use client";

import "src/scss/_variables-css.scss";
import "src/scss/styles.scss";
import Link from "next/link";
import styles from "./not-found.module.scss";
import { Navbar } from "src/components/navbar/navbar";
import { HeadFonts } from "src/components/head-fonts/head-fonts";
import { ThemeContextProvider } from "src/providers/theme-context-provider";
import { useTranslations } from "next-intl";
import { localizePath } from "src/i18n";
import { useLocale } from "next-intl";

export const metadata = {
  robots: {
    index: false,
  },
};

export default function NotFoundError() {
  const t = useTranslations("notFound");
  const locale = useLocale();
  const homeLink = localizePath("/", locale as "en" | "it");

  return (
    <ThemeContextProvider>
      <HeadFonts />
      <Navbar />
      <div className={styles.notFound}>
        <div className={styles.detective}>{t("detective")}</div>
        <h1>{t("title404")}</h1>
        <p>
          {t("toHome")}
          <Link href={homeLink}>{t("homeLink")}</Link>, {t("message").split("🥴")[0]}
          🥴!
        </p>
      </div>
    </ThemeContextProvider>
  );
}
