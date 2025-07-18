import React from 'react';
import HeaderBack from '../components/HeaderBack';
import InteriorList from '../components/List';
import Navigation from '../components/Navigation/Navigation';

function StyleList() {
  return (
    <div>
      <HeaderBack title="인테리어 스타일" />
      <InteriorList />
      <Navigation />
    </div>
  );
}

export default StyleList;
