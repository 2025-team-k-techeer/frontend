import React from 'react';
import OpenNew from '/src/assets/Icon/OpenNew.jsx';

function FurnitureDrawer({ isOpen, furniture, onClose, onARView }) {
  if (!isOpen || !furniture) return null;

  const getFurnitureList = () => {
    if (furniture.danawa_products && furniture.danawa_products.length > 0) {
      return furniture.danawa_products.map((product, index) => ({
        id: index,
        name: product.product_name || product.name,
        image: product.image_url,
        url: product.product_url,
      }));
    }
    return [
      {
        id: 0,
        name: furniture.label,
        image: 'https://placehold.co/56x56/cccccc/ffffff?text=Img',
        url: '',
      },
    ];
  };

  const furnitureList = getFurnitureList();

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl transform transition-transform duration-300 z-30 max-w-md mx-auto ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ maxHeight: '70vh' }}
    >
      {/* 헤더 */}
      <div className="sticky top-0 bg-white rounded-t-2xl p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
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
      </div>

      {/* 스크롤 가능한 가구 리스트 */}
      <div
        className="overflow-y-auto"
        style={{ maxHeight: 'calc(70vh - 80px)' }}
      >
        {furnitureList.map((furnitureItem) => (
          <div
            key={furnitureItem.id}
            className="flex items-center gap-3 p-4 border-b border-gray-100 last:border-b-0"
          >
            <img
              src={furnitureItem.image}
              className="w-14 h-14 rounded-md object-cover flex-shrink-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://placehold.co/56x56/cccccc/ffffff?text=Img';
              }}
              alt={furnitureItem.name}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-sm truncate">
                {furnitureItem.name}
              </p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => onARView(furniture)}
                className="w-9 h-9 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300 transition-colors"
                title="AR로 보기"
              >
                <span className="text-sm font-bold text-brand-charcoal">
                  AR
                </span>
              </button>
              {furnitureItem.url && (
                <a
                  href={furnitureItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300 transition-colors"
                  title="쇼핑몰로 가기"
                >
                  <OpenNew className="w-5 h-5 text-gray-600" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FurnitureDrawer;
