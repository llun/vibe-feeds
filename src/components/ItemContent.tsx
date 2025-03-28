import React from "react";
import { FeedItem } from "@/types";
import { format } from "date-fns";

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
    <article className="h-full overflow-y-auto">
      <div className="sticky top-0 bg-white dark:bg-gray-900 p-6 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start mb-2">
          <a
            href="#"
            className="md:hidden inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mr-3 mt-1"
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
          <h1 className="text-2xl font-bold flex-1">{item.title}</h1>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
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
      <div className="p-6 pt-4 prose dark:prose-invert lg:prose-xl max-w-none">
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
