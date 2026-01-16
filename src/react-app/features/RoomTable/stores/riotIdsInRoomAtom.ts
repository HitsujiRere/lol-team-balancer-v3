import { atom } from "jotai";
import { summonersInRoomAtom } from "./summonersInRoomAtom";

export const riotIdsInRoomAtom = atom((get) => {
  const summoners = get(summonersInRoomAtom);
  return summoners.map(({ riotId }) => riotId).filter((id) => !!id);
});
