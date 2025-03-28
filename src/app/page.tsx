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
  mockItems,
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
      showAll: hash === "all",
      itemListLoading: hash.includes("itemListLoading"),
    };
  }, [hash]);

  return params;
};

// Create a BackButton component that can be reused
function BackButton() {
  return (
    <a
      href="#"
      className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
      aria-label="Go back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      Back
    </a>
  );
}

export default function Home() {
  const { categoryId, siteId, itemId, isLoading, showAll, itemListLoading } =
    useHashParams();
  const [showLoading, setShowLoading] = useState(false);
  const [showItemListLoading, setShowItemListLoading] = useState(false);

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

  useEffect(() => {
    if (itemListLoading) {
      setShowItemListLoading(true);
      const timer = setTimeout(() => {
        setShowItemListLoading(false);
        // Remove itemListLoading from URL after timeout
        window.location.hash = window.location.hash.replace(
          "itemListLoading",
          ""
        );
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [itemListLoading]);

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
    if (showAll) {
      return mockItems;
    }
    if (siteId) {
      return getItemsForSite(siteId);
    } else if (categoryId) {
      return getItemsForCategory(categoryId);
    }
    return [];
  }, [categoryId, siteId, showAll]);

  // Determine title for the item list
  const listTitle = useMemo(() => {
    if (showAll) {
      return "All Items";
    }
    if (selectedSite) {
      return selectedSite.title;
    } else if (selectedCategory) {
      return selectedCategory.title;
    }
    return "Select a Category or Site";
  }, [selectedCategory, selectedSite, showAll]);

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

  return (
    <main className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Column 1: Categories - Hidden on mobile when viewing item or list */}
      <div
        className={`w-full md:w-1/4 xl:w-1/5 flex-shrink-0 md:block ${
          categoryId || siteId || showAll || itemId ? "hidden" : ""
        }`}
      >
        <CategoryList
          categories={mockCategories}
          selectedCategoryId={categoryId ?? undefined}
          selectedSiteId={siteId ?? undefined}
        />
      </div>

      {/* Column 2: Item List - Hidden on mobile when viewing item */}
      <div
        className={`w-full md:w-1/3 xl:w-2/5 flex-shrink-0 md:block ${
          itemId ? "hidden" : ""
        }`}
      >
        {categoryId || siteId || showAll ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
              <BackButton />
            </div>
            <ItemList
              items={itemsToList}
              listTitle={listTitle}
              selectedItemId={itemId ?? undefined}
              isLoading={showItemListLoading}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 p-8 text-center border-r border-gray-200 dark:border-gray-700">
            <p>
              Select a category or site from the left panel to see feed items.
            </p>
          </div>
        )}
      </div>

      {/* Column 3: Item Content - Full width on mobile when viewing item */}
      <div className={`w-full flex-1 ${!itemId ? "hidden md:block" : ""}`}>
        {itemId && (
          <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
            <BackButton />
          </div>
        )}
        <ItemContent item={selectedItem} />
      </div>
    </main>
  );
}
