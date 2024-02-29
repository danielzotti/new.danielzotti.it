import styles from './ambigram.module.scss';
import { config } from 'src/config';
import { getMarkdownContentByPath } from 'src/utils/markdown';
import { Markdown } from 'src/components/markdown/markdown';

export const AmbigramIntro = () => {
  return (
    <Markdown className={styles.intro}>
      {getMarkdownContentByPath(
        `${config.folders.projects}/ambigram/content.md`
      )}
    </Markdown>
  );
};
