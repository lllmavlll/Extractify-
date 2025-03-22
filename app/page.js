"use client";

import dynamic from 'next/dynamic';
import ThemeToggle from './components/ThemeToggle';

const ImageTextExtractor = dynamic(
  () => import('./components/ImageTextExtractor'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <nav className="flex justify-between items-center mb-24">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-white">
              Extractify
            </h1>
          </div>
          <ThemeToggle />
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Extract Text from Any Image
          </h2>
          <p className="text-lg text-gray-400 mb-12">
            Transform your images into actionable text with AI. Extract key content, organize information, 
            and get instant results from your images.
          </p>

          <div className="mt-12">
            <ImageTextExtractor />
          </div>
        </div>

        {/* How It Works */}
        <div className="my-24">
          <h3 className="text-2xl font-semibold text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-xl p-6 text-center">
              <div className="text-xl mb-2">1</div>
              <h4 className="font-semibold mb-3">Upload Image</h4>
              <p className="text-gray-400 text-sm">
                Drop your image or click to upload. Our AI will process any image format.
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 text-center">
              <div className="text-xl mb-2">2</div>
              <h4 className="font-semibold mb-3">Extract Text</h4>
              <p className="text-gray-400 text-sm">
                Our AI automatically extracts all visible text from your image.
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 text-center">
              <div className="text-xl mb-2">3</div>
              <h4 className="font-semibold mb-3">Get Results</h4>
              <p className="text-gray-400 text-sm">
                Copy, edit, or download the extracted text instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
          <p>© {new Date().getFullYear()} Extractify. Open-source text extraction tool.</p>
        </footer>
      </main>
    </div>
  );
}
