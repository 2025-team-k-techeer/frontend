import React from 'react';

// 인테리어 스타일 데이터 배열 (갯수를 늘리거나 줄여서 테스트 가능)
const styleData = [
  {
    id: 'style_minimal',
    name: '미니멀',
    description: '불필요한 장식을 최소화하고 본질에 집중하는 스타일입니다.',
    example_image_url: '/styles/minimal.jpg',
  },
  {
    id: 'style_natural',
    name: '내추럴',
    description: '나무, 흙 등 자연 소재를 사용하여 편안함을 주는 스타일입니다.',
    example_image_url: '/styles/natural.jpg',
  },
  {
    id: 'style_nordic',
    name: '북유럽',
    description: '실용성과 따뜻한 감성이 조화된 밝고 아늑한 스타일입니다.',
    example_image_url: '/styles/nordic.jpg',
  },
  {
    id: 'style_industrial',
    name: '인더스트리얼',
    description:
      '노출 콘크리트, 벽돌 등 거친 마감재를 그대로 살린 스타일입니다.',
    example_image_url: '/styles/industrial.jpg',
  },
  {
    id: 'style_classic',
    name: '클래식',
    description:
      '우아한 곡선과 고급스러운 장식이 돋보이는 전통적인 스타일입니다.',
    example_image_url: '/styles/classic.jpg',
  },
  {
    id: 'style_vintage',
    name: '빈티지',
    description: '과거의 디자인을 재현하여 향수를 불러일으키는 스타일입니다.',
    example_image_url: '/styles/classic.jpg',
  },
  {
    id: 'style_tribal',
    name: '트라이벌',
    description:
      '다채로운 색상을 과감하게 사용하여 생동감을 주는 스타일입니다.',
    example_image_url: '/styles/classic.jpg',
  },
  {
    id: 'style_modern',
    name: '모던',
    description: '기능적이고 깔끔한 선과 면으로 구성된 현대적인 스타일입니다.',
    example_image_url: '/styles/modern.jpg',
  },
];

function StyleList() {
  return (
    // 전체 영역을 차지하고, 내부 콘텐츠가 많아지면 세로 스크롤이 생깁니다.
    <main className=" w-full h-full overflow-y-auto bg-gray-50 p-4  padding-bottom-set">
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
                  src={style.example_image_url}
                  alt={`${style.name} 스타일 인테리어`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 텍스트 설명 영역 */}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800">
                  {style.name}
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
