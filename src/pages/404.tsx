import '../scss/_variables-css.scss';
import '../scss/styles.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';
import styles from './404.module.scss';
import { HeadFonts } from '../components/head-fonts/head-fonts';
import { ThemeContextProvider } from '../providers/theme-context-provider';
import { InternalPageLayout } from '../shared/layouts/internal-page-layout/internal-page-layout';

export const metadata = {
  robots: {
    index: false
  }
};

export default function NotFoundError() {
  return (
    <ThemeContextProvider>
      <HeadFonts />
      <InternalPageLayout>
        <div className={styles.notFound}>
          <div className={styles.detective}>
            🕵️‍♂️
          </div>
          <h1>404 | Page not found</h1>
          <p>
            Go <a href='/'>home</a>, you&apos;re drunk 🥴!
          </p>
        </div>
      </InternalPageLayout>
    </ThemeContextProvider>
  );
}
