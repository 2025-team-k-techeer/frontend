import { create } from 'zustand';

export const useRoomStyleStore = create((set) => ({
  image_url: null,
  setImageUrl: (image_url) => set({ image_url }),
  room_type: null,
  setRoomType: (room_type) => set({ room_type }),
  style: null,
  setStyle: (style) => set({ style }),
  prompt: '',
  setPrompt: (prompt) => set({ prompt }),
  // 필요하다면 imageFilename 필드 추가
  imageFilename: null,
  setImageInfo: ({ url, filename }) =>
    set({ image_url: url, imageFilename: filename }),
  // 이미지 해상도 정보 추가
  imageSize: { width: 0, height: 0 },
  setImageSize: (imageSize) => set({ imageSize }),
}));
