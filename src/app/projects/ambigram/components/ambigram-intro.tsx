import styles from './ambigram.module.scss';
import { config } from '../../../../config';
import { getMarkdownContentByPath } from '../../../../utils/markdown';
import { Markdown } from '../../../../components/markdown/markdown';
// import Markdown from 'markdown-to-jsx';

export const AmbigramIntro = () => {
  return (
    <Markdown className={styles.intro}>
      {getMarkdownContentByPath(
        `${config.folders.projects}/ambigram/content.md`
      )}
    </Markdown>
  );
};
