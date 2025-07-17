import React, { useState } from 'react';
import HeaderBack from '../components/HeaderBack';
import ButtonAction from '../components/Button/ButtonAction';
import ButtonS from '../components/Button/ButtonS';
import Title from '../components/Title/Title';
import LivingRoomIcon from '../assets/Icon/LivingRoom.svg?react';

function RoomType() {
  // 2. 어떤 버튼이 선택됐는지 기억할 상태를 만듭니다. 초기값은 null (아무것도 선택 안됨)
  const [selectedRoom, setSelectedRoom] = useState(null);
  return (
    <div>
      <HeaderBack
        title=""
        bgColor="bg-sage-bg" // 배경색을 sage로 변경
        showBorder={true} // 구분선 보임 (true는 기본값이므로 생략 가능)
      />
      <div className="p-4">
        <Title title="공간 유형" subtitle="공간 유형을 선택해주세요." />
        <div className="grid grid-cols-2 gap-4">
          <ButtonS
            label="거실"
            isSelected={selectedRoom === 'livingroom1'}
            onClick={() => setSelectedRoom('livingroom1')}
            layout="square"
          />
          {/* 'Icon' → 'icon'으로 수정 */}
          <ButtonS
            label="거실"
            isSelected={selectedRoom === 'livingroom2'}
            onClick={() => setSelectedRoom('livingroom2')}
            layout="square"
          />
          <ButtonS
            label="거실"
            isSelected={selectedRoom === 'livingroom3'}
            onClick={() => setSelectedRoom('livingroom3')}
            layout="square"
          />
          <ButtonS
            label="거실"
            isSelected={selectedRoom === 'livingroom4'}
            onClick={() => setSelectedRoom('livingroom4')}
            layout="square"
          />
        </div>
      </div>
      <ButtonAction>다음</ButtonAction>
    </div>
  );
}
export default RoomType;
