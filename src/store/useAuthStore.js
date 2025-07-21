// src/store/useAuthStore.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  //useAuthStore 함수 생성
  user: null, //사용자 정보 저장
  isLoggedIn: false, //로그인 상태 저장
  login: (userData) => {
    //로그인 함수
    set({ user: userData, isLoggedIn: true }); //사용자 정보와 로그인 상태 업데이트
    localStorage.setItem('token', userData.access_token); // localStorage에도 저장
  },
  logout: () => {
    //로그아웃 함수
    set({ user: null, isLoggedIn: false }); //사용자 정보와 로그인 상태 초기화
    localStorage.removeItem('token'); // localStorage 토큰 삭제
  },
  initialize: () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({ user: { token }, isLoggedIn: true });
    }
  },
}));
