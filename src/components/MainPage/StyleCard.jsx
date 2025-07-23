import React from 'react';
import { Link } from 'react-router-dom';

function StyleCard({ imageUrl, title, description, linkTo }) {
  return (
    // linkTo prop으로 받은 주소로 이동하는 Link 태그로 전체를 감쌉니다.
    <Link to={linkTo} className="flex-shrink-0 w-52 group md:w-52 lg:w-72 ">
      <div
        className="bg-white rounded-2xl shadow-md overflow-hidden 
                      transition-all duration-300"
      >
        <img
          src={imageUrl}
          alt={`${title} 인테리어`}
          className="w-full h-32 object-cover lg:h-48"
        />
        <div className="p-3">
          <h4 className="font-bold text-gray-800">{title}</h4>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </Link>
  );
}
export default StyleCard;
