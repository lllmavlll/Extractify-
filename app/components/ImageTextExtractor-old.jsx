// Create a new file: components/ImageTextExtractor.js
'use client';

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { createWorker } from 'tesseract.js';
import { UploadIcon, PrinterIcon, EyeIcon, ClipboardIcon } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import Head from 'next/head';
import { useTheme } from 'next-themes';

export default function ImageTextExtractor() {
  const [imageUrl, setImageUrl] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { theme, setTheme } = useTheme();

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      setIsProcessing(true);
      setImageUrl(URL.createObjectURL(file));

      try {
        // Create worker with explicit worker path
        const worker = await createWorker({
          logger: m => console.log(m)
        });

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(file);
        setExtractedText(text);
        await worker.terminate();
      } catch (error) {
        console.error('Error extracting text:', error);
        setExtractedText('Error extracting text. Please try again with a different image.');
      } finally {
        setIsProcessing(false);
      }
    } else {
      alert('Please upload a valid image file');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    }
  });
  const copyToClipboard = () => {
    if (textRef.current) {
      navigator.clipboard.writeText(extractedText)
      alert('Text copied to clipboard!')
    }
  }

  const generatePDF = () => {
    const element = document.getElementById('extracted-text')
    const opt = {
      margin: 1,
      filename: 'extracted-text.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().set(opt).from(element).save()
  }

  return (
    <>
      <div
        {...getRootProps()}
        className={`
              border-2 border-dashed rounded-lg p-10 cursor-pointer 
              transition-colors duration-200 mx-auto max-w-2xl
              ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'}
              ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
              dark:text-white text-gray-800
            `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <UploadIcon className="h-12 w-12 mb-3 text-gray-400 dark:text-gray-600" />
          {isProcessing ? (
            <p>Processing image, please wait...</p>
          ) : isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <div>
              <p className="font-medium">Drag and drop an image here, or click to select</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Supports PNG, JPG, JPEG, GIF, etc.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Extracted Text Section */}
      {extractedText && (
          <div className="mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold dark:text-white text-gray-800">
                Extracted Text
              </h3>
              <div className="flex space-x-2">
                <button 
                  onClick={copyToClipboard}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  <ClipboardIcon className="h-4 w-4 mr-1" />
                  Copy
                </button>
                <button 
                  onClick={generatePDF}
                  className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  <PrinterIcon className="h-4 w-4 mr-1" />
                  Print
                </button>
                <button 
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center px-3 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  <EyeIcon className="h-4 w-4 mr-1" />
                  View Image
                </button>
              </div>
            </div>
            <div 
              id="extracted-text"
              ref={textRef} 
              className="bg-gray-50 dark:bg-gray-900 p-4 rounded border dark:border-gray-700 whitespace-pre-wrap"
            >
              {extractedText}
            </div>
          </div>

          
        )}

           {/* Image Preview Modal */}
           {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
              <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold dark:text-white">Image Preview</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  &times;
                </button>
              </div>
              <div className="p-4">
                {imageUrl && (
                  <img 
                    src={imageUrl} 
                    alt="Uploaded image" 
                    className="max-w-full h-auto rounded"
                  />
                )}
              </div>
            </div>
          </div>
        )}
    </>
  )
}