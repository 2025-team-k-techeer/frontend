import React, { useState, useRef, useCallback } from 'react';
import Camera from '/src/assets/Icon/Camera.jsx';
import LeftArrow from '/src/assets/Icon/LeftArrow.jsx';
import Circle from '/src/assets/Icon/Circle.jsx';
// 카메라 모달 열기
function ImageUploadSection({
  uploadedImage,
  onFileChange,
  onDrop,
  onDragOver,
  onUploadClick,
  onRemoveImage,
  fileInputRef,
  onImageCaptured, // 카메라로 촬영된 이미지를 처리하는 콜백
}) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // 카메라 시작
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // 후면 카메라 우선
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('카메라 접근 실패:', error);
      alert('카메라에 접근할 수 없습니다. 브라우저 설정을 확인해주세요.');
    }
  }, []);

  // 카메라 종료
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // 카메라 모달 열기
  const openCamera = useCallback(() => {
    setIsCameraOpen(true);
    setCapturedImage(null);
  }, []);

  // 카메라 모달 닫기
  const closeCamera = useCallback(() => {
    setIsCameraOpen(false);
    setCapturedImage(null);
    stopCamera();
  }, [stopCamera]);

  // 사진 촬영
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // 비디오 크기에 맞춰 캔버스 설정
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 비디오 프레임을 캔버스에 그리기
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 캔버스를 이미지로 변환
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageDataUrl);
    setIsCapturing(false);
    stopCamera();
  }, [stopCamera]);

  // 다시 찍기
  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  // 사진 확인 및 저장
  const confirmPhoto = useCallback(() => {
    if (capturedImage && onImageCaptured) {
      onImageCaptured(capturedImage);
    }
    closeCamera();
  }, [capturedImage, onImageCaptured, closeCamera]);

  // 카메라 모달이 열릴 때 카메라 시작
  React.useEffect(() => {
    if (isCameraOpen && !capturedImage) {
      startCamera();
    }
  }, [isCameraOpen, capturedImage, startCamera]);

  // 컴포넌트 언마운트 시 카메라 정리
  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <>
      <div
        className="border-2 border-dashed border-gray-300 rounded-2xl flex-grow flex flex-col justify-center items-center text-center p-4 min-h-[200px] relative overflow-hidden"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          className="hidden"
          accept="image/*"
        />
        {uploadedImage ? (
          <>
            <img
              src={uploadedImage}
              alt="업로드된 사진 미리보기"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
            <button
              onClick={onRemoveImage}
              className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md"
            >
              <svg
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_522_193"
                  style={{ maskType: 'alpha' }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="41"
                  height="41"
                >
                  <rect
                    x="0.983887"
                    y="0.423828"
                    width="40"
                    height="40"
                    fill="#D9D9D9"
                  />
                </mask>
                <g mask="url(#mask0_522_193)">
                  <path
                    d="M13.9836 29.3685L12.0391 27.4239L19.0391 20.4239L12.0391 13.4656L13.9836 11.521L20.9836 18.521L27.942 11.521L29.8866 13.4656L22.8866 20.4239L29.8866 27.4239L27.942 29.3685L20.9836 22.3685L13.9836 29.3685Z"
                    fill="#1C1B1F"
                  />
                </g>
              </svg>
            </button>
          </>
        ) : (
          <>
            <Camera className="h-12 w-12 text-gray-400 mb-4" />
            <span className="text-gray-500 font-semibold mb-4">
              사진을 여기에 끌어다 놓거나
              <br />
              기기에서 업로드하세요
            </span>
            <div className="flex gap-3">
              <button
                onClick={onUploadClick}
                className="bg-gray-200 text-brand-charcoal font-semibold px-4 py-2 rounded-lg text-sm"
              >
                파일 선택
              </button>
              <button
                onClick={openCamera}
                className="bg-sage-accent text-white font-semibold px-4 py-2 rounded-lg text-sm"
              >
                카메라로 촬영
              </button>
            </div>
          </>
        )}
      </div>

      {/* 카메라 모달 */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* 헤더 */}
          <div className="flex justify-between items-center p-4 bg-black text-white">
            {/* LeftArrow 아이콘 추가 */}
            <LeftArrow onClick={closeCamera} className="text-white" />

            <span>사진 촬영</span>
            <div className="w-6"></div>
          </div>

          {/* 카메라 뷰파인더 */}
          <div className="flex-1 relative bg-black">
            {!capturedImage ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
                {/* 촬영 버튼 - 우측 상단으로 이동 */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center">
                  <button
                    onClick={capturePhoto}
                    disabled={isCapturing}
                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    {isCapturing ? (
                      <div></div>
                    ) : (
                      <div className="w-10 h-10 rounded-full">
                        {/* 카메라 아이콘 삽입 */}
                        <Circle className="w-10 h-10 text-sage-accent" />
                      </div>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* 촬영된 사진 미리보기 */}
                <img
                  src={capturedImage}
                  alt="촬영된 사진"
                  className="w-full h-full object-cover"
                />
                {/* 다시 찍기 / 확인 버튼 - 상단으로 이동 */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                  <button
                    onClick={retakePhoto}
                    className="bg-icon-gray text-black px-6 py-3 rounded-lg font-semibold"
                  >
                    다시 찍기
                  </button>
                  <button
                    onClick={confirmPhoto}
                    className="bg-sage-accent text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    확인
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ImageUploadSection;
