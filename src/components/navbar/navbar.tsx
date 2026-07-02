"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { config } from "src/config";
import { getLocaleFromPathname, localizePath } from "src/i18n";
import styles from "./navbar.module.scss";
import logo from "public/static/images/brand/danielzotti-logo-medium.webp";
import { ThemeSelector } from "src/components/theme-selector/theme-selector";
import { LanguageSelector } from "src/components/language-selector/language-selector";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";

export const Navbar = () => {
  const pathName = usePathname();
  const locale = getLocaleFromPathname(pathName || "/");
  const t = useTranslations("navbar");

  const items: NavbarItem[] = [
    {
      path: config.urls.aboutMe,
      label: t("aboutMe"),
    },
    {
      path: config.urls.blog,
      label: t("blog"),
    },
    {
      path: config.urls.projects,
      label: t("projects"),
    },
    {
      path: config.urls.openSource,
      label: t("openSource"),
    },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = useCallback(() => {
    setIsOpen((open) => !open);
  }, [setIsOpen]);

  return (
    <header
      className={`dz-navbar ${styles.navbar} ${isOpen ? styles.isOpen : ""}`}
    >
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Link
              href={localizePath(config.urls.home, locale)}
              title={t("homeTitle")}
            >
              <Image
                className="dz-navbar__logo"
                src={logo}
                alt="Daniel Zotti logo"
                width={80}
                height={48}
                priority
              />
            </Link>
          </div>
          <nav className={`dz-navbar__items ${styles.itemsContainer}`}>
            {items.map((item) => (
              <Link
                key={item.path}
                href={localizePath(item.path, locale)}
                className={`${styles.item} ${
                  pathName?.startsWith(localizePath(item.path, locale))
                    ? "active"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className={styles.languageSelector}>
              <LanguageSelector />
            </div>
            <div className={styles.themeSelector}>
              <ThemeSelector />
            </div>
          </nav>
          <button
            className={styles.hamburger}
            onClick={toggleMenu}
            aria-label={t("hamburger")}
          >
            {!isOpen && <FontAwesomeIcon icon={faBars} />}
            {isOpen && <FontAwesomeIcon icon={faTimes} />}
          </button>
        </div>
      </div>
    </header>
  );
};
