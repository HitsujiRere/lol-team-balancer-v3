import { useAtomValue } from "jotai/react";
import { laneOptionAtom, parameterOptionAtom } from "../../stores/group-option";
import { summonerFamily } from "../../stores/summoner";
import type { LaneName } from "../../types/lane-name";

export const LaneCard = ({
  lane,
  blueName,
  redName,
}: {
  lane: LaneName;
  blueName: string;
  redName: string;
}) => {
  const laneOption = useAtomValue(laneOptionAtom);
  const parameterOption = useAtomValue(parameterOptionAtom);

  const blueSummoner = useAtomValue(summonerFamily(blueName));
  const redSummoner = useAtomValue(summonerFamily(redName));

  const diff = blueSummoner[parameterOption] - redSummoner[parameterOption];

  if (laneOption === "DISABLED") {
    return <div className="col-start-2" />;
  }

  return (
    <div className="col-start-2 grid place-items-center gap-2 rounded-md border-2 p-4">
      <div className="flex flex-col items-center gap-2">
        <div>{lane.toUpperCase()}</div>
        <div className="flex items-center gap-2">
          {diff < 0 && <div>{"<"}</div>}
          {diff === 0 && <div>=</div>}
          {diff !== 0 && (
            <div>
              {parameterOption === "level"
                ? `+Lv.${Math.abs(diff)}`
                : `+${Math.abs(diff)}pt`}
            </div>
          )}
          {diff > 0 && <div>{">"}</div>}
        </div>
      </div>
    </div>
  );
};
