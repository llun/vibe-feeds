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
      {
        id: "longname",
        title:
          "This is an Extremely Long Site Name That Will Definitely Need Truncation When Displayed in the UI Because it Contains Well Over Three Hundred Characters and Will Likely Cause Layout Issues if Not Properly Handled and Truncated Appropriately Using CSS or JavaScript Methods Such as Text Overflow Ellipsis or Custom Truncation Logic That Preserves the Readability While Ensuring the UI Remains Clean and Consistent Across Various Screen Sizes",
        url: "https://example.com/feed.xml",
        link: "https://example.com",
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

// Base items that will be part of the expanded list
const baseItems: FeedItem[] = [
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
  // Long-named site items
  {
    id: "longname-item-1",
    title: "Article from site with very long name",
    link: "https://example.com/longname/item1",
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    content:
      "<p>This is an article from a site with a very long name that needs to be truncated properly.</p>",
    contentSnippet: "This is an article from a site with a very long name...",
    isoDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    siteId: "longname",
    categoryId: "tech",
  },
  {
    id: "longname-item-2",
    title: "Second article from long-named site",
    link: "https://example.com/longname/item2",
    pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    content:
      "<p>Another article from our site with the extremely long name that should be truncated in the UI.</p>",
    contentSnippet:
      "Another article from our site with the extremely long name...",
    isoDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    siteId: "longname",
    categoryId: "tech",
  },
];

// Generate additional mock items to reach 50 items total
const generateMockItems = (count: number): FeedItem[] => {
  const items: FeedItem[] = [...baseItems];

  // Sample tech news titles
  const techTitles = [
    "The Future of AI in 2024",
    "Open Source vs Commercial Software: The Eternal Debate",
    "Why TypeScript is Winning Over JavaScript",
    "Serverless Architecture: Benefits and Drawbacks",
    "Blockchain Beyond Cryptocurrency",
    "Web Assembly and the Future of Web Development",
    "Quantum Computing: Practical Applications",
    "IoT Security Concerns Every Developer Should Know",
    "Machine Learning Models for Small Datasets",
    "The Rise of Low-Code Platforms",
    "Flutter vs React Native: Which to Choose in 2024",
    "Database Optimization Techniques",
    "Building Microservices Architecture",
    "Cloud Computing Trends to Watch",
    "GraphQL vs REST: When to Use Each",
  ];

  // Sample design titles
  const designTitles = [
    "Design Systems That Scale",
    "Typography Trends in Web Design",
    "Color Theory for Digital Products",
    "Mobile-First Design Principles",
    "Accessibility in Modern Web Applications",
    "Animation Best Practices for Web Interfaces",
    "Dark Mode Design Considerations",
    "Minimalism vs Maximalism in UI Design",
    "The Psychology of User Experience",
    "Responsive Design Beyond Media Queries",
    "UI Design for Voice Interfaces",
    "Iconography in Modern Applications",
    "Data Visualization Design Principles",
    "Designing for Different Cultural Contexts",
    "The Role of Whitespace in Web Design",
  ];

  // Sample sites and categories
  const sites = ["hn", "verge", "smashing"];

  // Generate additional items
  for (let i = 0; i < count - baseItems.length; i++) {
    const siteId = sites[Math.floor(Math.random() * sites.length)];
    const categoryId = siteId === "smashing" ? "design" : "tech";
    const titles = categoryId === "tech" ? techTitles : designTitles;
    const title = titles[Math.floor(Math.random() * titles.length)];

    // Create random time offset between 1 hour and 30 days
    const hoursAgo = Math.floor(Math.random() * 30 * 24) + 1;
    const date = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();

    // Create content and snippet
    const content = `<article><h1>${title}</h1><p>This is detailed content for the article about ${title.toLowerCase()}. It contains multiple paragraphs and possibly some code examples or images.</p><p>Second paragraph with more information and details about the topic.</p></article>`;
    const contentSnippet = `This is a short snippet about ${title.toLowerCase()}...`;

    items.push({
      id: `${siteId}-item-${i + baseItems.length + 1}`,
      title,
      link: `https://example.com/${siteId}/item${i + baseItems.length + 1}`,
      pubDate: date,
      content,
      contentSnippet,
      isoDate: date,
      siteId,
      categoryId,
    });
  }

  // Sort all items by date (newest first)
  return items.sort((a, b) => {
    return (
      new Date(b.isoDate || "").getTime() - new Date(a.isoDate || "").getTime()
    );
  });
};

// Export the expanded list with 50 items total
export const mockItems: FeedItem[] = generateMockItems(50);

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
