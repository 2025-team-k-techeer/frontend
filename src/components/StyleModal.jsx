/**
 * 스타일 설명 팝업 모달 컴포넌트
 * @param {object} props
 * @param {boolean} props.isOpen - 모달이 열려있는지 여부
 * @param {() => void} props.onClose - 모달을 닫을 때 호출될 함수
 * @param {string} props.title - 모달에 표시될 제목
 * @param {string} props.description - 모달에 표시될 설명
 */
function StyleModal({ isOpen, onClose, name, description }) {
  // isOpen이 false이면 아무것도 렌더링하지 않습니다.
  if (!isOpen) {
    return null;
  }
  return (
    // 모달 배경, 눌렀을 때 닫히도록 함
    <div
      id="description-popup"
      className="fixed inset-0 bg-black/50 p-8 flex items-center justify-center z-50"
      onClick={onClose} // 배경 클릭 시 onClose 함수 호출
    >
      {/* 모달 컨텐츠, 눌렀을 때 닫히도록 함 */}
      <div
        id="popup-content"
        className="bg-white rounded-2xl p-6 w-full max-w-xs text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 닫기 버튼 */}
        <button
          id="close-popup-btn"
          className="absolute top-2 right-2 p-1"
          onClick={onClose}
        >
          <CloseIcon className="h-6 w-6 text-gray-400" />
        </button>
        {/* 모달 제목 */}
        <h3
          id="popup-title"
          className="text-xl font-bold text-sage-accent mb-3"
        >
          {name}
        </h3>
        {/* 모달 설명 */}
        <p id="popup-text" className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
export default StyleModal;
