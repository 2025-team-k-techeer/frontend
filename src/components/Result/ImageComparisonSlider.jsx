import React, { useState, useRef, useEffect, useCallback } from 'react';
import PlusIcon from '../../assets/Icon/Plus.jsx';

function ImageComparisonSlider({
  originalImageUrl,
  generatedImageUrl,
  furnitures = [],
  onFurnitureClick,
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderContainerRef = useRef(null);
  const sliderHandleRef = useRef(null);

  const moveSlider = useCallback((clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    let newX = clientX - rect.left;
    if (newX < 0) newX = 0;
    if (newX > rect.width) newX = rect.width;
    const percentage = (newX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        moveSlider(e.clientX);
      }
    },
    [isDragging, moveSlider]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchMove = useCallback(
    (e) => {
      if (isDragging && e.touches.length > 0) {
        moveSlider(e.touches[0].clientX);
      }
    },
    [isDragging, moveSlider]
  );

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  const imageOnError = (e) => {
    e.target.onerror = null;
    e.target.src =
      'https://placehold.co/1920x1080/cccccc/ffffff?text=Image+Error';
  };

  return (
    <div
      ref={sliderContainerRef}
      className="relative w-full h-full overflow-hidden"
    >
      {/* Before Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={originalImageUrl}
          alt="Before"
          onError={imageOnError}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* After Image with Clip Path */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
        }}
      >
        <img
          src={generatedImageUrl}
          alt="After"
          onError={imageOnError}
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Furniture Plus Buttons */}
        {furnitures.map((furniture) => {
          const { bounding_box } = furniture;
          if (!bounding_box) return null;
          // bounding_box 좌표가 픽셀 단위라고 가정하고 퍼센트로 변환
          // 실제 이미지 크기에 따라 조정이 필요할 수 있음
          const left = ((bounding_box.x + bounding_box.width / 2) / 1920) * 100; // 1920px 기준
          const top = ((bounding_box.y + bounding_box.height / 2) / 1080) * 100; // 1080px 기준

          return (
            <button
              key={furniture.id}
              onClick={() => onFurnitureClick(furniture)}
              className="plus-icon absolute bg-sage-accent/80 text-white rounded-full flex items-center justify-center p-2 backdrop-blur-sm transition-transform duration-200 hover:scale-110"
              style={{
                left: `${Math.max(0, Math.min(100, left))}%`,
                top: `${Math.max(0, Math.min(100, top))}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <PlusIcon className="w-5 h-5 text-white" />
            </button>
          );
        })}
      </div>

      {/* Slider Handle */}
      <div
        ref={sliderHandleRef}
        className="absolute top-0 h-full flex items-center justify-center z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div
          className="w-1 h-full bg-white/70 cursor-ew-resize flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 text-brand-charcoal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageComparisonSlider;
