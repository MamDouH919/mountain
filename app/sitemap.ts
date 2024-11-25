import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: 'https://mountain-egy.site',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://mountain-egy.site/clinets',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.64,
    },
    {
      url: 'https://mountain-egy.site/employment',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.64,
    },
    {
      url: 'https://mountain-egy.site/news',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.64,
    },
  ]
}
