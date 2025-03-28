export interface Site {
  id: string; // Unique identifier for the site (e.g., 'hn', 'verge')
  title: string; // Display name (e.g., 'Hacker News')
  url: string; // RSS feed URL
  link?: string; // Link to the website itself
}

export interface Category {
  id: string; // Unique identifier for the category (e.g., 'tech', 'design')
  title: string; // Display name (e.g., 'Technology')
  sites: Site[];
}

export interface FeedItem {
  id: string; // Unique identifier for the item
  title: string;
  link: string; // Link to the original article
  pubDate?: string; // Publication date string
  content?: string; // Full HTML content
  contentSnippet?: string; // Short text snippet
  isoDate?: string; // ISO date string
  siteId: string; // ID of the site this item belongs to
  categoryId: string; // ID of the category this item belongs to
}
