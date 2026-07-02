"use client";

import styles from "./home-navbar.module.scss";
import { Navbar } from "src/components/navbar/navbar";
import { useCallback, useEffect, useState } from "react";

export const HomeNavbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(false);

  const checkNavbarVisibility = useCallback(() => {
    setIsNavbarVisible(window.scrollY >= 300);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkNavbarVisibility();
    window.addEventListener("scroll", checkNavbarVisibility);

    return () => {
      window.removeEventListener("scroll", checkNavbarVisibility);
    };
  }, [checkNavbarVisibility]);

  return (
    <div className={`${styles.navbar} ${isNavbarVisible ? "is-visible" : ""}`}>
      <Navbar />
    </div>
  );
};
