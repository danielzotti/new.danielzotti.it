"use client";

import { isHalloween } from "../../../utils/halloween";
import styles from "./halloween.module.scss";
import { useEffect, useRef, useState } from "react";

export const Halloween = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const flashRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleHalloween = () => {
    setIsActive((active) => !active);
  };

  function doFlash(intensity = 0.5, duration = 150) {
    const flash = flashRef.current;

    if (!flash) {
      return;
    }
    flash.style.transition = "none";
    flash.style.opacity = String(intensity);
    flash.style.background = "white";
    // tiny delay then fade
    requestAnimationFrame(() => {
      flash.style.transition = `opacity ${duration}ms ease-out, background ${duration}ms ease-out`;
      flash.style.opacity = "0.25";
      flash.style.background = "red";
    });
  }

  // make random lightning cadence (with occasional multi-flash)
  function scheduleNextFlash(isFirstCall = false) {
    const delay = isFirstCall ? 0 : 2000 + Math.random() * 7000; // between ~2s and ~9s
    setTimeout(() => {
      // flash sequence
      const flashes =
        Math.random() < 0.25 ? 2 + Math.floor(Math.random() * 3) : 1; // sometimes multi
      for (let i = 0; i < flashes; i++) {
        setTimeout(
          () => {
            const intensity = 0.6 + Math.random() * 0.5;
            const duration = 80 + Math.random() * 200;
            doFlash(intensity, isFirstCall ? 2000 : duration);
          },
          i * (60 + Math.random() * 120),
        ); // quick bursts
      }
      scheduleNextFlash();
    }, delay);
  }

  useEffect(() => {
    if (!isHalloween()) {
      return;
    }

    setIsActive(true);
    setTimeout(() => {
      scheduleNextFlash(true);
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = "1";
        wrapperRef.current.style.pointerEvents = "all";
      }
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isHalloween() && !isActive) {
    return null;
  }

  return (
    <>
      {isActive && (
        <>
          <div ref={wrapperRef} className={styles.wrapper}>
            <button className={styles.text} onClick={toggleHalloween}>
              Click here to end Halloween effect
            </button>
          </div>
          <div ref={flashRef} className={styles.flash}></div>
        </>
      )}
    </>
  );
};
