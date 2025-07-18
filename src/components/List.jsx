import React from 'react';

// 인테리어 스타일 데이터 배열 (갯수를 늘리거나 줄여서 테스트 가능)
const styleData = [
  {
    id: 'biophilic',
    title: '바이오필릭 (Biophilic)',
    description:
      '식물과 자연 소재를 적극적으로 활용하여 실내 공간에 생명력과 평온함을 더하는 자연 친화적인 디자인입니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1567688993206-439ce1124f13?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'modern',
    title: '모던 (Modern)',
    description:
      '장식적인 요소를 최소화하고 기능성과 단순함을 강조하는 스타일로, 깔끔하고 현대적인 느낌을 줍니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2127&auto=format&fit=crop',
  },
  {
    id: 'minimal',
    title: '미니멀 (Minimal)',
    description:
      '불필요한 것을 모두 없애고 본질에만 집중하는 스타일로, 단순함이 주는 여백의 미를 강조합니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2080&auto=format&fit=crop',
  },
  {
    id: 'natural',
    title: '내추럴 (Natural)',
    description:
      '나무, 돌, 흙 등 자연 그대로의 소재와 색감을 사용하여 편안하고 따뜻한 분위기를 연출하는 스타일입니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1974&auto=format&fit=crop',
  },
];

function StyleList() {
  return (
    // 전체 영역을 차지하고, 내부 콘텐츠가 많아지면 세로 스크롤이 생깁니다.
    <main className="w-full h-full overflow-y-auto bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          {styleData.map((style) => (
            <div
              key={style.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* 16:9 비율을 유지하는 이미지 컨테이너 */}
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={style.imageUrl}
                  alt={`${style.title} 스타일 인테리어`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 텍스트 설명 영역 */}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800">
                  {style.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {style.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default StyleList;
