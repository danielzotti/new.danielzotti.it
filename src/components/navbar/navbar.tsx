'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { config } from '../../config';
import styles from './navbar.module.scss';
import logo from '../../../public/static/images/brand/danielzotti-logo-medium.webp';
import { ThemeSelector } from '../theme-selector/theme-selector';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';

const items: NavbarItem[] = [
  {
    path: config.urls.blog,
    label: 'Blog'
  },
  {
    path: config.urls.projects,
    label: 'Projects'
  },
  {
    path: config.urls.openSource,
    label: 'Open Source'
  }
];

export const Navbar = () => {
  const pathName = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = useCallback(() => {
    setIsOpen((open) => !open);
  }, [setIsOpen, isOpen]);

  return (
    <div className={`dz-navbar ${styles.navbar} ${isOpen ? styles.isOpen : ''}`}>
      <div className='container'>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Link href={config.urls.home} title='Go to home page'>
              <Image
                className="dz-navbar__logo"
                src={logo}
                alt='Daniel Zotti logo'
                width={80}
                height={48}
                priority
              />
            </Link>
          </div>
          <div className={`dz-navbar__items ${styles.itemsContainer}`}>
            {items.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`${styles.item} ${
                  pathName?.startsWith(item.path) ? 'active' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className={styles.themeSelector}>
              <ThemeSelector />
            </div>
          </div>
          <button className={styles.hamburger} onClick={toggleMenu} aria-label='Menu hamburger'>
            {!isOpen && <FontAwesomeIcon icon={faBars} />}
            {isOpen && <FontAwesomeIcon icon={faTimes} />}
          </button>
        </div>
      </div>
    </div>
  );
};
