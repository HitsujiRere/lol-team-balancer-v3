import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { useAtom, useAtomValue } from "jotai";
import { DicesIcon } from "lucide-react";
import { useEffect } from "react";
import { rosterAtom } from "../../stores/rosterAtom";
import { ROLES } from "../../types/role";
import { TEAM_NAMES } from "../../types/teamName";
import { GroupInfoCard } from "./components/GroupInfoCard";
import { LaneInfoCard } from "./components/LaneInfoCard";
import { SummonerCard } from "./components/SummonerCard";
import { TeamInfoCard } from "./components/TeamInfoCard";
import { isOpenMatchupEditorAtom } from "./stores/isOpenMatchupEditorAtom";
import { matchupAtom } from "./stores/matchupAtom";

export const MatchupEditor = () => {
  const [isOpenMatchupEditor, setOpenMatchupEditor] = useAtom(
    isOpenMatchupEditorAtom,
  );

  const { isOpen, onOpenChange } = useDisclosure({
    isOpen: isOpenMatchupEditor,
    onOpen: () => setOpenMatchupEditor(true),
    onClose: () => setOpenMatchupEditor(false),
  });

  const [matchup, setMatchup] = useAtom(matchupAtom);

  const roster = useAtomValue(rosterAtom);
  useEffect(() => {
    if (roster.length !== 10) return;

    setMatchup({
      // biome-ignore-start lint/style/noNonNullAssertion: roster.length === 5
      blue: {
        top: roster[0]!,
        jg: roster[1]!,
        mid: roster[2]!,
        bot: roster[3]!,
        sup: roster[4]!,
      },
      red: {
        top: roster[5]!,
        jg: roster[6]!,
        mid: roster[7]!,
        bot: roster[8]!,
        sup: roster[9]!,
      },
      // biome-ignore-end lint/style/noNonNullAssertion: roster.length === 5
    });
  }, [roster, setMatchup]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="max-w-6xl">
      <ModalContent>
        <ModalHeader>チームエディター</ModalHeader>
        <ModalBody className="pb-4">
          <div className="flex gap-4">
            <Button
              color="primary"
              startContent={<DicesIcon className="size-5" />}
            >
              チーム分け
            </Button>
          </div>

          <div className="grid grid-flow-row-dense grid-cols-[2.5fr_1fr_2.5fr] gap-4">
            <TeamInfoCard team="blue" />
            <GroupInfoCard />
            <TeamInfoCard team="red" />

            {ROLES.map((role) => (
              <LaneInfoCard key={role} role={role} />
            ))}

            {!!matchup &&
              TEAM_NAMES.map((team) =>
                ROLES.map((role) => (
                  <SummonerCard
                    key={`${team}_${role}`}
                    name={matchup[team][role]}
                    team={team}
                    role={role}
                  />
                )),
              )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { isOpenMatchupEditorAtom } from "./stores/isOpenMatchupEditorAtom";
