import styles from './cookie-policy-content.module.scss';
import { getMarkdownContentByPath } from '../../utils/markdown';
import { config } from '../../config';
// import Markdown from 'markdown-to-jsx';
import { Markdown } from '../markdown/markdown';

export const CookiePolicyContent = () => {
  return <div className={styles.cookiePolicyContent}>
    <Markdown className={styles.intro}>
      {getMarkdownContentByPath(
        `${config.folders.contents}/cookie-policy.md`
      )}
    </Markdown>
  </div>;
};
