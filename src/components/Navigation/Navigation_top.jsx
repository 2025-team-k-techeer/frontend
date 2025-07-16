import React from 'react';

function Navigation_top({ activeSection, onSectionClick }) {
  const navItems = [
    { id: 'upload', label: '사진 업로드' },
    { id: 'select', label: '스타일 선택' },
    { id: 'ar', label: 'AR로 보기' },
  ];

  return (
    <nav className="sticky top-0 z-20 flex justify-around p-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSectionClick(item.id)}
          className={`flex-1 text-center font-semibold py-2 rounded-lg ${
            activeSection === item.id ? 'text-sage-accent' : 'text-gray-500'
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default Navigation_top;
