//RoomStyle에 쓰이는 컴포넌트

// src/components/StyleButton.jsx

function StyleButton({ label, icon: Icon, isSelected, onClick }) {
  // isSelected 값에 따라 적용할 Tailwind CSS 클래스를 동적으로 결정합니다.
  const baseClasses =
    'flex flex-col justify-center items-center bg-white p-4 rounded-2xl border-2 transition-all aspect-square';
  const selectedClasses = 'selected'; // CSS에 정의된 선택 스타일
  const unselectedClasses =
    'border-gray-100 text-brand-charcoal hover:border-gray-300';

  const iconColor = isSelected ? '' : 'text-icon-gray';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
        {Icon && <Icon className={`h-8 w-8 ${iconColor}`} />}
      </div>
      <span className="font-semibold text-base text-center">{label}</span>
    </button>
  );
}

export default StyleButton;
