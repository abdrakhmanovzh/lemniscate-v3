import { create } from 'zustand';

type MenuState = {
  isOpen: boolean;
  toggleMenu: () => void;
};

export const useMenu = create<MenuState>((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen }))
}));
