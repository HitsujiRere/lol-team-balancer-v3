import { Button, cn } from "@heroui/react";
import { useAtomValue } from "jotai";
import { CopyIcon } from "lucide-react";
import { toOpggMultisearchLink } from "#domain/riotId";
import { ROLES } from "../../../types/role";
import type { TeamName } from "../../../types/teamName";
import { currentMatchupAtom } from "../stores/currentMatchupAtom";
import { formationSummonersAtom } from "../stores/formationSummonersAtom";

export const TeamInfoCard = ({ team }: { team: TeamName }) => {
  const formation = useAtomValue(currentMatchupAtom)[team];
  const summoners = useAtomValue(formationSummonersAtom(formation));

  const average =
    ROLES.map((role) => summoners[role]?.level ?? 0).reduce(
      (sum, cur) => sum + cur,
      0,
    ) / 5;

  const handleCopy = () => {
    const riotIds = ROLES.map((role) => summoners[role]?.riotId).filter(
      (id) => !!id,
    );
    navigator.clipboard.writeText(
      `# ${team === "blue" ? "ブルーチーム" : "レッドチーム"}
${ROLES.map((role) => `${role.toUpperCase()}: ${formation[role]}`).join("\n")}
${toOpggMultisearchLink(riotIds)}`,
    );
  };

  return (
    <div
      className={cn(
        "box-border grid place-items-center gap-2 rounded-medium border-medium px-4 py-2",
        team === "blue"
          ? "border-blue-400 bg-blue-200"
          : "border-red-400 bg-red-200",
      )}
    >
      <div className="font-bold text-lg">
        {team === "blue" ? "ブルーチーム" : "レッドチーム"}
      </div>
      <div className="flex items-center gap-8">
        <div className="grid h-10 place-items-center rounded-medium bg-default-100 px-4">
          平均 Lv.{average}
        </div>
        <Button
          variant="faded"
          startContent={<CopyIcon className="size-5" />}
          onPress={handleCopy}
        >
          メンバーコピー
        </Button>
      </div>
    </div>
  );
};
