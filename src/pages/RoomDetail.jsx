import React, { useState } from 'react';

import HeaderBack from '../components/Header/HeaderBack';
import Title from '../components/Title/Title';
import Detail from '../components/Detail';
import TipSection from '../components/Tip/TipSection'; // 팁 섹션 컴포넌트 불러오기
import ButtonAction from '../components/Button/ButtonAction';

export default function RoomDetail() {
  // textarea의 입력값을 관리할 state
  const [detail, setDetail] = useState('');

  // textarea의 onChange 이벤트를 처리할 핸들러
  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col pt-20 min-h-screen bg-white">
      <HeaderBack title="" bgColor="bg-sage-bg" />
      <main className="flex-1 flex flex-col px-6 pb-6">
        <Title
          title="추가 요구사항을 입력해주세요"
          subtitle="더 들어갔으면 하는 가구 등 디테일한 요청을 적어주시면 <br>인테리어에 반영됩니다."
        />

        {/* 상세 요구사항 입력란 */}
        <Detail onChange={handleDetailChange} />

        {/* 분리된 TipSection 컴포넌트 사용 */}
        <TipSection />
      </main>

      <footer className="p-4 flex-shrink-0 bg-white mt-auto">
        <ButtonAction
          hraf="/result"
          onClick={() => {}}
          // detail state의 양쪽 공백을 제거한 값이 비어있으면 isDisabled는 true가 됨
          isDisabled={detail.trim() === ''}
        >
          완료
        </ButtonAction>
      </footer>
    </div>
  );
}
