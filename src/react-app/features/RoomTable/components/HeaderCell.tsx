import { Checkbox } from "@heroui/react";
import { useAtom, useAtomValue } from "jotai";
import { roomAtom } from "../../../stores/room";
import { selectionAtom } from "../../../stores/selection";

export const columns = [
  { name: "選択", uid: "select" },
  { name: "名前", uid: "name" },
  { name: "レベル", uid: "level" },
  { name: "ランク", uid: "rank" },
  { name: "聞き専", uid: "isMute" },
];

export const HeaderCell = ({ name, uid }: { name: string; uid: string }) => {
  const room = useAtomValue(roomAtom);
  const [selection, setSelection] = useAtom(selectionAtom);

  const selects = room.reduce(
    (count, cur) => count + (selection[cur] === "selected" ? 1 : 0),
    0,
  );

  const handleChange = (isSelected: boolean) => {
    setSelection((selection) => {
      room.forEach((name) => {
        selection[name] = isSelected ? "selected" : "unselected";
      });
    });
  };

  if (uid === "select") {
    return (
      <Checkbox
        isSelected={selects === room.length}
        isIndeterminate={1 <= selects && selects < room.length}
        onValueChange={handleChange}
      />
    );
  }

  return name;
};
