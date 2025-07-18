import { useState, useRef } from 'react';
import HeaderBack from '../components/HeaderBack';
import Title from '../components/Title/Title.jsx';
import ImageUploadSection from '../components/ImageUploadSection';
import ExamplePhotos from '../components/ExamplePhotos';
import ActionButton from '../components/ButtonAction.jsx';
import { useNavigate } from 'react-router-dom';
// Shadcn UI는 코드를 직접 복사해서 사용하므로 별도의 import가 필요 없습니다.
// 아래 컴포넌트 함수들을 이 파일 안에 정의하거나,
// 별도 파일로 분리한 후 import하여 사용하면 됩니다.

// 메인 페이지 컴포넌트
export default function UploadPage() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

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

  return (
    <div className="bg-white font-ttlaundrygothicb">
      <div className="w-full max-w-xl mx-auto flex flex-col min-h-screen">
        <HeaderBack
          title=""
          bgColor="bg-sage-bg"
          showBorder={false} // 구분선 보임 (true는 기본값이므로 생략 가능)
        />
        <main className="flex-1 flex flex-col p-6">
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
          />
          <ExamplePhotos />
        </main>
        <footer className="p-4 flex-shrink-0">
          <ActionButton
            onClick={() => {
              navigate('/RoomType');
            }}
            isDisabled={!uploadedImage}
          >
            다음
          </ActionButton>
        </footer>
      </div>
    </div>
  );
}
