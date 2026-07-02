"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { getLocaleFromPathname, localizePath } from "src/i18n";
import styles from "./home-section-teaser.module.scss";

export interface TeaserProps {
  icon?: ReactNode;
  title: string;
  path: string;
  target?: "_self" | "_blank";
}

export const HomeSectionTeaser = ({
  icon,
  title,
  path,
  target = "_self",
}: TeaserProps) => {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname);
  const localizedPath = path.startsWith("http") ? path : localizePath(path, locale);

  return (
    <Link
      href={localizedPath}
      target={target}
      className={`dz-section-teaser ${styles.teaserContainer}`}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
};
