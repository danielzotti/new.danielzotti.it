import 'src/scss/_variables-css.scss';
import 'src/scss/styles.scss';
import styles from './not-found.module.scss';
import { Navbar } from 'src/components/navbar/navbar';
import { HeadFonts } from 'src/components/head-fonts/head-fonts';
import { ThemeContextProvider } from 'src/providers/theme-context-provider';

export const metadata = {
  robots: {
    index: false
  }
};

export default function NotFoundError() {
  return (
    <ThemeContextProvider>
      <HeadFonts />
      <Navbar />
      <div className={styles.notFound}>
        <div className={styles.detective}>
          🕵️‍♂️
        </div>
        <h1>404 | Page not found</h1>
        <p>
          Go <a href='/'>home</a>, you&apos;re drunk 🥴!
        </p>
      </div>
    </ThemeContextProvider>
  );
}
