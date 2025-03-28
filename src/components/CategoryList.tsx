import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import {
  getItemsForCategory,
  getItemsForSite,
  mockItems,
} from "@/data/mockData";

interface CategoryListProps {
  categories: Category[];
  selectedCategoryId?: string;
  selectedSiteId?: string;
}

export function CategoryList({
  categories,
  selectedCategoryId,
  selectedSiteId,
}: CategoryListProps) {
  const totalItems = mockItems.length;

  return (
    <nav className="space-y-4 p-4 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <div className="mb-6 flex items-center">
        <Link href="#" className="inline-flex items-center">
          <Image
            src="/logo.svg"
            alt="RSS Feed Icon"
            width={32}
            height={32}
            className="dark:invert"
            priority
          />
          <h1 className="text-xl font-bold ml-2">FEEDS</h1>
        </Link>
      </div>
      <div className="mb-4">
        <Link
          href="#all"
          className={`block font-medium hover:text-blue-600 dark:hover:text-blue-400 ${
            !selectedCategoryId && !selectedSiteId
              ? "text-blue-700 dark:text-blue-500"
              : ""
          }`}
        >
          All Items
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
            ({totalItems})
          </span>
        </Link>
      </div>
      {categories.map((category) => (
        <div key={category.id} className="mb-4">
          <Link
            href={`#category=${category.id}`}
            className={`block font-medium hover:text-blue-600 dark:hover:text-blue-400 ${
              category.id === selectedCategoryId && !selectedSiteId
                ? "text-blue-700 dark:text-blue-500"
                : ""
            }`}
          >
            {category.title}
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              ({getItemsForCategory(category.id).length})
            </span>
          </Link>
          <ul className="ml-4 mt-2 space-y-1">
            {category.sites.map((site) => (
              <li key={site.id}>
                <Link
                  href={`#site=${site.id}`}
                  className={`block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 ${
                    site.id === selectedSiteId
                      ? "text-blue-700 dark:text-blue-500 font-medium"
                      : ""
                  }`}
                >
                  {site.title}
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    ({getItemsForSite(site.id).length})
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {!categories.length && (
        <p className="text-sm text-gray-500">No categories found.</p>
      )}
    </nav>
  );
}
