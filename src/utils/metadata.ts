import { config } from 'src/config';
import { Metadata } from 'next';

export const buildMetadata = ({ title, description, url, canonical, image }: {
  title: string;
  description?: string,
  url: string,
  canonical?: string;
  image?: {
    url: string,
    width: number,
    height: number,
    alt?: string
  }
}): Metadata => {
  return {
    title,
    description,
    alternates: {
      canonical: canonical ? canonical : url
    },
    openGraph: {
      title: title,
      siteName: config.title,
      url,
      type: 'article',
      images: [
        image ? {
          url: image.url,
          width: image.width,
          height: image.height
        } :
          {
            url: config.websiteImage.url,
            width: config.websiteImage.width,
            height: config.websiteImage.height
          }
      ]
    },
    // https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
    twitter: {
      title: title,
      description: description,
      images: [
        image ? {
          url: image.url,
          width: image.width,
          height: image.height,
          alt: image.alt ?? config.websiteImage.alt
        } : {
          url: config.websiteImage.url,
          width: config.websiteImage.width,
          height: config.websiteImage.height,
          alt: config.websiteImage.alt
        }
      ],
      card: 'summary_large_image',
      site: config.twitterId
    }
  };
};
