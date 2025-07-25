import { useState, useRef } from 'react';
import HeaderBack from '/src/components/Header/HeaderBack';
import Title from '/src/components/Title/Title.jsx';
import ImageUploadSection from '/src/components/ImageUploadSection';
import ExamplePhotos from '/src/components/Tip/ExamplePhotos';
import ActionButton from '/src/components/Button/ButtonAction.jsx';
import { useNavigate } from 'react-router-dom';
import { postUploadImage } from '/src/api/imageuploadApi';
import { useRoomStyleStore } from '/src/store/useRoomStyleStore';

// Shadcn UI는 코드를 직접 복사해서 사용하므로 별도의 import가 필요 없습니다.
// 아래 컴포넌트 함수들을 이 파일 안에 정의하거나,
// 별도 파일로 분리한 후 import하여 사용하면 됩니다.
// 카메라 모달 열기

// 메인 페이지 컴포넌트
export default function UploadPage() {
  const [uploadedImage, setUploadedImage] = useState(null); // 업로드된 이미지 상태
  const fileInputRef = useRef(null); // 파일 입력 참조
  const setImageInfo = useRoomStyleStore((state) => state.setImageInfo);

  const navigate = useNavigate();

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleUploadClick() {
    fileInputRef.current.click();
  }

  function handleRemoveImage() {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  // 카메라로 촬영된 이미지 처리
  function handleImageCaptured(imageDataUrl) {
    setUploadedImage(imageDataUrl);
  }

  // 이미지 업로드 및 GCS 업로드 후 store 저장, 페이지 이동
  async function handleUploadAndNext() {
    if (!uploadedImage) return;
    try {
      // DataURL → File 변환
      const res = await fetch(uploadedImage);
      const blob = await res.blob();
      const file = new File([blob], 'upload.jpg', { type: 'image/jpeg' });

      // access_token 가져오기
      const access_token = localStorage.getItem('token');

      // 이미지 업로드 (access_token 포함)
      const { url, filename } = await postUploadImage(file, access_token);
      console.log('업로드 성공:', { url, filename });

      // 상태 저장 (store)
      setImageInfo({ url, filename });

      // 다음 페이지 이동
      navigate('/RoomType');
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      alert('이미지 업로드 실패: ' + err.message);
    }
  }

  return (
    <div className="bg-white font-ttlaundrygothicb">
      <div
        className="w-full mx-auto flex flex-col pt-16 min-h-screen 
                   lg:max-w-4xl"
      >
        <HeaderBack
          title=""
          bgColor="bg-sage-bg"
          showBorder={false} // 구분선 보임 (true는 기본값이므로 생략 가능)
        />
        <main className="flex-1 flex flex-col p-4">
          <Title
            title="방의 사진을 업로드해주세요."
            subtitle="인테리어를 적용할 공간의 사진을 올리면 AI가 분석합니다."
          />
          <ImageUploadSection
            uploadedImage={uploadedImage}
            onFileChange={handleFileChange}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onUploadClick={handleUploadClick}
            onRemoveImage={handleRemoveImage}
            fileInputRef={fileInputRef}
            onImageCaptured={handleImageCaptured}
          />
          <ExamplePhotos />
        </main>
        <footer className="fixed bottom-0 left-0 right-0 p-4 flex-shrink-0">
          <ActionButton
            onClick={handleUploadAndNext}
            isDisabled={!uploadedImage}
          >
            다음
          </ActionButton>
        </footer>
      </div>
    </div>
  );
}
