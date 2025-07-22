import { create } from 'zustand';

export const useResultGenerationStore = create((set) => ({
  result: null,
  setResult: (result) => set({ result }),
}));
