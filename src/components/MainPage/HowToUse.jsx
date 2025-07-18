import React from 'react';
import { Link } from 'react-router-dom';
import PictureIcon from '../../assets/Icon/Picture.svg?react';
import AIIcon from '../../assets/Icon/AI.svg?react';
import ARIcon from '../../assets/Icon/AR.svg?react';

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
            <PictureIcon className="h-10 w-10 text-brand-charcoal" />
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
            <AIIcon className="h-10 w-10 text-brand-charcoal" />
          </div>
          <span className="text-sm font-medium text-gray-600">AI 생성</span>
        </Link>

        {/* AR */}
        <Link
          to="/how-to-use#ar"
          className="flex flex-col items-center space-y-2"
        >
          <div className="w-20 h-20 flex items-center justify-center -m-2">
            <ARIcon className="h-10 w-10 text-brand-charcoal" />
          </div>
          <span className="text-sm font-medium text-gray-600 mt-0">AR</span>
        </Link>
      </div>
    </section>
  );
};

export default HowToUseSection;
