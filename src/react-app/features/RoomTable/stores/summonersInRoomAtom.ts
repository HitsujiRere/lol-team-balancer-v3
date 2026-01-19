import { atom } from "jotai";
import { roomAtom } from "../../../stores/roomAtom";
import { summonerFamily } from "../../../stores/summonersAtom";

export const summonersInRoomAtom = atom((get) => {
  const names = get(roomAtom);
  return names.map((name) => get(summonerFamily(name)));
});
