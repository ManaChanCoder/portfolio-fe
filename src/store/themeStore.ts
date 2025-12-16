import { create } from "zustand";
import { persist } from "zustand/middleware";

type TThemeState = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const themeStore = create<TThemeState>()(
  persist(
    (set) => ({
      isDark: false,

      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    { name: "theme-storage" }
  )
);

// for scroll behabior
type ScrollState = {
  isVisible: boolean;
  setVisible: (val: boolean) => void;
};

export const scrollBehavior = create<ScrollState>((set) => ({
  isVisible: false,
  setVisible: (value) => set({ isVisible: value }),
}));
