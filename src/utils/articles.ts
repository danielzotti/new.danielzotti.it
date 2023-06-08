import * as fs from 'fs';
import matter from 'gray-matter';
import { config } from '../config';
import { ArticleMetadata } from '../models/blog.models';

export const getArticle = (slug: string) => {
  try {
    if (slug.startsWith('_')) {
      return;
    }
    const file = fs.readFileSync(
      `${config.folders.articles}/${slug}.md`,
      'utf-8'
    );

    const matterResult = matter(file);
    return {
      ...matterResult
    };
  } catch (ex) {
    console.error(ex);
  }
};


export const getArticleContent = (slug: string) => {
  return getArticle(slug)?.content;
};

export const getArticleMetadata = (slug: string): ArticleMetadata | undefined => {
  const markdown = getArticle(slug);

  if (!markdown) {
    return;
  }

  const { data: { title, date, description, tags } } = matter(markdown);
  return {
    title,
    date,
    description,
    tags,
    slug: slug.replace('.md', '')
  };
};


export const getArticleMetadataList = (): Array<ArticleMetadata> => {
  const files = fs.readdirSync(config.folders.articles);
  const markdownFilenames = files.filter((file) => file.endsWith('.md') && !file.startsWith('_'));
  return markdownFilenames
    .map((filename) => getArticleMetadata(filename?.replace('.md', '')))
    .filter(file => !!file) as ArticleMetadata[];
};
