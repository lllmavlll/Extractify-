"use client";

import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { useDropzone } from 'react-dropzone';

export default function ImageTextExtractor() {
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setError(null);

      const worker = await createWorker();
      // Updated worker initialization
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      
      const { data: { text } } = await worker.recognize(file);
      setExtractedText(text);
      
      await worker.terminate();
    } catch (err) {
      setError('Error processing image. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
    },
    multiple: false
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}`}
      >
        <input {...getInputProps()} />
        <div className="text-gray-600 dark:text-gray-400">
          {isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Drag & drop an image here, or click to select one</p>
          )}
        </div>
      </div>

      {isProcessing && (
        <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Processing image... Please wait.
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-500">
          {error}
        </div>
      )}

      {extractedText && !isProcessing && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Extracted Text:</h3>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {extractedText}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}