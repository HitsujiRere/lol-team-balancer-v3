import { createDebugRiotId, formatRiotId } from "#domain/riotId";
import { randomInt } from "../../../utils/random";

const templateNames = [
  "りんご",
  "バナナ",
  "ぶどう",
  "いちご",
  "みかん",
  "スイカ",
  "パイナップル",
  "さくらんぼ",
  "マンゴー",
  "キウイ",
] as const;

export const randomMessage = () => {
  const names = templateNames
    .map((name) => `${name}${randomInt(0, 10)}`)
    .map(createDebugRiotId)
    .map(formatRiotId);

  return names.map((name) => `${name}がロビーに参加しました。`).join("\n");
};
