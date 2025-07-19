import React, { useState } from 'react';
import HeaderBack from '../components/HeaderBack';
import ButtonAction from '../components/Button/ButtonAction';
import ButtonS from '../components/Button/ButtonS';
import Title from '../components/Title/Title';
import LivingRoomIcon from '../assets/Icon/LivingRoom.svg?react';
import BedroomIcon from '../assets/Icon/Bedroom.svg?react';
import StudyIcon from '../assets/Icon/StudyRoom.svg?react';
import OneroomIcon from '../assets/Icon/OneRoom.svg?react';
import EtcIcon from '../assets/Icon/Ect.svg?react';

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
        {/* 버튼 그리드 */}
        <div className="grid grid-cols-2 gap-4">
          <ButtonS
            label="거실"
            icon={LivingRoomIcon}
            isSelected={selectedRoom === 'livingroom'}
            onClick={() => setSelectedRoom('livingroom')}
            layout="square"
          />
          <ButtonS
            label="침실"
            icon={BedroomIcon}
            isSelected={selectedRoom === 'bedroom'}
            onClick={() => setSelectedRoom('bedroom')}
            layout="square"
          />
          <ButtonS
            label="공부방/서재"
            icon={StudyIcon}
            isSelected={selectedRoom === 'study'}
            onClick={() => setSelectedRoom('study')}
            layout="square"
          />
          <ButtonS
            label="원룸"
            icon={OneroomIcon}
            isSelected={selectedRoom === 'oneroom'}
            onClick={() => setSelectedRoom('oneroom')}
            layout="square"
          />
          <ButtonS
            label="기타"
            icon={EtcIcon}
            isSelected={selectedRoom === 'etc'}
            onClick={() => setSelectedRoom('etc')}
            layout="square"
          />
        </div>
      </div>
      <footer className="p-4 flex-shrink-0">
        <ButtonAction
          isDisabled={!selectedRoom}
          onClick={() => {
            navigate('/RoomStyle');
          }}
        >
          다음
        </ButtonAction>
      </footer>
    </div>
  );
}
export default RoomType;
