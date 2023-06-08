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
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { buildMetadata } from '../../../utils/metadata';

export async function generateMetadata(
  { params: { article } }: { params: { article: string } }
): Promise<Metadata> {

  const metadata = getArticleMetadata(article);

  return buildMetadata({
    title: config.blogPageTitle(metadata?.title),
    description: metadata?.description,
    url: `${config.baseUrl}/blog/${article}`
  });
}

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
  const metadata = getArticleMetadata(params.article);
  const { toDate } = useDate();

  if (!metadata || !markdown) {
    return notFound();
  }

  const { tags, date } = metadata;

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
