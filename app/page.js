"use client";  // Mark this file as a Client Component

import dynamic from 'next/dynamic';
import ThemeToggle from './components/ThemeToggle';

// Dynamically import the component with no SSR
const ImageTextExtractor = dynamic(
  () => import('./components/ImageTextExtractor'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900 bg-gray-50">
      <main className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold dark:text-white text-gray-800">
            TextLift
          </h1>
          <ThemeToggle />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-3 dark:text-white text-gray-800">
            Extract Text from Any Image
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Upload an image and we'll extract all the visible text for you.
          </p>

          <ImageTextExtractor />
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} TextLift. Open-source text extraction tool.</p>
        </footer>
      </main>
    </div>
  );
}
