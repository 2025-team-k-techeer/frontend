// src/components/StyleModal.jsx

function StyleModal({ isOpen, onClose, label, description, imageSrc }) {
  // isOpen이 false이면 아무것도 렌더링하지 않습니다.
  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="description-popup"
      className="fixed inset-0 bg-black/50 p-8 flex items-center justify-center z-50 transition-opacity duration-200"
      onClick={onClose} // 배경 클릭 시 닫기
    >
      <div
        id="popup-content"
        className="bg-white rounded-2xl p-6 w-full max-w-xs text-center relative transform transition-transform duration-200"
        onClick={(e) => e.stopPropagation()} // 컨텐츠 클릭 시 닫힘 방지
      >
        <button
          id="close-popup-btn"
          className="absolute top-2 right-2 p-1"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 className="text-xl font-bold text-sage-accent mb-3">{label}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
        {/* 이미지를 조건부로 렌더링합니다. */}
        {imageSrc && (
          <img
            src={imageSrc}
            alt={label} // 접근성을 위해 alt 속성 추가
            className="w-full h-auto rounded-t-2xl object-cover"
          />
        )}
      </div>
    </div>
  );
}

export default StyleModal;
