import React from 'react';

// 개별 팁 항목을 위한 작은 컴포넌트
function Tip({ number, children }) {
  return (
    <div className="flex items-start">
      <span className="bg-sage-accent text-white rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center font-bold mr-2">
        {number}
      </span>
      <p className="text-gray-600">{children}</p>
    </div>
  );
}

// Tip 섹션 전체를 담당하는 컴포넌트
export default function TipSection() {
  return (
    <div className="mt-8">
      <h2 className="text-base font-bold text-brand-charcoal mb-3">
        더 좋은 결과를 위한 요청 Tip
      </h2>
      <div className="space-y-2 text-sm">
        <Tip number="1">
          구체적인 가구, 색상, 재질을 언급하면 좋아요.
          <br />
          <span className="text-xs text-gray-400">
            (예: 빨간색 가죽 소파, 흰색 대리석 테이블)
          </span>
        </Tip>
        <Tip number="2">
          원하는 분위기나 느낌을 함께 적어주세요.
          <br />
          <span className="text-xs text-gray-400">
            (예: 전체적으로 따뜻하고 아늑한 느낌으로)
          </span>
        </Tip>
        <Tip number="3">
          가구의 위치나 배치를 명확하게 지시해보세요.
          <br />
          <span className="text-xs text-gray-400">
            (예: 가장 큰 벽에는 그림을 걸어줘)
          </span>
        </Tip>
      </div>
    </div>
  );
}
