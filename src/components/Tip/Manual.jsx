import React from 'react';

function Manual() {
  return (
    <main className="flex-1">
      <div className="p-6 space-y-12">
        {/* 1. 이미지 업로드 섹션 */}
        <section id="upload">
          <div className="flex items-center mb-4">
            <span className="bg-sage-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg mr-3">
              1
            </span>
            <h2 className="text-xl font-bold text-brand-charcoal">
              인테리어할 공간 사진 올리기
            </h2>
          </div>
          <img
            src="https://placehold.co/600x400/EAF0EE/2D3748?text=Upload+Guide"
            alt="사진 업로드 방법"
            className="w-full rounded-2xl shadow-lg mb-4"
          />
          <p className="text-gray-600 leading-relaxed">
            <strong className="text-gray-800">
              1. '시작하기' 버튼 또는 AI인테리어{' '}
            </strong>
            를 눌러주세요.
            <br />
            <strong className="text-gray-800">2. 갤러리에서</strong> 인테리어를
            바꾸고 싶은 공간의 사진을 선택해주세요! <br />
            <strong className="text-gray-800">3. AI가 잘 인식</strong>할 수
            있도록 '촬영 Tip'을 참고하면 더 좋아요!
          </p>
        </section>

        {/* 2. 스타일 선택 섹션 */}
        <section id="select">
          <div className="flex items-center mb-4">
            <span className="bg-sage-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg mr-3">
              2
            </span>
            <h2 className="text-xl font-bold text-brand-charcoal">
              공간 유형과 스타일 선택하기
            </h2>
          </div>
          <img
            src="https://placehold.co/600x400/EAF0EE/2D3748?text=Style+Select+Guide"
            alt="스타일 선택 방법"
            className="w-full rounded-2xl shadow-lg mb-4"
          />
          <p className="text-gray-600 leading-relaxed">
            <strong className="text-gray-800">1. 공간 유형 선택:</strong>{' '}
            업로드한 사진의 공간 유형(예: 침실, 거실)을 선택해주세요.
            <br />
            <strong className="text-gray-800">
              2. 인테리어 스타일 선택:
            </strong>{' '}
            바꾸고 싶은 스타일(예: 모던, 내추럴)을 고르세요.
            <br />
            <strong className="text-gray-800">
              3. 추가 요구사항 (선택):
            </strong>{' '}
            원하는 가구나 분위기를 자세히 적으면 AI가 똑똑하게 반영해요.
          </p>
        </section>

        {/* 3. AR로 보기 섹션 */}
        <section id="ar">
          <div className="flex items-center mb-4">
            <span className="bg-sage-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg mr-3">
              3
            </span>
            <h2 className="text-xl font-bold text-brand-charcoal">
              내 공간에서 직접 확인하기
            </h2>
          </div>
          <img
            src="https://placehold.co/600x400/EAF0EE/2D3748?text=AR+View+Guide"
            alt="AR로 보기 방법"
            className="w-full rounded-2xl shadow-lg mb-4"
          />
          <p className="text-gray-600 leading-relaxed">
            <strong className="text-gray-800">1. 'AR로 보기' 버튼:</strong> 최종
            결과 화면에서 버튼을 눌러주세요.
            <br />
            <strong className="text-gray-800">2. 공간 인식:</strong> 카메라가
            켜지면 바닥을 천천히 비춰 공간을 인식시켜주세요.
            <br />
            <strong className="text-gray-800">3. 생생한 경험:</strong> AI가
            생성한 가구들이 내 공간에 배치된 모습을 현실처럼 확인할 수 있습니다.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Manual;
