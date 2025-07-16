import React from 'react';

// 닫기 아이콘
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-brand-charcoal"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const FullscreenMenu = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // isOpen이 false이면 컴포넌트를 렌더링하지 않음
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col p-6 animate-fade-in">
      <header className="flex justify-center flex-shrink-0 py-4">
        <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
          <CloseIcon />
        </button>
      </header>
      <main className="flex-grow flex flex-col justify-center items-center -mt-10">
        <nav className="flex flex-col items-center text-center space-y-6 font-laundry">
          {/* 로그인/회원가입 등 조건부 렌더링을 추가할 수 있습니다. */}
          <a
            href="#"
            className="flex items-center gap-2 text-2xl text-brand-charcoal font-bold"
          >
            <span>로그인 하기</span>
          </a>
          <hr className="w-24 border-gray-200" />
          <a href="#" className="text-xl text-gray-700">
            시작하기
          </a>
          <a href="#" className="text-xl text-gray-700">
            라이브러리
          </a>
          <a href="#" className="text-xl text-gray-700">
            내 프로필
          </a>
        </nav>
      </main>
    </div>
  );
};

export default FullscreenMenu;
