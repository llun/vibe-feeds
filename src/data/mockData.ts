import { Category, FeedItem, Site } from "@/types";

export const mockCategories: Category[] = [
  {
    id: "tech",
    title: "Technology",
    sites: [
      {
        id: "hn",
        title: "Hacker News",
        url: "https://news.ycombinator.com/rss",
        link: "https://news.ycombinator.com/",
      },
      {
        id: "verge",
        title: "The Verge",
        url: "https://www.theverge.com/rss/index.xml",
        link: "https://www.theverge.com/",
      },
    ],
  },
  {
    id: "design",
    title: "Design",
    sites: [
      {
        id: "smashing",
        title: "Smashing Magazine",
        url: "https://www.smashingmagazine.com/feed/",
        link: "https://www.smashingmagazine.com/",
      },
    ],
  },
];

export const mockItems: FeedItem[] = [
  // Hacker News Items
  {
    id: "hn-item-1",
    title: "Show HN: A new way to visualize data",
    link: "https://example.com/hn/item1",
    pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    content:
      '<p>This is the full content for the first Hacker News item. It involves some <strong>bold text</strong> and maybe a <a href="#">link</a>.</p>',
    contentSnippet: "This is a short snippet for the first Hacker News item...",
    isoDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    siteId: "hn",
    categoryId: "tech",
  },
  {
    id: "hn-item-2",
    title: "Ask HN: How do you manage your side projects?",
    link: "https://example.com/hn/item2",
    pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    content:
      "<h2>Managing Side Projects</h2><p>Discussion about various strategies for managing side projects effectively.</p><ul><li>Time management</li><li>Motivation</li><li>Tooling</li></ul>",
    contentSnippet:
      "Discussion about various strategies for managing side projects...",
    isoDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    siteId: "hn",
    categoryId: "tech",
  },
  // The Verge Items
  {
    id: "verge-item-1",
    title: "Latest Gadget Review",
    link: "https://example.com/verge/item1",
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    content:
      "<h1>Reviewing the Newest Smartphone</h1><p>It has a great camera, but the battery life could be better. Here are the details...</p>",
    contentSnippet:
      "It has a great camera, but the battery life could be better...",
    isoDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    siteId: "verge",
    categoryId: "tech",
  },
  // Smashing Magazine Items
  {
    id: "smashing-item-1",
    title: "CSS Tricks for Modern Layouts",
    link: "https://example.com/smashing/item1",
    pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
    content:
      "<article><h1>Advanced CSS Grid Techniques</h1><p>Learn how to create complex and responsive layouts using CSS Grid. Examples included.</p><pre><code>.container { display: grid; }</code></pre></article>",
    contentSnippet:
      "Learn how to create complex and responsive layouts using CSS Grid...",
    isoDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    siteId: "smashing",
    categoryId: "design",
  },
  {
    id: "smashing-item-2",
    title: "Improving User Experience with Microinteractions",
    link: "https://example.com/smashing/item2",
    pubDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    content:
      "<h2>Microinteractions Matter</h2><p>Small details can make a big difference in how users perceive your application. This article explores effective microinteractions.</p>",
    contentSnippet:
      "Small details can make a big difference in user perception...",
    isoDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    siteId: "smashing",
    categoryId: "design",
  },
];

// Helper function to get items for a specific site
export const getItemsForSite = (siteId: string): FeedItem[] => {
  return mockItems.filter((item) => item.siteId === siteId);
};

// Helper function to get items for a specific category
export const getItemsForCategory = (categoryId: string): FeedItem[] => {
  return mockItems.filter((item) => item.categoryId === categoryId);
};

// Helper function to get a specific item by ID
export const getItemById = (itemId: string): FeedItem | undefined => {
  return mockItems.find((item) => item.id === itemId);
};

// Helper function to get a specific site by ID
export const getSiteById = (siteId: string): Site | undefined => {
  for (const category of mockCategories) {
    const site = category.sites.find((s) => s.id === siteId);
    if (site) return site;
  }
  return undefined;
};

// Helper function to get a specific category by ID
export const getCategoryById = (categoryId: string): Category | undefined => {
  return mockCategories.find((c) => c.id === categoryId);
};
