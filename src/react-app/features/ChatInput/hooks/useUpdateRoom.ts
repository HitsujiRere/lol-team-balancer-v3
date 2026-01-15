import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { formatRiotId, type RiotId } from "#domains/riotId";
import { roomAtom } from "../../../stores/room";
import { selectionAtom } from "../../../stores/selection";
import { summonersAtom } from "../../../stores/summoner";
import { createSummoner } from "../../../types/summoner";

export const useUpdateRoom = () =>
  useAtomCallback(
    useCallback(async (_get, set, riotIds: RiotId[]) => {
      // summonersAtomに無いならば新規作成
      set(summonersAtom, (summoners) => {
        riotIds.forEach((riotId) => {
          const name = formatRiotId(riotId);
          if (!summoners[name]) {
            summoners[name] = createSummoner({ name, riotId });
          }
        });
      });

      // roomAtomを更新
      set(roomAtom, riotIds.map(formatRiotId));

      // selectionAtomを更新
      set(selectionAtom, (selection) => {
        const newNames = riotIds.map(formatRiotId);
        // 削除
        Object.keys(selection)
          .filter((name) => !newNames.includes(name))
          .forEach((name) => {
            selection[name] = "unlisted";
          });
        // 追加
        newNames
          .filter((name) => selection[name] === "unlisted" || !selection[name])
          .forEach((name) => {
            selection[name] = "selected";
          });
      });
    }, []),
  );
