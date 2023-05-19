'use client';

import styles from './home-navbar.module.scss';
import { Navbar } from '../navbar/navbar';
import { useCallback, useEffect, useRef, useState } from 'react';

export const HomeNavbar = () => {
  const navbarContainerRef = useRef<HTMLDivElement>(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(false);

  const checkNavbarVisibility = useCallback(() => {
    if (!navbarContainerRef.current) {
      return;
    }
    if (window.scrollY >= navbarContainerRef.current?.offsetTop) {
      setIsNavbarVisible(true);
    } else {
      setIsNavbarVisible(false);
    }
  }, []);

  useEffect(() => {
    checkNavbarVisibility();
    window.addEventListener('scroll', checkNavbarVisibility);

    return () => {
      window.removeEventListener('scroll', checkNavbarVisibility);
    };
  }, [checkNavbarVisibility]);

  return <div className={`${styles.navbar} ${isNavbarVisible ? 'is-visible' : ''}`} ref={navbarContainerRef}>
    <Navbar />
  </div>;
}
;
