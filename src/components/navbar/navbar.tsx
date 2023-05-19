'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { config } from '../../config';
import styles from './navbar.module.scss';
import logo from '../../../public/static/images/brand/danielzotti-logo-medium.webp';
import { ThemeSelector } from '../theme-selector/theme-selector';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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
    console.log(isOpen)
  }, [setIsOpen, isOpen]);

  return (
    <div className={`${styles.navbar} ${isOpen ? styles.isOpen : ''}` }>
      <div className='container'>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Link href={config.urls.home} title='Go to home page'>
              <Image
                src={logo}
                alt='Daniel Zotti logo'
                width={80}
                height={48}
                priority
              />
            </Link>
          </div>
          <div className={styles.itemsContainer}>
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
          <button className={styles.hamburger} onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </div>
  );
};
