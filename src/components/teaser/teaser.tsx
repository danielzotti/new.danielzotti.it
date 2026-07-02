"use client";

import React, { type JSX } from "react";
import { toFormattedDate } from "../../utils/date";
import styles from "./teaser.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faCalendar,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, localizePath } from "src/i18n";

export interface TeaserProps {
  title: string;
  url: string;
  description?: string;
  tags?: Array<string>;
  date?: string;
  target?: "_self" | "_blank";
}

export const Teaser = ({
  title,
  description,
  url,
  tags,
  date,
  target = "_self",
}: TeaserProps): JSX.Element => {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname);
  const href = url.startsWith("http") ? url : localizePath(url, locale);

  return (
    <Link className={`dz-teaser ${styles.wrapper}`} href={href} target={target}>
      {target === "_blank" && (
        <div className={styles.newWindow}>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      {tags && tags.length > 0 && (
        <p className={styles.tags}>
          <FontAwesomeIcon icon={faTags} />
          &nbsp;{tags.join(", ")}
        </p>
      )}
      {date && (
        <p className={styles.date}>
          <FontAwesomeIcon icon={faCalendar} />
          &nbsp;{toFormattedDate(date, locale)}
        </p>
      )}
    </Link>
  );
};
