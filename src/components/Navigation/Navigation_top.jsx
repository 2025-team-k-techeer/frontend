import React from 'react';

function Navigation_top({ activeSection, onSectionClick }) {
  const navItems = [
    { id: 'upload', label: 'AI 인테리어' },
    { id: 'AR', label: 'AR로 보기' },
    { id: 'library', label: '라이브러리' },
  ];

  return (
    <nav className="sticky top-0 z-20 flex justify-around p-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
      {navItems.map(function (item) {
        // 1. map 콜백 함수를 일반 함수로 변경
        return (
          <button
            key={item.id}
            onClick={function () {
              // 2. onClick 이벤트 핸들러를 일반 함수로 변경
              onSectionClick(item.id);
            }}
            className={`flex-1 text-center font-semibold py-2 rounded-lg ${
              activeSection === item.id ? 'text-sage-accent' : 'text-gray-500'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

export default Navigation_top;
