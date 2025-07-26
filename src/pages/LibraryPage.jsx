import React, { useEffect, useState } from 'react';
// src/components 폴더에서 필요한 컴포넌트들을 임포트합니다.
import HeaderBack from '/src/components/Header/HeaderBack.jsx';
import ImageGrid from '/src/components/ImageGrid/ImageGrid.jsx';
import Navigation from '/src/components/Navigation/Navigation.jsx';
import useLibraryStore from '/src/store/uselibraryStore.js';
import { getUserLibrary } from '/src/api/librarystoreApi.js';

function LibraryPage() {
  const { setInteriors } = useLibraryStore();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  // toast가 바뀔 때마다 2초 후에 사라지게
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast('');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    const fetchLibrary = async () => {
      setLoading(true);
      setToast('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setToast('인증되지 않은 사용자입니다.');
          setLoading(false);
          console.log('토큰 없음: 인증되지 않은 사용자입니다.');
          return;
        }
        const data = await getUserLibrary(token);
        console.log('라이브러리 API 응답:', data);
        if (data.status === 'success') {
          setInteriors(data.interiors);
        } else {
          setToast(data.message || '에러가 발생했습니다.');
          console.log('API 에러:', data.message || '에러가 발생했습니다.');
        }
      } catch (err) {
        setToast(err.message || '서버 오류');
        console.log('서버 오류:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLibrary();
  }, [setInteriors]);

  return (
    // LibraryPage 자체가 페이지 전체의 컨테이너 역할을 합니다.
    // 기존 App.jsx에 있던 레이아웃 클래스들을 이리로 옮깁니다.
    <div className="bg-white w-full max-full mx-auto flex flex-col min-h-screen">
      <HeaderBack
        className="bg-white"
        title="라이브러리"
        bgColor="bg-sage" // 배경색을 sage로 변경
        showBorder={true} // 구분선 보임 (true는 기본값이므로 생략 가능)
      />
      <main className="bg-white w-full max-w-6xl mx-auto pt-20 flex flex-col min-h-screen">
        {loading ? (
          <div className="flex flex-1 items-center justify-center min-h-[200px]">
            <div className="text-lg font-bold">로딩 중...</div>
          </div>
        ) : (
          <ImageGrid />
        )}
      </main>
      <Navigation />
      {toast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-xl z-50 text-center text-base font-semibold shadow-lg animate-fadeIn">
          {toast}
        </div>
      )}
    </div>
  );
}

export default LibraryPage;
