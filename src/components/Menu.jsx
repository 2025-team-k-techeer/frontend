import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '/src/store/useAuthStore';

// 닫기 아이콘 (요청대로 strokeWidth를 2로, 색상을 흰색으로 변경)
function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-gray-700" // 아이콘 색상 변경
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2" // 라인 굵기 변경
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

// DrawerMenu: 오른쪽에서 등장하는 드로어 메뉴 컴포넌트
function DrawerMenu({ isOpen, onClose }) {
  // 메뉴 오픈 시 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose && onClose();
    navigate('/');
  };

  return (
    <>
      {/* 오버레이 (메뉴가 열릴 때 부드럽게 나타나도록 transition 추가) */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isOpen ? 'bg-opacity-60' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      {/* 드로어 메뉴 */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-64  bg-white text-white z-50 flex flex-col p-6 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 헤더: 닫기 버튼 */}
        <header className="flex justify-between items-center mb-8">
          {/* 로그인 버튼 */}
          <a
            href="/login"
            className="text-gray-500 w-24 text-center text-base font-bold py-2 rounded-xl border border-gray-300 hover:bg-white hover:text-black transition-colors duration-200"
          >
            로그인하기
          </a>
          <button onClick={onClose} className="p-2">
            <CloseIcon />
          </button>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="flex flex-col pt-2">
          {/* 메뉴 링크 (사진과 유사하게 변경) */}
          <nav className="flex flex-col mx-auto">
            <a
              href="/upload"
              className="text-2xl py-9 border-b border-gray-400 text-gray-700 w-full text-center"
            >
              시작하기
            </a>
            <a href="/library" className="text-xl py-9 text-gray-500 mx-auto">
              라이브러리
            </a>
            <a href="/profile" className="text-xl py-9 text-gray-500 mx-auto">
              내 프로필
            </a>
            <a href="/manual" className="text-xl py-9 text-gray-500 mx-auto">
              사용법
            </a>
            {/* 로그아웃 버튼 */}
            <a
              type="button"
              className="text-base border-t border-gray-400 text-red-500 w-full text-center mt-4 py-7 hover:text-red-300 transition-colors duration-200 "
              onClick={handleLogout}
            >
              로그아웃
            </a>
          </nav>
        </main>
      </div>
    </>
  );
}

export default DrawerMenu;
