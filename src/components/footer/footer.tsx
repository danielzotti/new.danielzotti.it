import styles from "./footer.module.scss";
import Link from "next/link";
import { config } from "src/config";

export const Footer = () => {
  return (
    <footer className={`dz-footer ${styles.wrapper}`}>
      <div className="container">
        {/*<span>Made with ❤️ by <Link href={'/me'}>me</Link>!</span>*/}
        🍪 <Link href={config.urls.cookiePolicy}>Cookie Policy</Link>
      </div>
    </footer>
  );
};
