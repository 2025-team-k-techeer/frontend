import React, { useState, useEffect } from 'react';
import ResultHeader from '/src/components/Header/ResultHeader';
import RegenerateButton from '/src/components/Button/RegenerateButton';
import ImageComparisonSlider from '/src/components/Result/ImageComparisonSlider';
import FurnitureDrawer from '/src/components/Result/FurnitureDrawer';
import ToastMessage from '/src/components/Result/ToastMessage';
import OtherRoomButton from '/src/components/Button/OtherRoomButton';
import Loading from '/src/components/Loading';
import { useNavigate } from 'react-router-dom';
import { useResultGenerationStore } from '/src/store/useResultGenerationStore';
import { useRoomStyleStore } from '/src/store/useRoomStyleStore';
import { postGenerateResult } from '/src/api/generate-resultApi';
import { saveMyInterior } from '/src/api/librarystoreApi';
import { fetchSimilarARObject } from '/src/api/arApi';
import useLibraryStore from '/src/store/uselibraryStore.js';

function ResultPage() {
  // 두 경로 모두 지원
  const { result, setResult } = useResultGenerationStore();
  const { interiors, selectedIndex } = useLibraryStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  // zustand에서 파라미터 가져오기 (Regenerate용)
  const image_url = useRoomStyleStore((state) => state.image_url);
  const room_type = useRoomStyleStore((state) => state.room_type);
  const style = useRoomStyleStore((state) => state.style);
  const prompt = useRoomStyleStore((state) => state.prompt);

  // 어떤 result를 쓸지 결정
  const pageResult =
    result ||
    (Array.isArray(interiors) &&
      selectedIndex !== null &&
      interiors[selectedIndex]) ||
    null;

  useEffect(() => {
    setIsLoading(!pageResult);
  }, [pageResult]);

  // 재생성 버튼 클릭 시
  const handleRegenerate = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showToast('로그인이 필요합니다.');
        setIsLoading(false);
        return;
      }
      const newResult = await postGenerateResult({
        image_url,
        room_type,
        style,
        prompt,
        token,
      });
      setResult(newResult);
      setSelectedFurniture(null);
      setIsDrawerOpen(false);
    } catch (error) {
      showToast(error.message || '인테리어 재생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // +버튼 클릭 시
  const handleFurnitureClick = (furniture) => {
    setSelectedFurniture(furniture);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedFurniture(null);
  };

  // AR 부분(API 연동)
  const handleARView = async (furniture) => {
    try {
      const label =
        furniture.danawa_products && furniture.danawa_products[0]?.label;
      if (!label) {
        showToast('가구 label 정보가 없습니다.');
        return;
      }
      const data = await fetchSimilarARObject({ label });
      if (data.status === 'success' && Array.isArray(data.objects)) {
        navigate('/ar', { state: { models: data.objects } });
        setTimeout(() => {
          showToast('AR이 실행되었습니다!');
        }, 500);
      } else {
        showToast(data.message || 'AR 모델 정보를 불러올 수 없습니다.');
      }
    } catch (error) {
      showToast(
        error.message || 'AR 모델 정보를 불러오는 중 오류가 발생했습니다.'
      );
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  const hideToast = () => {
    setIsToastVisible(false);
  };

  // 저장 버튼 클릭 시
  const handleSaveInterior = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showToast('로그인이 필요합니다.');
        setIsLoading(false);
        return;
      }
      const data = await saveMyInterior({ interior_id: pageResult.id, token });
      showToast('저장 성공!');
      setIsSaved(true);
      console.log(data);
    } catch (error) {
      showToast(error.message || '저장 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // detected_parts를 furnitures로 변환(구조 맞추기)
  const furnitures =
    pageResult?.detected_parts?.map((part) => ({
      ...part,
      label: part.label || part.id,
      danawa_products: part.danawa_products,
      bounding_box: part.bounding_box,
    })) || [];

  if (isLoading || !pageResult) {
    return (
      <div className="relative w-full h-screen bg-sage-bg flex items-center justify-center ">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black ">
      {/* 헤더 */}
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
        <ResultHeader />
        <RegenerateButton
          onRegenerate={handleRegenerate}
          isLoading={isLoading}
        />
      </header>

      {/* 이미지 슬라이더 */}
      <main className="w-full h-full ">
        <ImageComparisonSlider
          originalImageUrl={pageResult.original_image_url}
          generatedImageUrl={pageResult.generated_image_url}
          furnitures={furnitures}
          onFurnitureClick={handleFurnitureClick}
        />
      </main>

      {/* 푸터 */}
      <footer className="absolute bottom-0 left-0 right-0 p-4 z-20">
        {isSaved ? (
          <div className="flex justify-between items-center max-w-md mx-auto gap-4">
            <button
              disabled
              className=" bg-gray-400 text-white font-bold py-3 rounded-xl w-full"
            >
              저장됨
            </button>
            <OtherRoomButton />
          </div>
        ) : (
          <button
            onClick={handleSaveInterior}
            className="w-full max-w-md mx-auto block bg-[#6B8A7A] text-white font-bold py-3 rounded-xl backdrop-blur-sm hover:bg-[#5a6e5e] transition-colors"
          >
            내 인테리어 저장
          </button>
        )}
      </footer>

      {/* 가구 정보 드로어 */}
      <FurnitureDrawer
        isOpen={isDrawerOpen}
        furniture={selectedFurniture}
        onClose={handleDrawerClose}
        onARView={handleARView}
      />

      {/* 토스트 메시지 */}
      <ToastMessage
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={hideToast}
      />
    </div>
  );
}

export default ResultPage;
