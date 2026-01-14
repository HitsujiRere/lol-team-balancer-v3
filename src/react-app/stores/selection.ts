import { atom } from "jotai/vanilla";
import { atomFamily } from "jotai-family";
import { atomWithImmer } from "jotai-immer";

export type Selection = "selected" | "unselected" | "unlisted";

export const selectionAtom = atomWithImmer<Record<string, Selection>>({});

export const selectionFamily = atomFamily((name: string) =>
  atom(
    (get) => get(selectionAtom)[name],
    (get, set, arg: (selection: Selection) => void) => {
      if (get(selectionAtom)[name]) {
        set(selectionAtom, (draft) => {
          arg(draft[name]);
        });
      }
    },
  ),
);
