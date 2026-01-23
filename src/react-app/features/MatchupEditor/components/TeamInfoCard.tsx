import { Button, cn } from "@heroui/react";
import type { TeamName } from "../../../types/teamName";

export const TeamInfoCard = ({ team }: { team: TeamName }) => {
  return (
    <div
      className={cn(
        "box-border grid place-items-center gap-2 rounded-medium border-medium px-4 py-2",
        team === "blue"
          ? "border-blue-400 bg-blue-200"
          : "border-red-400 bg-red-200",
      )}
    >
      <div className="text-lg">
        {team === "blue" ? "ブルーチーム" : "レッドチーム"}
      </div>
      <div className="flex items-center gap-8">
        <div>平均: GOLD_I</div>
        <Button variant="faded">メンバーコピー</Button>
      </div>
    </div>
  );
};
