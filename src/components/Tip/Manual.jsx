import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Manual() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

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
              인테리어 시작하기
            </h2>
          </div>
          <img
            src="https://placehold.co/600x400/EAF0EE/2D3748?text=Upload+Guide"
            alt="사진 업로드 방법"
            className="w-full rounded-2xl shadow-lg mb-4"
          />
          <p className="text-gray-600 leading-relaxed">
            <strong className="text-gray-800">
              1. '시작하기' 버튼 또는 AI인테리어
            </strong>
            를 눌러주세요.
            <br />
            <strong className="text-gray-800">2. 사진 업로드:</strong> 파일
            선택으로 인테리어를 바꾸고 싶은 공간의 사진을 선택하거나 직접
            찍어주세요. (AI가 잘 인식할 수 있도록 '촬영 Tip'을 참고하면 더
            좋아요!)
            <br />
            <strong className="text-gray-800">3. 공간 유형 선택:</strong>
            업로드한 사진 속 방의 공간 유형을 선택해주세요.
            <br />
            <strong className="text-gray-800">3. 인테리어 스타일 선택:</strong>
            원하는 인테리어 스타일을 선택해주세요. 버튼을 꾹 누르면 해당
            인테리어 스타일의 설명을 볼 수 있어요.
            <br />
            <strong className="text-gray-800">4. 추가 요구사항:</strong>
            추가로 방에 들어갔으면 하는 점을 적어주세요. AI가 똑똑하게
            반영해줘요.
            <br />
            <strong className="text-gray-800">5. 완료:</strong>
            이제 완료버튼을 누르면 끝! 결과를 확인해보세요.
          </p>
        </section>

        {/* 2. AR */}
        <section id="AR">
          <div className="flex items-center mb-4">
            <span className="bg-sage-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg mr-3">
              2
            </span>
            <h2 className="text-xl font-bold text-brand-charcoal">
              AR로 내 공간에서 직접 확인하기
            </h2>
          </div>
          <img
            src="https://placehold.co/600x400/EAF0EE/2D3748?text=Style+Select+Guide"
            alt="스타일 선택 방법"
            className="w-full rounded-2xl shadow-lg mb-4"
          />
          <p className="text-gray-600 leading-relaxed">
            <strong className="text-gray-800">1. 유사한 가구 살펴보기:</strong>{' '}
            +버튼을 눌러 검색된 유사한 가구를 살펴보고, 내 방에 직접 배치해보고
            싶은 가구을 골라 AR버튼을 눌러주세요.
            <br />
            <strong className="text-gray-800">2. 공간 인식:</strong> 창이 켜지면
            'start AR'버튼을 눌러 카메라를 실행시키고, 바닥을 천천히 비춰 공간을
            인식시켜주세요.
            <br />
            <strong className="text-gray-800">3. 체험하기:</strong>가구목록에서
            원하는 디자인을 선택하고 사용법에 따라 체험해보세요.
          </p>
        </section>

        {/* 3. 라이브러리 */}
        <section id="library">
          <div className="flex items-center mb-4">
            <span className="bg-sage-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg mr-3">
              3
            </span>
            <h2 className="text-xl font-bold text-brand-charcoal">
              결과 다시보기
            </h2>
          </div>
          <img
            src="https://placehold.co/600x400/EAF0EE/2D3748?text=AR+View+Guide"
            alt="AR로 보기 방법"
            className="w-full rounded-2xl shadow-lg mb-4"
          />
          <p className="text-gray-600 leading-relaxed">
            <strong className="text-gray-800">
              1. 내 인테리어에에 저장하기:
            </strong>{' '}
            마음에 드는 AI인테리어 결과를 '내 라이브러리에 저장'버튼을 눌러
            라이브러리에 저장해주세요.
            <br />
            <strong className="text-gray-800">
              2. 라이브러리 들어가기:
            </strong>{' '}
            홈 화면에서 네이게이터 중앙 라이브러리 버튼을 눌러 내 라이브러리로
            들어가주세요.
            <br />
            <strong className="text-gray-800">3. 결과 다시보기:</strong> 사진을
            선택해서 생성한 인테리어를 다시 확인할 수 있어요.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Manual;
