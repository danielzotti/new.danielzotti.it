import styles from './cookie-policy-content.module.scss';
import { getMarkdownContentByPath } from 'src/utils/markdown';
import { config } from 'src/config';
import { Markdown } from 'src/components/markdown/markdown';

export const CookiePolicyContent = () => {
  return <div className={styles.cookiePolicyContent}>
    <Markdown className={styles.intro}>
      {getMarkdownContentByPath(
        `${config.folders.contents}/cookie-policy.md`
      )}
    </Markdown>
  </div>;
};
