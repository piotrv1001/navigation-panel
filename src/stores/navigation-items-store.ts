import { NavigationItem } from "@/types/navigation-item";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  items: NavigationItem[];
};

type Actions = {
  setItems: (items: NavigationItem[]) => void;
};

export const useNavigationItemsStore = create<State & Actions>()(
  persist(
    (set) => ({
      items: [],
      setItems: (items: NavigationItem[]) => set({ items }),
    }),
    {
      name: "navigation-items-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
