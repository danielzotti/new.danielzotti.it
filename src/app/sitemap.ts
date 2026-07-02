import fs from "fs";
import { MetadataRoute } from "next";
import { config } from "src/config";
import { localizePath, supportedLocales } from "src/i18n";

export const dynamic = "force-static";
export const revalidate = 10;

export default function sitemap(): MetadataRoute.Sitemap {
  const localeHomes: MetadataRoute.Sitemap = supportedLocales.map((locale) => ({
    url: `${config.baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));

  const staticUrls: MetadataRoute.Sitemap = Object.values(config.urls).flatMap(
    (path) =>
      supportedLocales.map((locale) => ({
        url: `${config.baseUrl}${localizePath(path, locale)}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      })),
  );

  const articleSlugs = fs
    .readdirSync(config.folders.articles)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((filename) => filename.replace(".md", ""));

  const articles: MetadataRoute.Sitemap = articleSlugs.flatMap((slug) =>
    supportedLocales.map((locale) => ({
      url: `${config.baseUrl}${localizePath(`${config.urls.blog}/${slug}`, locale)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  );

  const projectSlugs = ["ambigram", "qr-code-generator", "ascii-smuggler"];
  const projects: MetadataRoute.Sitemap = projectSlugs.flatMap((slug) =>
    supportedLocales.map((locale) => ({
      url: `${config.baseUrl}${localizePath(`${config.urls.projects}/${slug}`, locale)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  );

  const githubProjects: MetadataRoute.Sitemap = config.github.selectedRepos.flatMap(
    (item) =>
      supportedLocales.map((locale) => ({
        url: `${config.baseUrl}${localizePath(`${config.urls.openSource}/${item.slug}`, locale)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      })),
  );

  return [
    ...localeHomes,
    ...staticUrls,
    ...articles,
    ...projects,
    ...githubProjects,
  ];
}
