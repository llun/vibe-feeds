"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CategoryList } from "@/components/CategoryList";
import { ItemList } from "@/components/ItemList";
import { ItemContent } from "@/components/ItemContent";
import {
  mockCategories,
  getItemsForCategory,
  getItemsForSite,
  getItemById,
  getSiteById,
  getCategoryById,
} from "@/data/mockData";
import { FeedItem } from "@/types";

// Custom hook to get hash parameters
const useHashParams = () => {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash.substring(1)); // Remove leading '#'
    };

    // Initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup listener
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const params = useMemo(() => {
    const hashParams = new URLSearchParams(hash);
    return {
      categoryId: hashParams.get("category"),
      siteId: hashParams.get("site"),
      itemId: hashParams.get("item"),
      isLoading: hash.includes("loading"),
    };
  }, [hash]);

  return params;
};

// Custom hook for detecting screen size
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    // Set initial state
    listener();

    // Add listener
    media.addEventListener("change", listener);

    // Cleanup
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export default function Home() {
  const { categoryId, siteId, itemId, isLoading } = useHashParams();
  const isDesktop = useMediaQuery("(min-width: 1281px)"); // Breakpoint > 1280px
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
      const timer = setTimeout(() => {
        setShowLoading(false);
        // Remove loading from URL after timeout
        window.location.hash = window.location.hash.replace("loading", "");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const selectedCategory = useMemo(
    () => (categoryId ? getCategoryById(categoryId) : undefined),
    [categoryId]
  );
  const selectedSite = useMemo(
    () => (siteId ? getSiteById(siteId) : undefined),
    [siteId]
  );
  const selectedItem = useMemo(
    () => (itemId ? getItemById(itemId) : undefined),
    [itemId]
  );

  // Determine items to display in the list
  const itemsToList: FeedItem[] = useMemo(() => {
    if (siteId) {
      return getItemsForSite(siteId);
    } else if (categoryId) {
      return getItemsForCategory(categoryId);
    }
    return [];
  }, [categoryId, siteId]);

  // Determine title for the item list
  const listTitle = useMemo(() => {
    if (selectedSite) {
      return selectedSite.title;
    } else if (selectedCategory) {
      return selectedCategory.title;
    }
    return "Select a Category or Site";
  }, [selectedCategory, selectedSite]);

  // Loading screen component
  if (showLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Loading content...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This will take a few seconds
          </p>
        </div>
      </div>
    );
  }

  // Mobile view logic
  if (!isDesktop) {
    if (itemId && selectedItem) {
      // Show only ItemContent if an item is selected
      return (
        <main className="flex min-h-screen flex-col">
          <div className="p-2">
            <a
              href="#"
              className="inline-block mb-4 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm"
            >
              ← Back
            </a>
          </div>
          <ItemContent item={selectedItem} />
        </main>
      );
    }
    if (categoryId || siteId) {
      // Show only ItemList if category/site selected but no item
      return (
        <main className="flex min-h-screen flex-col">
          <div className="p-2">
            <a
              href="#"
              className="inline-block mb-4 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm"
            >
              ← Back
            </a>
          </div>
          <ItemList
            items={itemsToList}
            listTitle={listTitle}
            selectedItemId={itemId ?? undefined}
          />
        </main>
      );
    }
    // Default mobile view: Show only CategoryList
    return (
      <main className="flex min-h-screen flex-col">
        <CategoryList
          categories={mockCategories}
          selectedCategoryId={categoryId ?? undefined}
          selectedSiteId={siteId ?? undefined}
        />
      </main>
    );
  }

  // Desktop view: Three columns
  return (
    <main className="flex h-screen overflow-hidden">
      {/* Column 1: Categories */}
      <div className="w-1/4 xl:w-1/5 flex-shrink-0">
        <CategoryList
          categories={mockCategories}
          selectedCategoryId={categoryId ?? undefined}
          selectedSiteId={siteId ?? undefined}
        />
      </div>

      {/* Column 2: Item List */}
      <div className="w-1/3 xl:w-2/5 flex-shrink-0">
        {categoryId || siteId ? (
          <ItemList
            items={itemsToList}
            listTitle={listTitle}
            selectedItemId={itemId ?? undefined}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 p-8 text-center border-r border-gray-200 dark:border-gray-700">
            <p>
              Select a category or site from the left panel to see feed items.
            </p>
          </div>
        )}
      </div>

      {/* Column 3: Item Content */}
      <div className="flex-1">
        <ItemContent item={selectedItem} />
      </div>
    </main>
  );
}
