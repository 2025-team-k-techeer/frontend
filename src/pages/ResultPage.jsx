import React, { useState, useEffect } from 'react';
import ResultHeader from '../components/Header/ResultHeader';
import RegenerateButton from '../components/Button/RegenerateButton';
import ImageComparisonSlider from '../components/Result/ImageComparisonSlider';
import FurnitureDrawer from '../components/Result/FurnitureDrawer';
import ToastMessage from '../components/Result/ToastMessage';
import OtherRoomButton from '../components/Button/OtherRoomButton';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { useResultGenerationStore } from '../store/useResultGenerationStore';
import { useRoomStyleStore } from '../store/useRoomStyleStore';
import { postGenerateResult, saveMyInterior } from '../api/generate-resultApi';

function ResultPage() {
  const { result, setResult } = useResultGenerationStore();
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

  // mount 시 zustand result가 없으면 로딩
  useEffect(() => {
    if (!result) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [result]);

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

  // AR 부분(더미)
  const handleARView = async (furniture) => {
    try {
      const product =
        (furniture.danawa_products && furniture.danawa_products[0]) || {};
      const modelInfo = {
        label: furniture.label,
        model_url:
          'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb',
        image_url:
          'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/DuckCM.png',
        scale: 0.1,
        width_cm: product.dimensions?.width_cm || 50,
        depth_cm: product.dimensions?.depth_cm || 50,
        height_cm: product.dimensions?.height_cm || 50,
      };

      // 추가 테스트 모델 (다른 가구)
      const additionalModelInfo = {
        label: 'chair',
        model_url:
          'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb',
        image_url:
          'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF/BoxCM.png',
        scale: 0.1,
        width_cm: 80,
        depth_cm: 80,
        height_cm: 80,
      };
      const modelsArray = [modelInfo, additionalModelInfo];
      navigate('/ar', { state: { models: modelsArray } });
      setTimeout(() => {
        showToast('AR이 실행되었습니다!');
      }, 500);
    } catch (error) {
      console.error('Error loading AR data:', error);
      showToast('AR 데이터 로딩 중 오류가 발생했습니다.');
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
      const data = await saveMyInterior({ interior_id: result.id, token });
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
    result?.detected_parts?.map((part) => ({
      ...part,
      label: part.label || part.id,
      danawa_products: part.danawa_products,
      bounding_box: part.bounding_box,
    })) || [];

  if (isLoading || !result) {
    return (
      <div className="relative w-full h-screen bg-sage-bg flex items-center justify-center">
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
      <main className="w-full h-full">
        <ImageComparisonSlider
          originalImageUrl={result.original_image_url}
          generatedImageUrl={result.generated_image_url}
          furnitures={furnitures}
          onFurnitureClick={handleFurnitureClick}
        />
      </main>

      {/* 푸터 */}
      <footer className="absolute bottom-0 left-0 right-0 p-4 z-20">
        {isSaved ? (
          <div className="flex w-full max-w-md mx-auto gap-2">
            <button
              disabled
              className="flex-1 min-w-0 w-1/2 h-12 bg-gray-400 text-white font-bold py-3 rounded-xl"
            >
              저장됨
            </button>
            <div className="flex-1 min-w-0 w-1/2 h-12">
              <OtherRoomButton />
            </div>
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
