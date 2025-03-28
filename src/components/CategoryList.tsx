import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";

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
  return (
    <nav className="space-y-4 p-4 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <div className="mb-6 flex flex-col items-center">
        <Link href="#" className="inline-block">
          <Image
            src="/logo.svg"
            alt="RSS Feed Icon"
            width={32}
            height={32}
            className="dark:invert mb-1"
            priority
          />
        </Link>
        <h1 className="text-xl font-bold mt-2">FEEDS</h1>
      </div>
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
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
