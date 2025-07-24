import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLibraryStore from '/src/store/uselibraryStore.js';

function ImageGrid() {
  const { interiors, setSelectedIndex } = useLibraryStore();
  const navigate = useNavigate();

  const images = Array.isArray(interiors)
    ? interiors.map((item) => item.generated_image_url)
    : [];

  const handleClick = (idx) => {
    setSelectedIndex(idx);
    navigate('/result');
  };

  if (!images.length) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[200px] text-gray-400 text-lg font-semibold">
        저장된 인테리어가 없습니다.
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto padding-bottom-set">
      <div className="p-4 sm:p-6">
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            <strong className="font-bold text-sage-accent">
              {images.length}개
            </strong>
            의 인테리어가 저장되어 있습니다.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((src, index) => (
            <a href="#" key={index} onClick={() => handleClick(index)}>
              <img
                src={src}
                className="w-full aspect-square object-cover rounded-lg shadow-sm hover:shadow-xl transition-shadow aspect-square-set"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    'https://placehold.co/400x400/cccccc/ffffff?text=Image';
                }}
                alt={`인테리어 이미지 ${index + 1}`}
              />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ImageGrid;
