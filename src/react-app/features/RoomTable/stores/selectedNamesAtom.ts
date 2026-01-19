import { atom } from "jotai";
import { roomAtom } from "../../../stores/roomAtom";
import { selectionFamily } from "../../../stores/selectionAtom";

export const selectedNamesAtom = atom((get) => {
  const names = get(roomAtom);
  return names.filter((name) => get(selectionFamily(name)));
});
