import * as fs from 'fs';
import matter from 'gray-matter';
import { config } from '../config';
import { ArticleMetadata } from '../models/blog.models';

export const getArticle = (slug: string) => {
  const file = fs.readFileSync(
    `${config.folders.articles}/${slug}.md`,
    'utf-8'
  );
  const matterResult = matter(file);
  return {
    ...matterResult
  };
};


export const getArticleContent = (slug: string) => {
  return getArticle(slug).content;
};

export const getArticleMetadata = (slug: string): ArticleMetadata => {
  const markdown = getArticle(slug);
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
  const markdownFilenames = files.filter((file) => file.endsWith('.md'));
  return markdownFilenames.map((filename) => {
    return getArticleMetadata(filename.replace('.md', ''));
  });
};
