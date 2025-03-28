import React from "react";
import { ChevronLeft } from "lucide-react";

export function BackButton() {
  return (
    <a
      href="#"
      className="md:hidden inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mr-3"
      aria-label="Go back"
    >
      <ChevronLeft className="h-5 w-5 mr-1" />
      Back
    </a>
  );
}
