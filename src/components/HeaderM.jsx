import React from 'react';

// 햄버거 아이콘을 별도 컴포넌트로 분리해도 좋지만, 여기서는 간단히 포함합니다.
function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-brand-charcoal"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  );
}

function HeaderM({ onMenuClick }) {
  return (
    <header className="p-4 flex justify-between items-center bg-neutral-bg z-20 border-b border-gray-200">
      <h1 className="text-4xl font-black font-laundry text-brand-charcoal">
        집.꾸
      </h1>
      <button onClick={onMenuClick}>
        <HamburgerIcon />
      </button>
    </header>
  );
}

export default HeaderM;
