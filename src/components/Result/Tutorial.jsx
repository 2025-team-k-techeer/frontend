import React, { useState, useEffect } from 'react';

// 이 컴포넌트를 원하는 곳에서 import하여 사용하세요.
export default function Tutorial({ isVisible, onClose }) {
  // isVisible prop을 받아서 모달 표시 여부를 제어
  const [showModal, setShowModal] = useState(isVisible);
  // 현재 페이지를 관리하는 상태 (1페이지부터 시작)
  const [currentPage, setCurrentPage] = useState(1);

  // '확인' 버튼 (2페이지) 또는 모달을 닫아야 할 때 실행되는 함수
  function handleClose() {
    // 1. 로컬 스토리지에 방문 기록을 남겨서 다시 보지 않도록 합니다.
    localStorage.setItem('hasVisitedARTutorial', 'true');
    // 2. 모달을 보이지 않게 상태를 변경합니다.
    setShowModal(false);
    // 3. 부모 컴포넌트에 닫기 이벤트 전달
    if (onClose) {
      onClose();
    }
  }

  // '다음' 버튼 (1페이지)을 눌렀을 때 실행되는 함수
  function handleNext() {
    // 다음 페이지로 이동
    setCurrentPage(currentPage + 1);
  }

  // isVisible prop이 변경될 때 showModal 상태 업데이트
  useEffect(() => {
    setShowModal(isVisible);
    // 튜토리얼이 열릴 때마다 첫 페이지로 리셋
    if (isVisible) {
      setCurrentPage(1);
    }
  }, [isVisible]);

  // 모달을 보여줄 필요가 없으면 아무것도 렌더링하지 않음
  if (!showModal) {
    return null;
  }

  // 템플릿 시작

  // 보여줄 설명 데이터 배열
  const featureDescriptions = [
    {
      // SVG 아이콘을 JSX 컴포넌트처럼 사용
      icon: (
        <div className="bg-black/60 p-3 rounded-full">
          <div className="text-white flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            뒤로가기
          </div>
        </div>
      ),
      title: '뒤로가기',
      description: (
        <>
          결과 페이지로 다시 돌아갈 수<br /> 있습니다.
        </>
      ),
    },
    {
      icon: (
        <div className="flex flex-col items-center gap-2">
          {/* 1. 이미지를 담는 박스 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3">
            <img
              src="https://placehold.co/150x150/F3F4F6/333333?text=Chair" // 이미지가 하드코딩되었습니다.
              alt="chair" // alt 텍스트도 하드코딩되었습니다.
              className="w-12 h-16 object-contain" // 이미지 크기 및 비율 설정
            />
          </div>
        </div>
      ),
      title: 'AR객체 선택',
      // description을 JSX로 작성하여 줄바꿈 적용
      description: (
        <>
          버튼을 눌러 배치해보고 싶은
          <br />
          가구를 선택해보세요.
        </>
      ),
    },
  ];

  // 보여줄 설명 데이터 배열2
  const featureDescriptions2 = [
    {
      title: '시작',
      description: '하단에 StartAR 버튼을 눌러 시작합니다.',
    },
    {
      title: '배치하기',
      description: (
        <>
          횐 색 원을 두 번 터치하여 선택한 가구를 <br />
          배치합니다.
        </>
      ),
    },
    {
      title: '회전하기',
      description: (
        <>
          두 손가락으로 화면을 좌우로 밀어 가구를 <br />
          회전시킵니다.
        </>
      ),
    },
    {
      title: '삭제하기',
      description: '버튼을 꾹 눌러 배치한 가구를 삭제합니다.',
    },
    {
      title: '종료',
      description: 'Stop AR 버튼을 눌러 종료합니다.',
    },
  ];

  return (
    // 1. 반투명 배경 (Overlay)
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      {/* 페이지 1 내용 */}
      {currentPage === 1 && (
        // 메인 컨테이너
        <div className="flex flex-col justify-center items-center h-full gap-8">
          {/* 설명 묶음들을 담을 컨테이너 */}
          <div className="space-y-6">
            {/* featureDescriptions 배열을 순회하며 각 설명을 렌더링 */}
            {featureDescriptions.map((feature, index) => (
              <div key={index} className="flex items-center pr-9">
                {/* 아이콘 (왼쪽) */}
                <div className=" text-white p-4 rounded-3xl flex-shrink-0 bg-transparent w-40 h-30 flex items-center justify-center">
                  {feature.icon} {/* 배열에서 아이콘 가져오기 */}
                </div>

                {/* 설명 그룹 (오른쪽) */}
                <div className="text-left">
                  <h2 className="text-xl text-gray-200 font-bold">
                    {feature.title} {/* 배열에서 제목 가져오기 */}
                  </h2>
                  <p className="text-gray-300">
                    {feature.description} {/* 배열에서 설명 가져오기 */}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 버튼 */}
          <button
            onClick={handleNext}
            className="bg-sage-accent text-white font-bold py-3 px-12 rounded-lg hover:bg-sage-accent/80 transition-colors"
          >
            다음
          </button>
        </div>
      )}

      {/* 페이지 2 내용 */}
      {currentPage === 2 && (
        <div className="flex flex-col items-center gap-8 pb-28">
          <div className="flex flex-col justify-center items-center h-full gap-8">
            {/* 설명 묶음들을 담을 컨테이너 */}
            <div className="space-y-6">
              {/* featureDescriptions 배열을 순회하며 각 설명을 렌더링 */}
              {featureDescriptions2.map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  {/* 설명 그룹 (오른쪽) */}
                  <div className="text-left">
                    <h2 className="text-xl text-gray-200 font-bold">
                      {feature.title} {/* 배열에서 제목 가져오기 */}
                    </h2>
                    <p className="text-gray-300">
                      {feature.description} {/* 배열에서 설명 가져오기 */}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 확인 버튼 */}
          <div className="items-center">
            <button
              onClick={handleClose}
              className="w-full bg-sage-accent text-white font-bold py-3 px-12 rounded-lg hover:bg-sage-accent/80 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
