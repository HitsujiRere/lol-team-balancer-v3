import { atom } from "jotai";
import { roomAtom } from "../../../stores/room";
import { selectionFamily } from "../../../stores/selection";

export const selectedNamesAtom = atom((get) => {
  const names = get(roomAtom);
  return names.filter((name) => get(selectionFamily(name)));
});
