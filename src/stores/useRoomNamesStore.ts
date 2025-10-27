import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { uniqued } from "@/utils/uniqued";

type State = {
  messageNames: string[];
  manualNames: string[];
  names: () => string[];
  setMessageNames: (names: string[]) => void;
  appendManualNames: (names: string[]) => void;
};

export const useRoomNamesStore = create<State>()(
  mutative((set, get) => ({
    messageNames: [],
    manualNames: [],
    names: () => uniqued([...get().manualNames, ...get().messageNames]),
    setMessageNames: (names) =>
      set((state) => {
        state.messageNames = names;
      }),
    appendManualNames: (names) =>
      set((state) => {
        state.manualNames.push(...names);
      }),
  })),
);
