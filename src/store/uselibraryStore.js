import { create } from 'zustand';

const useLibraryStore = create((set) => ({
  interiors: [], // 전체 interior 배열
  selectedIndex: null, // 선택된 인덱스
  setInteriors: (interiors) => set({ interiors }),
  setSelectedIndex: (index) => set({ selectedIndex: index }),
}));

export default useLibraryStore;
