import { MetadataRoute } from 'next';
import { config } from 'src/config';
import fs from 'fs';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = Object.entries(config.urls)
    .map(([key, url]) => (
      {
        url: `${config.baseUrl}${url}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1
      }
    ));

  const articles: MetadataRoute.Sitemap = fs.readdirSync(config.folders.articles).filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map(filename => ({
      url: `${config.baseUrl}${config.urls.blog}/${filename?.replace('.md', '')}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }));

  const projects: MetadataRoute.Sitemap = ['ambigram', 'qr-code-generator'].map(slug => ({
    url: `${config.baseUrl}${config.urls.projects}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  const githubProjects: MetadataRoute.Sitemap = config.github.selectedRepos.map(item => ({
    url: `${config.baseUrl}${config.urls.openSource}/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  const sitemap = [
    ...staticUrls,
    ...articles,
    ...projects,
    ...githubProjects
  ];

  console.log({ sitemap });
  return sitemap;

}
