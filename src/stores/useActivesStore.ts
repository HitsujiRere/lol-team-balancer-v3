import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { useRoomNamesStore } from "./useRoomNamesStore";

type CheckedState = boolean | "indeterminate";

type State = {
  actives: Map<string, boolean>;
  getActive: (name: string) => boolean;
  getActiveAll: () => CheckedState;
  switchActive: (name: string, active: CheckedState) => void;
  switchActiveAll: (active: CheckedState) => void;
  register: (names: string[]) => void;
};

export const useActivesStore = create<State>()(
  mutative((set, get) => ({
    actives: new Map(),
    getActive: (name) => get().actives.get(name) ?? true,
    getActiveAll: () => {
      const size = get().actives.size;
      const actives = get()
        .actives.values()
        .reduce((cnt, active) => (active ? cnt + 1 : cnt), 0);
      if (actives === size) return true;
      if (actives === 0) return false;
      return "indeterminate";
    },
    switchActive: (name, active) =>
      set((state) => {
        state.actives.set(name, active === true);
      }),
    switchActiveAll: (active) =>
      set((state) => {
        state.actives.forEach((_, name) => {
          state.actives.set(name, active === true);
        });
      }),
    register: (names) =>
      set((state) => {
        const removed = state.actives
          .keys()
          .filter((name) => !names.includes(name));
        const appended = names.filter((name) => !state.actives.has(name));
        removed.forEach((name) => {
          state.actives.delete(name);
        });
        appended.forEach((name) => {
          state.actives.set(name, true);
        });
      }),
  })),
);

useRoomNamesStore.subscribe((roomState, _prev) =>
  useActivesStore.getState().register(roomState.names()),
);
