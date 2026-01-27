import { atom } from "jotai";
import { atomFamily } from "jotai-family";
import { summonerFamily } from "../../../stores/summonersAtom";
import type { Role } from "../../../types/role";
import type { Summoner } from "../../../types/summoner";
import type { Formation } from "../types/formation";

export const formationSummonersAtom = atomFamily((formation: Formation) =>
  atom<Record<Role, Summoner | undefined>>((get) => {
    return {
      top: formation.top ? get(summonerFamily(formation.top)) : undefined,
      jg: formation.jg ? get(summonerFamily(formation.jg)) : undefined,
      mid: formation.mid ? get(summonerFamily(formation.mid)) : undefined,
      bot: formation.bot ? get(summonerFamily(formation.bot)) : undefined,
      sup: formation.sup ? get(summonerFamily(formation.sup)) : undefined,
    };
  }),
);
