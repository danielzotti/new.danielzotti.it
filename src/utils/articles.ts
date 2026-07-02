import { existsSync, readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { config } from "../config";
import { ArticleMetadata } from "../models/blog.models";
import { DateTime } from "luxon";
import type { Locale } from "../i18n";

const getLocalizedArticlePath = (slug: string, locale: Locale): string => {
  const defaultPath = `${config.folders.articles}/${slug}.md`;
  const localizedPath = `${config.folders.articles}/${slug}.${locale}.md`;

  if (locale !== "en" && existsSync(localizedPath)) {
    return localizedPath;
  }

  return defaultPath;
};

export const getArticle = (slug: string, locale: Locale = "en") => {
  try {
    if (slug.startsWith("_")) {
      return;
    }
    const file = readFileSync(getLocalizedArticlePath(slug, locale), "utf-8");

    const matterResult = matter(file);
    return {
      ...matterResult,
    };
  } catch (ex) {
    console.error(ex);
  }
};

export const getArticleContent = (slug: string, locale: Locale = "en") => {
  return getArticle(slug, locale)?.content;
};

export const getArticleMetadata = (
  slug: string,
  locale: Locale = "en",
): ArticleMetadata | undefined => {
  const markdown = getArticle(slug, locale);

  if (!markdown) {
    return;
  }

  const {
    data: { title, date, description, tags },
  } = markdown;

  const articleDate = DateTime.fromFormat(date, config.dates.luxon.article);
  const todayDate = DateTime.now();
  if (todayDate < articleDate) {
    return;
  }

  return {
    title,
    date,
    description,
    tags,
    slug: slug.replace(".md", ""),
  };
};

export const getArticleMetadataList = (
  locale: Locale = "en",
): Array<ArticleMetadata> => {
  const files = readdirSync(config.folders.articles);
  const markdownFilenames = files.filter(
    (file) =>
      file.endsWith(".md") && !file.startsWith("_") && !file.endsWith(".it.md"),
  );
  const articles = markdownFilenames
    .map((filename) =>
      getArticleMetadata(filename?.replace(".md", ""), locale),
    )
    .filter((file) => !!file) as ArticleMetadata[];
  return articles.filter((file) => {
    const articleDate = DateTime.fromFormat(
      file.date,
      config.dates.luxon.article,
    );
    const todayDate = DateTime.now();
    return articleDate <= todayDate;
  });
};
