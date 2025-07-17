import React from 'react';
import HeaderBack from '../components/HeaderBack';
import ButtonAction from '../components/Button/ButtonAction';
import ButtonS from '../components/Button/ButtonS';
import Title from '../components/Title/Title';

function RoomType() {
  return (
    <div>
      <HeaderBack
        title="적었잖아요"
        bgColor="bg-sage-bg" // 배경색을 sage로 변경
        showBorder={true} // 구분선 보임 (true는 기본값이므로 생략 가능)
      />
      <Title />
      <ButtonAction>다음</ButtonAction>
    </div>
  );
}

export default RoomType;
