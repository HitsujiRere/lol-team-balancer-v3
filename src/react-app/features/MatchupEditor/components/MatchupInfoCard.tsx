import { Button } from "@heroui/react";
import { useAtomCallback } from "jotai/utils";
import { CopyIcon } from "lucide-react";
import { useCallback } from "react";
import { toOpggMultisearchLink } from "#domain/riotId";
import { ROLES } from "../../../types/role";
import { TEAM_NAMES } from "../../../types/teamName";
import { currentMatchupAtom } from "../stores/currentMatchupAtom";
import { formationSummonersAtom } from "../stores/formationSummonersAtom";

export const MatchupInfoCard = () => {
  const handleCopy = useAtomCallback(
    useCallback((get, _set) => {
      const matchup = get(currentMatchupAtom);

      navigator.clipboard.writeText(
        TEAM_NAMES.map((team) => {
          const formation = matchup[team];
          const summoners = get(formationSummonersAtom(formation));
          const riotIds = ROLES.map((role) => summoners[role]?.riotId).filter(
            (id) => !!id,
          );
          return `# ${team === "blue" ? "ブルーチーム" : "レッドチーム"}
${ROLES.map((role) => `${role.toUpperCase()}: ${formation[role]}`).join("\n")}
${toOpggMultisearchLink(riotIds)}`;
        }).join("\n"),
      );
    }, []),
  );

  return (
    <div className="box-border grid place-items-center rounded-medium border-default-300 border-medium bg-default-200 px-4 py-2">
      <Button
        variant="faded"
        startContent={<CopyIcon className="size-5" />}
        onPress={handleCopy}
      >
        メンバーコピー
      </Button>
    </div>
  );
};
