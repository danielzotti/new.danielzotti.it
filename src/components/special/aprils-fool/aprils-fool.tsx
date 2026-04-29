"use client";

import { useEffect, useRef, useState } from "react";
import { isAprilsFool } from "../../../utils/aprils-fool";
import styles from "./aprils-fool.module.scss";

export const AprilsFool = () => {
  const [isActive, setIsActive] = useState<boolean>(isAprilsFool());
  const [isStyleActive, setIsStyleActive] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement>(null);

  const toggleAprilsFool = () => {
    setIsActive((active) => !active);
  };

  useEffect(() => {
    if (!isAprilsFool()) {
      return;
    }
    if (wrapperRef.current) {
      wrapperRef.current.style.opacity = "1";
      wrapperRef.current.style.scale = "1";
      wrapperRef.current.style.pointerEvents = "all";
      setTimeout(() => {
        setIsStyleActive(true);
      }, 500);
    }
  }, [isActive, isStyleActive]);

  if (!isAprilsFool() && !isActive) {
    return null;
  }

  return (
    <>
      {isActive && (
        <>
          <div ref={wrapperRef} className={styles.wrapper}>
            <button className={styles.text} onClick={toggleAprilsFool}>
              <span className={styles.textMain}>
                Stop the April&apos;s Fool chaos
              </span>
              <span className={styles.textSub}>
                Click to flip the world back
              </span>
            </button>
          </div>
          {isStyleActive && (
            <style
              ref={styleRef}
            >{`.page-content-container, .dz-navbar__items a, .videoprofile { rotate: 180deg; }`}</style>
          )}
        </>
      )}
    </>
  );
};
