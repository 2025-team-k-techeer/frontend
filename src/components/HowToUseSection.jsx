import React from 'react';
import { Link } from 'react-router-dom';

const HowToUseSection = () => {
  return (
    <section>
      <h3 className="text-xl font-bold text-brand-charcoal mb-4">사용법</h3>
      <div className="bg-gray-50 p-4 rounded-2xl flex justify-around items-center text-center">
        {/* 이미지 업로드 */}
        <Link
          to="/how-to-use#upload"
          className="flex flex-col items-center space-y-2"
        >
          <div className="bg-white p-4 rounded-full shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-brand-charcoal"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-600">
            이미지 업로드
          </span>
        </Link>

        {/* AI 생성 */}
        <Link
          to="/how-to-use#select"
          className="flex flex-col items-center space-y-2"
        >
          <div className="bg-white p-4 rounded-full shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-brand-charcoal"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-600">AI 생성</span>
        </Link>

        {/* AR */}
        <Link
          to="/how-to-use#ar"
          className="flex flex-col items-center space-y-2"
        >
          <div className="w-20 h-20 flex items-center justify-center -m-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-brand-charcoal"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" x2="12" y1="22.08" y2="12" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-600 mt-0">AR</span>
        </Link>
      </div>
    </section>
  );
};

export default HowToUseSection;
