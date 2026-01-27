import { atom } from "jotai";
import type { Matchup } from "../types/matchup";

export const goodMatchupsAtom = atom<Matchup[]>([]);
