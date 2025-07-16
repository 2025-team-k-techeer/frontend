import React from 'react';

const ActionButton = ({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
}) => {
  // 기본 스타일
  const baseStyles =
    'block w-full text-center font-bold py-4 rounded-xl text-lg hover:bg-opacity-90 transition-colors shadow-md';

  // Variant에 따른 스타일 정의
  const variants = {
    primary: 'bg-sage-accent text-white',
    secondary: 'bg-gray-200 text-brand-charcoal',
    // 필요에 따라 다른 variant를 추가할 수 있습니다.
    // ex: outline: 'border-2 border-cyan-point text-cyan-point bg-white',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  // href prop이 있으면 <a> 태그로, 없으면 <button> 태그로 렌더링
  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default ActionButton;
