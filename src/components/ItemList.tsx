import React from "react";
import Link from "next/link";
import { FeedItem } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { BackButton } from "./BackButton";

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

export function ItemList({
  items,
  listTitle,
  selectedItemId,
  isLoading = false,
}: ItemListProps) {
  return (
    <div className="border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="md:hidden mb-2">
          <BackButton />
        </div>
        <h2 className="text-lg font-semibold">{listTitle}</h2>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-96 p-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Loading items...
          </p>
        </div>
      ) : items.length > 0 ? (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item) => (
            <li
              key={item.id}
              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                item.id === selectedItemId ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
            >
              <Link href={`#item=${item.id}`} className="block">
                <h3
                  className={`font-medium mb-1 ${
                    item.id === selectedItemId
                      ? "text-blue-700 dark:text-blue-500"
                      : ""
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-1">
                  {item.contentSnippet}
                </p>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {formatDate(item.isoDate)}
                </span>
              </Link>
            </li>
          ))}
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
  );
}
