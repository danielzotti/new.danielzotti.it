import { createHash } from "crypto";
import { readFileSync } from "fs";
import { join } from "path";
import { config } from "../config";
import { localizePath, supportedLocales } from "../i18n";
import { getArticleMetadataList } from "./articles";

type PrecacheEntry = {
  url: string;
  revision: string;
};

const getOfflineRevision = () => {
  // Force cached route snapshots to refresh on each production build.
  return (
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.GITHUB_SHA ??
    createHash("sha1").update(String(Date.now())).digest("hex")
  );
};

const getLocalizedRoutes = () =>
  supportedLocales.flatMap((locale) => [
    localizePath("/", locale),
    localizePath("/about-me", locale),
    localizePath("/blog", locale),
    localizePath("/cookie-policy", locale),
    localizePath("/me", locale),
    localizePath("/nineties", locale),
    localizePath("/open-source", locale),
    localizePath("/projects", locale),
    localizePath("/projects/ambigram", locale),
    localizePath("/projects/ascii-smuggler", locale),
    localizePath("/projects/qr-code-generator", locale),
  ]);

const getArticleRoutes = () =>
  getArticleMetadataList().flatMap(({ slug }) =>
    supportedLocales.map((locale) => localizePath(`${config.urls.blog}/${slug}`, locale)),
  );

const getOpenSourceRoutes = () =>
  config.github.selectedRepos.flatMap(({ slug }) =>
    supportedLocales.map((locale) =>
      localizePath(`${config.urls.openSource}/${slug}`, locale),
    ),
  );

const getStaticFileRevision = (publicRelativePath: string): string => {
  try {
    const absolutePath = join(process.cwd(), "public", publicRelativePath);
    const content = readFileSync(absolutePath);
    return createHash("md5").update(content).digest("hex");
  } catch {
    return getOfflineRevision();
  }
};

const getCvEntries = (): PrecacheEntry[] =>
  [config.assetsUrl.cv.italian, config.assetsUrl.cv.english].map((url) => {
    // Strip query params to get the filesystem path, keep full URL for cache key
    const filePath = decodeURIComponent(url.split("?")[0]);
    return {
      url,
      revision: getStaticFileRevision(filePath),
    };
  });

const getLocalFontEntries = (): PrecacheEntry[] =>
  config.localFontPaths.map((path) => ({
    url: path,
    revision: getStaticFileRevision(path),
  }));

export const getOfflineManifestEntries = (): PrecacheEntry[] => {
  const revision = getOfflineRevision();

  const urls = new Set<string>([
    ...getLocalizedRoutes(),
    ...getArticleRoutes(),
    ...getOpenSourceRoutes(),
    "/robots.txt",
    "/sitemap.xml",
  ]);

  return [
    ...[...urls].map((url) => ({ url, revision })),
    ...getCvEntries(),
    ...getLocalFontEntries(),
  ];
};
