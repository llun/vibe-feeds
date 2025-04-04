import React from "react";
import { FeedItem } from "@/types";
import { format } from "date-fns";
import { BackButton } from "./BackButton";

interface ItemContentProps {
  item?: FeedItem;
}

// Helper to format date safely
const formatFullDate = (isoDate?: string): string => {
  if (!isoDate) return "";
  try {
    return format(new Date(isoDate), "MMMM d, yyyy, h:mm a");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

export function ItemContent({ item }: ItemContentProps) {
  if (!item) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 p-8 text-center">
        <p>Select an item from the list to view its content.</p>
      </div>
    );
  }

  return (
    <article className="h-full overflow-hidden flex flex-col">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="md:hidden p-4 border-b border-gray-200 dark:border-gray-700">
          <BackButton />
        </div>
        <div className="p-6 pb-3">
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>Published: {formatFullDate(item.isoDate)}</span>
            {item.link && (
              <>
                <span className="mx-2">|</span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  View Original
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="p-6 pt-4 prose dark:prose-invert lg:prose-xl max-w-none overflow-y-auto flex-1">
        {/* Render HTML content safely */}
        {item.content ? (
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        ) : (
          <p>No content available.</p>
        )}
      </div>
    </article>
  );
}
