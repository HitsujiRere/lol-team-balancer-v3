import type { RiotId } from "./riotId";

export const toOpggLink = (riotId: RiotId) => {
  return `https://op.gg/ja/lol/summoners/jp/${riotId.gameName}-${riotId.tagLine}`;
};

export const toOpggMultisearchLink = (riotIds: RiotId[]) => {
  const param = riotIds
    // 最大10件まで対応
    .slice(0, 10)
    .map(({ gameName, tagLine }) => `${gameName}#${tagLine}`)
    .join(",");
  return `https://op.gg/ja/lol/multisearch/jp?summoners=${encodeURIComponent(param)}`;
};
