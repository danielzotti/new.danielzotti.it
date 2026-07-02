"use client";

import styles from "./back-button.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getLocaleFromPathname, localizePath } from "src/i18n";

interface BackButtonProps {
  path: string;
  text?: string;
}

export const BackButton = ({ path, text = "Go back" }: BackButtonProps) => {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname);
  return (
    <div className={styles.back}>
      <Link href={localizePath(path, locale)}>
        {" "}
        <FontAwesomeIcon icon={faArrowLeft} /> {text}
      </Link>
    </div>
  );
};
