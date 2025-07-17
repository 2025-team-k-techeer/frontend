import React from 'react';
import HeaderBack from '../components/HeaderBack';
import ButtonAction from '../components/Button/ButtonAction';
import ButtonS from '../components/Button/ButtonS';
import Title from '../components/Title/Title';
import { ReactComponent as LivingRoomIcon } from '../assets/Icon/LivingRoom.svg';

function RoomType() {
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
            isSelected={true}
            onClick={() => {}}
            layout="full"
          />
          <ButtonS
            label="거실"
            Icon={LivingRoomIcon}
            isSelected={true}
            onClick={() => {}}
            layout="full"
          />
          <ButtonS
            label="거실"
            isSelected={true}
            onClick={() => {}}
            layout="full"
          />
          <ButtonS
            label="거실"
            isSelected={true}
            onClick={() => {}}
            layout="full"
          />
        </div>
      </div>
      <ButtonAction>다음</ButtonAction>
    </div>
  );
}

export default RoomType;
