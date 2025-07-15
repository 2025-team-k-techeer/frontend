import React from 'react';
import './imageGrid.css'; // CSS 파일을 임포트하여 스타일 적용
function ImageGrid() {
  // 이미지 데이터 배열 (실제 데이터는 외부에서 받아올 수 있습니다)
  const images = [
    'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1932&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1567688993206-439ce1124f13?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2127&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop',
  ];

  return (
    <main className="flex-1 overflow-y-auto padding-bottom-set">
      <div className="p-4 sm:p-6">
        <div className="mb-4">
          {/* JavaScript 표현식을 사용하여 동적으로 숫자 표시 */}
          <p className="text-sm text-gray-500">
            <strong className="font-bold text-sage-accent">
              {images.length}개
            </strong>
            의 인테리어가 저장되어 있습니다.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* `map` 함수를 사용하여 이미지 배열을 반복 렌더링 */}
          {images.map((src, index) => (
            <a href="#" key={index}>
              {' '}
              {/* React에서 리스트를 렌더링할 때는 `key` prop이 필수입니다. */}
              <img
                src={src}
                className="w-full aspect-square object-cover rounded-lg shadow-sm hover:shadow-xl transition-shadow aspect-square-set"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    'https://placehold.co/400x400/cccccc/ffffff?text=Image';
                }}
                alt={`인테리어 이미지 ${index + 1}`} // 접근성을 위해 alt 속성 추가
              />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ImageGrid;
