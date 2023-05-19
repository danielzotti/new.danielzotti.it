import { getArticleMetadataList } from '../../utils/articles';
import styles from './page.module.scss';
import { Teaser } from '../../components/teaser/teaser';

export default function BlogPage() {
  const articleMetadataList = getArticleMetadataList();
  return (
    <>
      <h1>Blog</h1>
      <div className={styles.articles}>
        {articleMetadataList.map(({ slug, title, description, date, tags }) => (
          <Teaser key={slug} title={title} url={`blog/${slug}`} tags={tags} date={date} description={description} />
        ))}
      </div>
    </>
  );
}
