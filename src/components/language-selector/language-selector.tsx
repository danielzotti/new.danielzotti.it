"use client";

import { usePathname, useRouter } from "next/navigation";
import { config } from "src/config";
import {
  getLocaleFromPathname,
  Locale,
  localizePath,
  stripLocaleFromPathname,
} from "src/i18n";
import styles from "./language-selector.module.scss";

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  it: "🇮🇹",
};

const nextLocaleMap: Record<Locale, Locale> = {
  en: "it",
  it: "en",
};

export const LanguageSelector = () => {
  const router = useRouter();
  const pathname = usePathname() || "/";

  const currentLocale = getLocaleFromPathname(pathname);
  const nextLocale = nextLocaleMap[currentLocale];
  const cleanPathname = stripLocaleFromPathname(pathname);

  const title =
    currentLocale === "en"
      ? "Selected language is English. Click to switch to Italian."
      : "La lingua selezionata è Italiano. Clicca per passare a English.";

  return (
    <button
      title={title}
      aria-label={title}
      onClick={() => {
        document.cookie = `${config.localeCookieName}=${nextLocale}; path=/; max-age=31536000`;
        const queryString = window.location.search.replace("?", "");
        const localizedPath = localizePath(cleanPathname, nextLocale);
        router.push(queryString ? `${localizedPath}?${queryString}` : localizedPath);
      }}
      className={styles.languageSelector}
    >
      <span className={styles.flag} aria-hidden>
        {localeFlags[currentLocale]}
      </span>
      <span className={styles.locale}>{currentLocale}</span>
    </button>
  );
};
