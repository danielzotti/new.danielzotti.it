import { config } from "src/config";
import { Metadata } from "next";
import { Locale, localizePath, supportedLocales } from "src/i18n";

export const buildMetadata = ({
  title,
  description,
  path,
  locale,
  image,
}: {
  title: string;
  description?: string;
  path: string;
  locale: Locale;
  image?: {
    url: string;
    width: number;
    height: number;
    alt?: string;
  };
}): Metadata => {
  const canonical = `${config.baseUrl}${localizePath(path, locale)}`;
  const languages = Object.fromEntries(
    supportedLocales.map((supportedLocale) => [
      supportedLocale,
      `${config.baseUrl}${localizePath(path, supportedLocale)}`,
    ]),
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: title,
      siteName: config.title,
      url: canonical,
      type: "article",
      images: [
        image
          ? {
              url: image.url,
              width: image.width,
              height: image.height,
            }
          : {
              url: config.websiteImage.url,
              width: config.websiteImage.width,
              height: config.websiteImage.height,
            },
      ],
    },
    // https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
    twitter: {
      title: title,
      description: description,
      images: [
        image
          ? {
              url: image.url,
              width: image.width,
              height: image.height,
              alt: image.alt ?? config.websiteImage.alt,
            }
          : {
              url: config.websiteImage.url,
              width: config.websiteImage.width,
              height: config.websiteImage.height,
              alt: config.websiteImage.alt,
            },
      ],
      card: "summary_large_image",
      site: config.twitterId,
    },
  };
};
