import { Checkbox } from "@heroui/react";
import { useAtom } from "jotai";
import type { Key } from "react";
import { selectionFamily } from "../../../stores/selectionAtom";

export const SummonerSelect = ({
  name,
  column,
}: {
  name: string;
  column: Key;
}) => {
  const [isSelected, setSelect] = useAtom(selectionFamily(name));

  if (column === "select") {
    return <Checkbox isSelected={isSelected} onValueChange={setSelect} />;
  }
};
