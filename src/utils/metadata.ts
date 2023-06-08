import { config } from '../config';
import { Metadata } from 'next';

export const buildMetadata = ({ title, description, url }: { title: string; description?: string, url: string }): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title: title,
      siteName: config.title,
      url,
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
