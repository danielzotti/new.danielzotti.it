import fs from 'fs';
import matter from 'gray-matter';

export const getMarkdownContentByPath = (path: string) => {
  const file = fs.readFileSync(`${path}`, 'utf-8');
  const matterResult = matter(file);
  return matterResult.content;
};
