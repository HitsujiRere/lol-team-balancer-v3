import { LinkIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { CopyButton } from "@/components/CopyButton";
import { Button } from "@/components/ui/button";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { rankToPoint } from "@/types/rank";
import { toOpggMultisearchLink } from "@/types/riotId";
import { average } from "@/utils/average";
import { TEAMS } from "../types/team";

export type TeamTagProps = {
  blueNames: string[];
  redNames: string[];
};

export const GroupTag = ({ blueNames, redNames }: TeamTagProps) => {
  const blueSummoners = useSummonersStore(
    useShallow((state) =>
      blueNames
        .map((name) => state.summoners[name])
        .filter((summoner) => summoner !== undefined),
    ),
  );
  const redSummoners = useSummonersStore(
    useShallow((state) =>
      redNames
        .map((name) => state.summoners[name])
        .filter((summoner) => summoner !== undefined),
    ),
  );

  const blueAveLevel = average(blueSummoners.map((summoner) => summoner.level));
  const blueAveRankPoint = average(
    blueSummoners.map((summoner) => rankToPoint(summoner.rank)),
  );
  const redAveLevel = average(redSummoners.map((summoner) => summoner.level));
  const redAveRankPoint = average(
    redSummoners.map((summoner) => rankToPoint(summoner.rank)),
  );

  const aveLevelDiff = Math.abs(blueAveLevel - redAveLevel).toFixed(1);
  const aveRankPointDiff = Math.abs(blueAveRankPoint - redAveRankPoint).toFixed(
    1,
  );

  const opggLink = toOpggMultisearchLink(
    [...blueSummoners, ...redSummoners]
      .map((summoner) => summoner.riotId)
      .filter((id) => id !== undefined),
  );

  const copyText = () => {
    const summoners = useSummonersStore.getState().summoners;
    return TEAMS.map((team) => {
      const names = team === "Blue" ? blueNames : redNames;
      const opggLink = toOpggMultisearchLink(
        names
          .map((name) => summoners[name])
          .map((summoner) => summoner?.riotId)
          .filter((id) => id !== undefined),
      );
      return `【${team}】\n${opggLink}\n${names.join("\n")}`;
    }).join("\n");
  };
  return (
    <div className="flex flex-col items-center justify-center gap-2 place-self-stretch rounded-md border-2 p-4">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        <div>平均ランク差: {aveLevelDiff}pt</div>
        <div>平均レベル差: {aveRankPointDiff}</div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <a href={opggLink} target="_blank">
          <Button variant="secondary">
            <LinkIcon />
            OP.GGマルチサーチ
          </Button>
        </a>
        <CopyButton variant="secondary" data={copyText} />
      </div>
    </div>
  );
};
