import { defineStore } from 'pinia';
import { store } from '@/store';

interface AppState {
  example?: Boolean;
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    example: false,
  }),
  getters: {
    getExample() {
      return this.example;
    },
  },
  actions: {
    setExample(example: boolean): void {
      this.example = example;
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWidthOut() {
  return useAppStore(store);
}
