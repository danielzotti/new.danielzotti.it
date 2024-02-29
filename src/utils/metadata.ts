import { config } from 'src/config';
import { Metadata } from 'next';

export const buildMetadata = ({ title, description, url, canonical }: {
  title: string;
  description?: string,
  url: string,
  canonical?: string;
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
        {
          url: config.websiteImage.url,
          width: config.websiteImage.width,
          height: config.websiteImage.height
        }
      ]
    },
    twitter: {
      title: title,
      description: description,
      images: [
        {
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
