import React from 'react';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-red-500 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome to Home
        </h1>
        <p className="text-gray-700">TailwindCSS is working correctly!</p>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Click Me
        </button>
      </div>
    </div>
  );
}
