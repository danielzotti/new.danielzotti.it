import { getArticleMetadataList } from '../../utils/articles';
import styles from './page.module.scss';
import { Teaser } from '../../components/teaser/teaser';
import { config } from '../../config';

export default function BlogPage() {
  const articleMetadataList = getArticleMetadataList().sort((a, b) => a.date > b.date ? -1 : 1);
  return (
    <>
      <h1>Blog</h1>
      <div className={styles.articles}>
        {articleMetadataList.map(({ slug, title, description, date, tags }) => (
          <Teaser key={slug} title={title} url={`${config.urls.blog}/${slug}`} tags={tags} date={date}
            description={description} />
        ))}
      </div>
    </>
  );
}
