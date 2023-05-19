import { config } from '../../../config';
import {
  getArticleContent, getArticleMetadata,
  getArticleMetadataList
} from '../../../utils/articles';
import styles from './page.module.scss';
import { BackButton } from '../../../components/back-button/back-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useDate } from '../../../hooks/useDate';
import { Markdown } from '../../../components/markdown/markdown';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return getArticleMetadataList().map(({ slug, tags }) => ({
    article: slug
  }));
}

export default function ArticlePage({
  params
}: {
  params: { article: string, tags: Array<string> };
}) {
  const markdown = getArticleContent(params.article);
  const { tags, date } = getArticleMetadata(params.article);
  const { toDate } = useDate();
  return (
    <>
      <BackButton path={config.urls.blog} text={'Blog'} />
      <div className={styles.contentWrapper}>
        <div className={styles.metadata}>
          {date &&
            <div className={styles.date}><FontAwesomeIcon icon={faCalendar} />&nbsp;{toDate(date)}</div>}
          {tags?.length > 0 &&
            <div className={styles.tags}><FontAwesomeIcon icon={faTags} />&nbsp;{tags.map(t => t.trim()).join(', ')}
            </div>}
        </div>

        <Markdown className={styles.content}>{markdown}</Markdown>
      </div>
    </>
  );
}
