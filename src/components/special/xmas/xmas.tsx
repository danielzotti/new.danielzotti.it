"use client";

import { faSnowflake } from "@fortawesome/free-regular-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Button } from "src/shared/components/ui/button/button";
import { isXmasTime } from "../../../utils/xmas";
import styles from "./xmas.module.scss";

interface XmasProps {
  activateQueryParam?: string;
}

export const Xmas = ({ activateQueryParam = "xmas" }: XmasProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const root = useRef<HTMLHtmlElement | null>(null);

  const toggleXmas = () => {
    setIsActive((active) => !active);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);

    const xmas = searchParams.get(activateQueryParam);

    if (xmas === null && !isXmasTime()) {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsActive(true);

    root.current = document.querySelector(":root");

    root.current!.style.setProperty(
      "--cursor-default",
      "url(/static/xmas/xmas-cursor-with-daniel.png), auto",
    );
    root.current!.style.setProperty(
      "--cursor-pointer",
      "url(/static/xmas/xmas-cursor-with-daniel-pointer.png), pointer",
    );
  }, [activateQueryParam]);

  if (!isXmasTime() && !isActive) {
    return null;
  }

  return (
    <>
      <Button className={styles.stopBtn} onClick={toggleXmas}>
        <span className={`${styles.stopBtnLayers} fa-layers`}>
          <FontAwesomeIcon className={styles.snowflake} icon={faSnowflake} />
          {isActive && (
            <FontAwesomeIcon
              className={styles.ban}
              icon={faBan}
              color={"red"}
            />
          )}
        </span>
      </Button>
      {isActive && (
        <div className={styles.snowWrapper}>
          <div className={styles.snow}></div>
        </div>
      )}
    </>
  );
};
