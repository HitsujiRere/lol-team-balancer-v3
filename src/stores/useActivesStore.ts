import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { count } from "@/utils/count";
import { useRoomNamesStore } from "./useRoomNamesStore";

type CheckedState = boolean | "indeterminate";

type State = {
  actives: Map<string, boolean>;
  isActive: (name: string) => boolean;
  isAllActive: () => CheckedState;
  getActiveNames: () => string[];
  switchActive: (name: string, active: CheckedState) => void;
  switchAllActive: (active: CheckedState) => void;
  register: (names: string[]) => void;
};

export const useActivesStore = create<State>()(
  mutative((set, get) => ({
    actives: new Map(),
    isActive: (name) => get().actives.get(name) ?? true,
    isAllActive: () => {
      const size = get().actives.size;
      const actives = count(get().actives.values().toArray());
      if (actives === size) return true;
      if (actives === 0) return false;
      return "indeterminate";
    },
    getActiveNames: () => {
      return get()
        .actives.entries()
        .filter(([, active]) => active)
        .map(([name]) => name)
        .toArray();
    },
    switchActive: (name, active) =>
      set((state) => {
        state.actives.set(name, active === true);
      }),
    switchAllActive: (active) =>
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
