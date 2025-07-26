// App.js (예시)
import React, { useState, useEffect } from 'react';
import HeaderBack from '/src/components/Header/HeaderBack'; // HeaderBack 컴포넌트를 import 합니다.
import ProfileInfo from '/src/components/ProfileInfo';
import MyLibraryPreview from '/src/components/MyLibraryPreview';
import Navigation from '/src/components/Navigation/Navigation'; // Navigation 컴포넌트를 import 합니다.

// API 호출 함수 import
import { fetchMyPageData } from '/src/api/userApi';

function ProfilePage() {
  // 1. 데이터, 로딩, 에러 상태 관리
  const [userData, setUserData] = useState(null);
  const [interiorsData, setInteriorsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. 페이지가 렌더링될 때 데이터 fetching
  useEffect(() => {
    const getMyPageData = async () => {
      try {
        setIsLoading(true); // 로딩 시작
        const data = await fetchMyPageData();
        console.log('API 요청 성공:', data); // 성공 시 데이터 콘솔 출력
        if (data.status === 'success') {
          setUserData(data.user);
          setInteriorsData(data.interiors);
        }
      } catch (err) {
        console.error('API 요청 에러:', err); // 에러 발생 시 콘솔 출력
        // 401 에러(인증 실패)인지 확인
        if (err.response?.status === 401) {
          alert('로그인이 필요합니다.');
          window.location.href = '/login';
        } else {
          // 401이 아닌 다른 에러는 그대로 상태에 저장
          setError(err);
        }
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };
    getMyPageData();
  }, []); // 빈 배열: 최초 렌더링 시 1회만 실행

  // 3. 로딩 및 에러 처리
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    // 401 에러 외 처리
    return (
      <div>
        에러가 발생했습니다:{' '}
        {error.response?.data?.message || '다시 시도해주세요.'}
      </div>
    );
  }

  return (
    <div className="w-full lg:max-w-3xl mx-auto flex flex-col pt-20 min-h-screen bg-white p-4">
      <HeaderBack
        title="내 프로필"
        bgColor="bg-white" // 배경색을 sage로 변경
        showBorder={true} // 구분선 보임 (true는 기본값이므로 생략 가능)
      />
      <main>
        {/* 4. API 데이터 props로 전달 */}
        <ProfileInfo user={userData} />
        <MyLibraryPreview interiors={interiorsData} />
      </main>
      <Navigation />
    </div>
  );
}

export default ProfilePage;
