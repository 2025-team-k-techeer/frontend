import React, { useState, useEffect } from 'react';
import ResultHeader from '../components/Header/ResultHeader';
import RegenerateButton from '../components/Button/RegenerateButton';
import ImageComparisonSlider from '../components/Result/ImageComparisonSlider';
import FurnitureDrawer from '../components/Result/FurnitureDrawer';
import ToastMessage from '../components/Result/ToastMessage';
import OtherRoomButton from '../components/Button/OtherRoomButton';

function ResultPage() {
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [arData, setArData] = useState(null); // AR 데이터 저장 변수

  // 임시 테스트 AR 데이터 로깅
  useEffect(() => {
    if (arData) {
      console.log('AR 데이터:', arData);
    }
  }, [arData]);

  // 더미 데이터
  const dummyData = {
    status: 'success',
    original_image_url:
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=1974&auto=format&fit=crop',
    generated_image_url:
      'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1932&auto=format&fit=crop',
    saved: false,
    interior_id: 'f1a3b5a2-4e1f-4833-aac6-c2e6131cd907',
    furnitures: [
      {
        id: 'furniture_001',
        label: 'desk',
        bounding_box: { x: 120, y: 200, width: 280, height: 160 },
        danawa_products: [
          {
            product_id: 'uuid1',
            product_name: '편안한 패브릭 소파',
            price: 350000,
            product_url: 'https://example.com/product1',
            image_url:
              'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1965&auto=format&fit=crop',
            dimensions: { width_cm: 120, depth_cm: 60, height_cm: 75 },
          },
        ],
      },
      {
        id: 'furniture_002',
        label: 'lamp',
        bounding_box: { x: 400, y: 150, width: 80, height: 120 },
        danawa_products: [
          {
            product_id: 'uuid2',
            product_name: '골드 프레임 스탠드 조명',
            price: 120000,
            product_url: 'https://example.com/product2',
            image_url:
              'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1974&auto=format&fit=crop',
            dimensions: { width_cm: 30, depth_cm: 30, height_cm: 150 },
          },
        ],
      },
    ],
  };

  // 초기 데이터 로드
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // 실제 API 호출 (주석 처리)
      // const token = localStorage.getItem('authToken');

      // if (!token) {
      //   showToast('로그인이 필요합니다.');
      //   setIsLoading(false);
      //   return;
      // }

      // // 실제 API 호출
      // const response = await fetch('/v1/interiors/generate', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     image_url: 'http://localhost:8000/uploads/user123_room.jpg',
      //     room_type: '서재',
      //     style: '북유럽',
      //     prompt: '책장을 많이 넣어주세요. 조명이 따뜻했으면 좋겠어요.',
      //   }),
      // });

      // if (response.ok) {
      //   const data = await response.json();
      //   setResultData(data);
      // } else {
      //   console.error('Failed to load initial data');
      //   showToast('인테리어 생성에 실패했습니다.');
      // }
      setTimeout(() => {
        setResultData(dummyData);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error loading initial data:', error);
      showToast('인테리어 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setIsLoading(true);
    try {
      // 실제 API 호출 (주석 처리)
      // const token = localStorage.getItem('authToken');

      // if (!token) {
      //   showToast('로그인이 필요합니다.');
      //   setIsLoading(false);
      //   return;
      // }

      // // 실제 API 호출
      // const response = await fetch('/v1/interiors/generate', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     image_url: 'http://localhost:8000/uploads/user123_room.jpg',
      //     room_type: '서재',
      //     style: '북유럽',
      //     prompt: '책장을 많이 넣어주세요. 조명이 따뜻했으면 좋겠어요.',
      //   }),
      // });

      // if (response.ok) {
      //   const data = await response.json();
      //   setResultData(data);
      //   setSelectedFurniture(null);
      //   setIsDrawerOpen(false);
      // } else {
      //   console.error('Failed to regenerate');
      //   showToast('인테리어 재생성에 실패했습니다.');
      // }
      setTimeout(() => {
        setResultData(dummyData);
        setSelectedFurniture(null);
        setIsDrawerOpen(false);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error regenerating:', error);
      showToast('인테리어 재생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!resultData || isSaved) return;
    try {
      // 실제 API 호출 (주석 처리)
      // const token = localStorage.getItem('authToken'); // 또는 다른 인증 토큰 저장 방식

      // if (!token) {
      //   showToast('로그인이 필요합니다.');
      //   return;
      // }

      // const response = await fetch('/api/interior/save-interior', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     interior_id:
      //       resultData.interior_id || 'f1a3b5a2-4e1f-4833-aac6-c2e6131cd907',
      //   }),
      // });

      // const data = await response.json();

      // if (data.status === 'success') {
      //   setIsSaved(true);
      //   showToast(data.message || '저장되었습니다!');
      // } else {
      //   showToast(data.message || '저장에 실패했습니다.');
      // }
      setTimeout(() => {
        setIsSaved(true);
        showToast('저장되었습니다!');
      }, 500);
    } catch (error) {
      console.error('Error saving:', error);
      showToast('저장 중 오류가 발생했습니다.');
    }
  };

  const handleFurnitureClick = (furniture) => {
    setSelectedFurniture(furniture);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedFurniture(null);
  };

  const handleARView = async (furniture) => {
    try {
      // 실제 API 호출 (주석 처리)
      // const token = localStorage.getItem('authToken');

      // if (!token) {
      //   showToast('로그인이 필요합니다.');
      //   return;
      // }

      // const response = await fetch('/v1/furnitures/ar', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     label: furniture.label,
      //   }),
      // });

      // const data = await response.json();

      // if (response.status === 404) {
      //   showToast(data.message || 'AR 모델 정보를 찾을 수 없습니다.');
      //   return;
      // }

      // if (data.status === 'success') {
      //   setArData(data.objects);
      //   // AR 실행 (현재는 js로 구현된 상태)
      //   console.log('AR 실행:', data.objects);
      //   console.log('AR 데이터 저장됨:', arData);
      //   showToast('AR이 실행되었습니다!');
      // } else {
      //   showToast(data.message || 'AR 실행에 실패했습니다.');
      // }
      setTimeout(() => {
        // 성공 더미 응답
        const dummyAR = {
          status: 'success',
          message: '유사한 desk 객체를 반환합니다.',
          objects: [
            {
              _id: 'placement_001',
              label: furniture.label,
              model_url: 'https://firebase.storage/models/desk.glb',
              image_url: 'https://firebase.storage/3d.jpg',
              position: { x: 0.5, y: 0, z: -1.2 },
              rotation: 45,
              scale: 1.0,
            },
          ],
        };
        setArData(dummyAR.objects);
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

  if (!resultData) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black">
      {/* 이미지 슬라이더 */}
      <main className="w-full h-full">
        <ImageComparisonSlider
          originalImageUrl={resultData.original_image_url}
          generatedImageUrl={resultData.generated_image_url}
          furnitures={resultData.furnitures || []}
          onFurnitureClick={handleFurnitureClick}
        />
      </main>

      {/* 헤더 */}
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
        <ResultHeader />
        <RegenerateButton
          onRegenerate={handleRegenerate}
          isLoading={isLoading}
        />
      </header>

      {/* 푸터 */}
      <footer className="absolute bottom-0 left-0 right-0 p-4 z-20">
        {isSaved ? (
          <div className="flex justify-between items-center max-w-md mx-auto gap-4">
            <button
              disabled
              className="flex-1 bg-gray-400 text-white font-bold py-3 rounded-xl"
            >
              저장됨
            </button>
            <OtherRoomButton />
          </div>
        ) : (
          <button
            onClick={handleSave}
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
