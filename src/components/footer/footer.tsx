"use client";

import styles from "./footer.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { config } from "src/config";
import { getLocaleFromPathname, localizePath } from "src/i18n";

export const Footer = () => {
  const pathName = usePathname() || "/";
  const locale = getLocaleFromPathname(pathName);
  const label = locale === "it" ? "Cookie Policy" : "Cookie Policy";

  return (
    <footer className={`dz-footer ${styles.wrapper}`}>
      <div className="container">
        {/*<span>Made with ❤️ by <Link href={'/me'}>me</Link>!</span>*/}
        🍪{" "}
        <Link href={localizePath(config.urls.cookiePolicy, locale)}>{label}</Link>
      </div>
    </footer>
  );
};
