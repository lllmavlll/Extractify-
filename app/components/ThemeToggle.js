// components/ThemeToggle.js
'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the toggle after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full dark:bg-gray-800 bg-gray-200"
    >
      {theme === 'dark' ? 
        <SunIcon className="h-6 w-6 text-yellow-400" /> : 
        <MoonIcon className="h-6 w-6 text-gray-800" />
      }
    </button>
  );
}