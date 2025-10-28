import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { uniqued } from "@/utils/uniqued";

type State = {
  messageNames: string[];
  manualNames: string[];
  names: () => string[];
  setMessageNames: (names: string[]) => void;
  appendManualNames: (names: string[]) => void;
  remove: (name: string) => void;
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
    remove: (name) =>
      set((state) => {
        state.messageNames = state.messageNames.filter(
          (messageName) => messageName !== name,
        );
        state.manualNames = state.manualNames.filter(
          (manualNames) => manualNames !== name,
        );
      }),
  })),
);
