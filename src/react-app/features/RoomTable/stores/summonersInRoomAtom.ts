import { atom } from "jotai";
import { roomAtom } from "../../../stores/room";
import { summonerFamily } from "../../../stores/summoner";

export const summonersInRoomAtom = atom((get) => {
  const names = get(roomAtom);
  return names.map((name) => get(summonerFamily(name)));
});
