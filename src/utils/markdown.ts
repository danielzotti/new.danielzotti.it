import { existsSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "src/i18n";

const getLocalizedMarkdownPath = (markdownPath: string, locale: Locale) => {
  const parsedPath = path.parse(markdownPath);
  const localizedPath = path.join(
    parsedPath.dir,
    `${parsedPath.name}.${locale}${parsedPath.ext}`,
  );

  return existsSync(localizedPath) ? localizedPath : markdownPath;
};

export const getMarkdownContentByPath = (
  markdownPath: string,
  locale?: Locale,
) => {
  const filePath = locale
    ? getLocalizedMarkdownPath(markdownPath, locale)
    : markdownPath;
  const file = readFileSync(filePath, "utf-8");
  const matterResult = matter(file);
  return matterResult.content;
};
