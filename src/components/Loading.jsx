// src/components/LoadingComponent.jsx

import React, { useState, useEffect } from 'react';

// 메시지 목록 (컴포넌트 외부에 선언하여 불필요한 재생성 방지)
const originalMessages = [
  { text: '방 청소하는 중...', emoji: '🧹' },
  { text: '가구 배치하는 중...', emoji: '🛋️' },
  { text: '가구 고르는 중...', emoji: '😎' },
  { text: '가구 목록 정리하는 중...', emoji: '📝' },
  { text: '배치 확인하는 중...', emoji: '🐳' },
];

// 로딩이 끝나면 호출될 함수를 props로 받습니다.
const LoadingComponent = ({ onLoadingComplete }) => {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 컴포넌트가 처음 마운트될 때 메시지를 섞습니다.
  useEffect(() => {
    const shuffle = (array) => {
      // slice()를 사용해 원본 배열을 바꾸지 않습니다.
      const newArray = array.slice();
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    setMessages(shuffle(originalMessages));
  }, []); // 빈 배열을 전달하여 최초 1회만 실행

  // currentIndex가 변경될 때마다 다음 메시지를 보여주거나 로딩 완료를 처리합니다.
  useEffect(() => {
    // 메시지 섞기가 끝나기 전에는 타이머를 시작하지 않습니다.
    if (messages.length === 0) return;

    // 모든 메시지가 표시된 경우
    if (currentIndex >= messages.length) {
      // 2초 후에 부모 컴포넌트에게 로딩이 완료되었음을 알립니다.
      const timer = setTimeout(() => {
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 2000);
      return () => clearTimeout(timer);
    }

    // 다음 메시지로 넘어가는 타이머 (2.5초)
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 2500);

    return () => clearTimeout(timer); // 컴포넌트가 unmount되거나 currentIndex가 바뀌면 타이머를 정리합니다.
  }, [currentIndex, messages, onLoadingComplete]);

  // 최종 완료 메시지 렌더링
  if (currentIndex >= messages.length) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center fade-in">
        <span className="text-4xl mb-2">🎉</span>
        <p className="text-lg font-semibold text-sage-accent">
          거의 다 됐어요!
        </p>
      </div>
    );
  }

  // 현재 메시지 렌더링
  const message = messages[currentIndex];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center fade-in-out">
      <span className="text-4xl mb-2">{message?.emoji}</span>
      <p className="text-lg font-semibold text-sage-accent">{message?.text}</p>
    </div>
  );
};

export default LoadingComponent;
