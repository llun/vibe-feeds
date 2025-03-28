import React from "react";
import Link from "next/link";
import { FeedItem } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { BackButton } from "./BackButton";
import { getSiteById } from "@/data/mockData";

interface ItemListProps {
  items: FeedItem[];
  listTitle: string;
  selectedItemId?: string;
  isLoading?: boolean;
}

// Helper to format date safely
const formatDate = (isoDate?: string): string => {
  if (!isoDate) return "";
  try {
    return formatDistanceToNow(new Date(isoDate), { addSuffix: true });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

// Helper to get site name and link
const getSiteInfo = (siteId: string) => {
  const site = getSiteById(siteId);
  return {
    title: site?.title || "Unknown",
    link: site?.link || "#",
  };
};

export function ItemList({
  items,
  listTitle,
  selectedItemId,
  isLoading = false,
}: ItemListProps) {
  return (
    <div className="border-r border-gray-200 dark:border-gray-700 h-full overflow-hidden flex flex-col">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="md:hidden p-4 border-b border-gray-200 dark:border-gray-700">
          <BackButton />
        </div>
        <div className="p-3">
          <h2 className="text-lg font-semibold">{listTitle}</h2>
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96 p-4">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Loading items...
            </p>
          </div>
        ) : items.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {items.map((item) => {
              const { title: siteName, link: siteLink } = getSiteInfo(
                item.siteId
              );

              return (
                <li
                  key={item.id}
                  className={`py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    item.id === selectedItemId
                      ? "bg-gray-100 dark:bg-gray-800"
                      : ""
                  }`}
                >
                  <Link href={`#item=${item.id}`} className="block">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-2">
                        <h3
                          className={`font-medium text-sm ${
                            item.id === selectedItemId
                              ? "text-blue-700 dark:text-blue-500"
                              : ""
                          }`}
                        >
                          {item.title}
                        </h3>
                        <div className="flex items-center mt-1">
                          <a
                            href={siteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-500 dark:text-gray-400 font-medium hover:text-blue-600 dark:hover:text-blue-400"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {siteName}
                          </a>
                          <span className="mx-1 text-gray-400 dark:text-gray-500 text-xs">
                            •
                          </span>
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {formatDate(item.isoDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>No items to display.</p>
            <p className="text-sm">
              Select a category or site from the left panel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
