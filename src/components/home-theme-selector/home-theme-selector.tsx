"use client";

import styles from "./home-theme-selector.module.scss";
import { useContext } from "react";
import { ThemeContext } from "src/providers/theme-context-provider";
import yoda from "public/static/images/icons/yoda.svg";
import darthVader from "public/static/images/icons/darth-vader.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "src/i18n";

export const HomeThemeSelector = () => {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname);
  const labels = {
    en: {
      darkAlt: "Icon of Darth Vader representing the dark theme",
      lightAlt: "Icon of Yoda representing the light theme",
      osPrefix: "...or let the OS",
      osDecide: "decide",
      osSuffix: "for you!",
    },
    it: {
      darkAlt: "Icona di Darth Vader che rappresenta il tema scuro",
      lightAlt: "Icona di Yoda che rappresenta il tema chiaro",
      osPrefix: "...oppure lascia che il sistema operativo",
      osDecide: "decida",
      osSuffix: "per te!",
    },
  };
  const t = (key: keyof (typeof labels)["en"]) => labels[locale][key];

  const { toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <div className={`dz-home-theme-selector ${styles.buttonsContainer}`}>
        <button className={styles.button} onClick={() => toggleTheme("dark")}>
          <Image src={darthVader} alt={t("darkAlt")} />
        </button>
        <button className={styles.button} onClick={() => toggleTheme("light")}>
          <Image src={yoda} alt={t("lightAlt")} />
        </button>
      </div>
      <p>
        {t("osPrefix")}{" "}
        <button
          className={styles.osDefault}
          onClick={() => toggleTheme("os default")}
        >
          {t("osDecide")}
        </button>{" "}
        {t("osSuffix")}
      </p>
    </>
  );
};
