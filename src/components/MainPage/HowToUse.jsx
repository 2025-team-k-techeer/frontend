import React from 'react';
import { Link } from 'react-router-dom';
import PictureIcon from '/src/assets/Icon/picture.svg?react';
import AIIcon from '/src/assets/Icon/AI.svg?react';
import ARIcon from '/src/assets/Icon/AR.svg?react';

const HowToUseSection = () => {
  return (
    <section>
      <h3 className="text-xl font-bold text-brand-charcoal mb-2 lg:p-5">
        사용법
      </h3>
      <div className="bg-sage-bg p-4 rounded-2xl flex justify-around items-center text-center">
        {/* 이미지 업로드 */}
        <Link
          to="/Manual#upload"
          className="flex flex-col items-center space-y-2"
        >
          <div className="bg-white rounded-xl shadow-sm p-1">
            <AIIcon className="h-10 w-10 text-brand-charcoal" />
          </div>
          <span className="text-sm font-medium text-gray-600">AI 인테리어</span>
        </Link>
        {/* AI 생성 */}
        <Link
          to="/Manual#select"
          className="flex flex-col items-center space-y-2"
        >
          <div className="bg-white rounded-xl shadow-sm p-1">
            <ARIcon className="h-10 w-10 text-brand-charcoal" />
          </div>
          <span className="text-sm font-medium text-gray-600">AR로 보기</span>
        </Link>

        {/* AR */}
        <Link to="/Manual#ar" className="flex flex-col items-center space-y-2">
          <div className="bg-white rounded-xl shadow-sm p-1">
            <PictureIcon className="h-10 w-10 text-brand-charcoal" />
          </div>
          <span className="text-sm font-medium text-gray-600 mt-0">
            라이브러리
          </span>
        </Link>
      </div>
    </section>
  );
};

export default HowToUseSection;
