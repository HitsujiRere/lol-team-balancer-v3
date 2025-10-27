import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mutative } from "zustand-mutative";

type State = {
  debugMode: boolean;
  switchDebugMode: (mode: boolean) => void;
};

export const useDebugStore = create<State>()(
  persist(
    mutative((set, _get) => ({
      debugMode: false,
      switchDebugMode: (mode) =>
        set((state) => {
          state.debugMode = mode;
        }),
    })),
    {
      name: "debug-store",
    },
  ),
);
