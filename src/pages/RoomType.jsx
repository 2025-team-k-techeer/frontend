import React, { useState } from 'react';
import HeaderBack from '../components/HeaderBack';
import ButtonAction from '../components/Button/ButtonAction';
import ButtonS from '../components/Button/ButtonS';
import Title from '../components/Title/Title';
import LivingRoomIcon from '../assets/Icon/LivingRoom.svg?react';
import { useNavigate } from 'react-router-dom';

function RoomType() {
  // 2. 어떤 버튼이 선택됐는지 기억할 상태를 만듭니다. 초기값은 null (아무것도 선택 안됨)
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();
  return (
    <div>
      <HeaderBack
        title=""
        bgColor="bg-sage-bg" // 배경색을 sage로 변경
        showBorder={true} // 구분선 보임 (true는 기본값이므로 생략 가능)
      />
      <div className="p-4">
        <Title
          title="공간 유형을 선택해주세요"
          subtitle="공간 유형에 따라 알맞는 인테리어를 추천해드립니다."
        />
        <div className="grid grid-cols-2 gap-4">
          <ButtonS
            label="거실"
            isSelected={selectedRoom === 'livingroom'}
            onClick={() => setSelectedRoom('livingroom')}
            layout="square"
          />
          <ButtonS
            label="침실"
            isSelected={selectedRoom === 'bedroom'}
            onClick={() => setSelectedRoom('bedroom')}
            layout="square"
          />
          <ButtonS
            label="공부방/서재"
            isSelected={selectedRoom === 'study'}
            onClick={() => setSelectedRoom('study')}
            layout="square"
          />
          <ButtonS
            label="원룸"
            isSelected={selectedRoom === 'oneroom'}
            onClick={() => setSelectedRoom('oneroom')}
            layout="square"
          />
          <ButtonS
            label="기타"
            isSelected={selectedRoom === 'etc'}
            onClick={() => setSelectedRoom('etc')}
            layout="square"
          />
        </div>
      </div>
      <ButtonAction
        isDisabled={!selectedRoom}
        onClick={() => {
          navigate('/RoomStyle');
        }}
      >
        다음
      </ButtonAction>
    </div>
  );
}
export default RoomType;
