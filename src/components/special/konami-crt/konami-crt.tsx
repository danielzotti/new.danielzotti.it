"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./konami-crt.module.scss";

const KONAMI_CODE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

const ROOT_CLASS = "konami-crt-active";

const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName;
  return (
    target.isContentEditable ||
    tagName === "INPUT" ||
    tagName === "TEXTAREA" ||
    tagName === "SELECT"
  );
};

export const KonamiCrt = () => {
  const [isActive, setIsActive] = useState(false);
  const codeIndexRef = useRef(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || isEditableTarget(event.target)) {
        return;
      }

      const currentKey = event.key.toLowerCase();
      const expectedKey = KONAMI_CODE[codeIndexRef.current];

      if (currentKey === expectedKey) {
        codeIndexRef.current += 1;

        if (codeIndexRef.current >= KONAMI_CODE.length) {
          setIsActive((value) => !value);
          codeIndexRef.current = 0;
        }
        return;
      }

      codeIndexRef.current = currentKey === KONAMI_CODE[0] ? 1 : 0;
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.classList.remove(ROOT_CLASS);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle(ROOT_CLASS, isActive);
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  return (
    <div className={styles.banner} role="status" aria-live="polite">
      <p className={styles.title}>You hit the Konami code!</p>
      <a
        className={styles.link}
        href="https://en.wikipedia.org/wiki/Konami_Code"
        target="_blank"
        rel="noreferrer"
      >
        Discover the history of the Konami Code
      </a>
      <button
        className={styles.deactivateButton}
        type="button"
        onClick={() => setIsActive(false)}
      >
        Deactivate CRT effect
      </button>
    </div>
  );
};
