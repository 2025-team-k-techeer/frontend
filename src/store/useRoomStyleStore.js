import { create } from 'zustand';

export const useRoomStyleStore = create((set) => ({
  roomType: null,
  setRoomType: (roomType) => set({ roomType }),
  style: null,
  setStyle: (style) => set({ style }),
  detail: '',
  setDetail: (detail) => set({ detail }),
  // 필요하다면 imageUrl, imageFilename 필드 추가
  imageUrl: null,
  imageFilename: null,
  setImageInfo: ({ url, filename }) =>
    set({ imageUrl: url, imageFilename: filename }),
}));
