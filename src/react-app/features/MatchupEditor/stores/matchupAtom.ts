import { atom } from "jotai";
import type { Matchup } from "../types/matchup";

export const matchupAtom = atom<Matchup | undefined>(undefined);
