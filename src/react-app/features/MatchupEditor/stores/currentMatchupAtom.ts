import { atom } from "jotai";
import { createEmptyMatchup, type Matchup } from "../types/matchup";

export const currentMatchupAtom = atom<Matchup>(createEmptyMatchup());
