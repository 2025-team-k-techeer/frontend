import React from 'react';
import OpenNewIcon from '../assets/Icon/OpenNew.svg?react';

function FurnitureDrawer({ isOpen, furniture, onClose, onARView }) {
  if (!isOpen || !furniture) return null;

  const handleARClick = () => {
    if (onARView) {
      onARView(furniture);
    }
  };

  const handleExternalLink = () => {
    if (furniture.danawa_products && furniture.danawa_products.length > 0) {
      const product = furniture.danawa_products[0];
      if (product.product_url) {
        window.open(product.product_url, '_blank');
      }
    }
  };

  const getFurnitureInfo = () => {
    if (furniture.danawa_products && furniture.danawa_products.length > 0) {
      const product = furniture.danawa_products[0];
      return {
        name: product.product_name,
        price: `${product.price.toLocaleString()}원`,
        image: product.image_url,
      };
    }
    return {
      name: furniture.label,
      price: '가격 정보 없음',
      image: 'https://placehold.co/56x56/cccccc/ffffff?text=Img',
    };
  };

  const furnitureInfo = getFurnitureInfo();

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl p-4 transform transition-transform duration-300 z-30 max-w-md mx-auto ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-brand-charcoal">
          선택한 가구 정보
        </h3>
        <button onClick={onClose} className="p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-3 p-2 rounded-lg">
        <img
          src={furnitureInfo.image}
          className="w-14 h-14 rounded-md object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/56x56/cccccc/ffffff?text=Img';
          }}
          alt={furnitureInfo.name}
        />
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{furnitureInfo.name}</p>
          <p className="text-sm text-gray-500">{furnitureInfo.price}</p>
        </div>
        <button
          onClick={handleARClick}
          className="w-9 h-9 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300 transition-colors"
          title="AR로 보기"
        >
          <span className="text-sm font-bold text-brand-charcoal">AR</span>
        </button>
        {furniture.danawa_products && furniture.danawa_products.length > 0 && (
          <button
            onClick={handleExternalLink}
            className="w-9 h-9 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300 transition-colors"
            title="쇼핑몰로 가기"
          >
            <OpenNewIcon className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
}

export default FurnitureDrawer;
