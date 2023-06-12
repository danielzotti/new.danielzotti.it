import Image from 'next/image';
import styles from './home-banner.module.scss';
import logo from '../../../public/static/images/brand/danielzotti-logo-medium.webp';
import { Videoprofile } from '../videoprofile/videoprofile';
import { AppVersion } from '../app-version/app-version';

export const HomerBanner = () => {
  return (
    <div className={`dz-home-banner ${styles.banner}`}>
      <AppVersion />
      <div className='container'>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Image
              src={logo}
              alt='Daniel Zotti logo'
              rel='preload'
              priority
            />
          </div>
          <h1 className={styles.name}>
            <span className={styles.firstLastName}>DANIEL ZOTTI</span>
            <span className={styles.work}>creative web developer</span>
          </h1>
        </div>
        <div className={styles.videoprofile}>
          <Videoprofile />
        </div>
      </div>
    </div>
  );
};
