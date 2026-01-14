import { Checkbox } from "@heroui/react";

export const columns = [
  { name: "選択", uid: "select" },
  { name: "名前", uid: "name" },
  { name: "レベル", uid: "level" },
  { name: "ランク", uid: "rank" },
  { name: "聞き専", uid: "isMute" },
];

export const HeaderCell = ({ name, uid }: { name: string; uid: string }) => {
  if (uid === "select") {
    return <Checkbox />;
  }

  return name;
};
