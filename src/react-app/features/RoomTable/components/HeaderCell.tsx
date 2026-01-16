import { Checkbox, Link } from "@heroui/react";
import { useAtom, useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { toOpggMultisearchLink } from "#domain/riotId";
import { roomAtom } from "../../../stores/room";
import { selectionAtom } from "../../../stores/selection";
import { summonerFamily } from "../../../stores/summoner";

export const columns = [
  { name: "選択", uid: "select" },
  { name: "名前", uid: "name" },
  { name: "レベル", uid: "level" },
  { name: "ランク", uid: "rank" },
  { name: "聞き専", uid: "isMute" },
];

const useRiotIds = () =>
  useAtomCallback(
    useCallback((get, _set, names: string[]) => {
      return names.map((name) => get(summonerFamily(name)).riotId);
    }, []),
  );

export const HeaderCell = ({ name, uid }: { name: string; uid: string }) => {
  const room = useAtomValue(roomAtom);
  const [selection, setSelection] = useAtom(selectionAtom);

  const getRiotIds = useRiotIds();

  const handleChange = (isSelected: boolean) => {
    setSelection((selection) => {
      room.forEach((name) => {
        selection[name] = isSelected ? "selected" : "unselected";
      });
    });
  };

  if (uid === "select") {
    const selects = room.reduce(
      (count, cur) => count + (selection[cur] === "selected" ? 1 : 0),
      0,
    );

    return (
      <Checkbox
        isSelected={selects === room.length}
        isIndeterminate={1 <= selects && selects < room.length}
        onValueChange={handleChange}
      />
    );
  }

  if (uid === "name") {
    const top10RiotIds = getRiotIds(room)
      .filter((id) => !!id)
      .slice(0, 10);

    return (
      <div className="flex items-center gap-4">
        <div>{name}</div>
        <Link
          isExternal
          href={toOpggMultisearchLink(top10RiotIds)}
          className="text-sm"
        >
          <span className="font-mono">OP.GG</span> マルチサーチ
        </Link>
      </div>
    );
  }

  return name;
};
