import { MetadataRoute } from "next";
import articles from "@/data/articles.json";

const SITE = "https://universaljournalnews.uz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [
    { 
      url: `${SITE}/`, 
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    { 
      url: `${SITE}/about`, 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    { 
      url: `${SITE}/archive`, 
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    { 
      url: `${SITE}/issues`, 
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    { 
      url: `${SITE}/editorial-board`, 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    { 
      url: `${SITE}/author-guidelines`, 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    { 
      url: `${SITE}/policies`, 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    { 
      url: `${SITE}/publication-ethics`, 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    { 
      url: `${SITE}/contact`, 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Add all articles with proper dates
  for (const article of articles) {
    const lastMod = article.publishedAt || article.published 
      ? new Date(article.publishedAt || article.published || '') 
      : new Date();
    
    urls.push({ 
      url: `${SITE}/articles/${article.slug}`, 
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.95, // Articles have high priority for Google Scholar
    });
  }

  // Add issue pages
  const issues = new Set<string>();
  articles.forEach(article => {
    if (article.issue) {
      const issueUrl = `${SITE}/issues/${article.issue.year}/${article.issue.volume}/${article.issue.number}`;
      issues.add(issueUrl);
    }
  });

  issues.forEach(issueUrl => {
    urls.push({
      url: issueUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  return urls;
}