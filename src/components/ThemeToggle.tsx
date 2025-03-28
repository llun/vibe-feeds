"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 border rounded-md p-1 dark:border-gray-700">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-sm ${
          theme === "light" ? "bg-gray-200 dark:bg-gray-700" : ""
        }`}
        aria-label="Light mode"
      >
        <Sun size={16} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-sm ${
          theme === "dark" ? "bg-gray-200 dark:bg-gray-700" : ""
        }`}
        aria-label="Dark mode"
      >
        <Moon size={16} />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-sm ${
          theme === "system" ? "bg-gray-200 dark:bg-gray-700" : ""
        }`}
        aria-label="System preference"
      >
        <Laptop size={16} />
      </button>
    </div>
  );
}
