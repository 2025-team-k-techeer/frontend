function ImageUploadSection({
  uploadedImage,
  onFileChange,
  onDrop,
  onDragOver,
  onUploadClick,
  onRemoveImage,
  fileInputRef,
}) {
  return (
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-gray-500 font-semibold">
            사진을 여기에 끌어다 놓거나
            <br />
            기기에서 업로드하세요
          </span>
          <button
            onClick={onUploadClick}
            className="mt-4 bg-gray-200 text-brand-charcoal font-semibold px-6 py-2 rounded-lg text-sm"
          >
            파일 선택
          </button>
        </>
      )}
    </div>
  );
}

export default ImageUploadSection;
