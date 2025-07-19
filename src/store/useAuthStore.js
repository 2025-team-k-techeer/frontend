// src/store/useAuthStore.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  //useAuthStore 함수 생성
  user: null, //사용자 정보 저장
  isLoggedIn: false, //로그인 상태 저장
  login: (userData) => {
    //로그인 함수
    set({ user: userData, isLoggedIn: true }); //사용자 정보와 로그인 상태 업데이트
    localStorage.setItem('authUser', JSON.stringify(userData)); //로컬스토리지에 사용자 정보 저장
  },
  logout: () => {
    //로그아웃 함수
    set({ user: null, isLoggedIn: false }); //사용자 정보와 로그인 상태 초기화
    localStorage.removeItem('authUser'); //로컬스토리지에서 사용자 정보 삭제
  },
  initialize: () => {
    //초기화 함수
    const storedUser = localStorage.getItem('authUser'); //로컬스토리지에서 사용자 정보 가져오기
    if (storedUser) {
      set({ user: JSON.parse(storedUser), isLoggedIn: true }); //사용자 정보와 로그인 상태 업데이트
    }
  },
}));
