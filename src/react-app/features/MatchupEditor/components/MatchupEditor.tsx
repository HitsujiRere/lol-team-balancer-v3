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
import { ROLES } from "../../../types/role";
import { TEAM_NAMES } from "../../../types/teamName";
import { LaneInfoCard } from "../components/LaneInfoCard";
import { SummonerCard } from "../components/SummonerCard";
import { TeamInfoCard } from "../components/TeamInfoCard";
import { useRandomizeMatchup } from "../hooks/useRandomizeMatchup";
import { currentMatchupAtom } from "../stores/currentMatchupAtom";
import { isOpenMatchupEditorAtom } from "../stores/isOpenMatchupEditorAtom";
import { MatchupInfoCard } from "./MatchupInfoCard";

export const MatchupEditor = () => {
  const [isOpenMatchupEditor, setOpenMatchupEditor] = useAtom(
    isOpenMatchupEditorAtom,
  );

  const { isOpen, onOpenChange } = useDisclosure({
    isOpen: isOpenMatchupEditor,
    onOpen: () => setOpenMatchupEditor(true),
    onClose: () => setOpenMatchupEditor(false),
  });

  const matchup = useAtomValue(currentMatchupAtom);
  const randomizeMatchup = useRandomizeMatchup();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="max-w-6xl">
      <ModalContent>
        <ModalHeader>チームエディター</ModalHeader>
        <ModalBody className="pb-4">
          <div className="flex gap-4">
            <Button
              color="primary"
              startContent={<DicesIcon className="size-5" />}
              onPress={randomizeMatchup}
            >
              ランダムチーム分け
            </Button>
          </div>

          <div className="grid grid-flow-row-dense grid-cols-[2.5fr_1fr_2.5fr] gap-4">
            <TeamInfoCard team="blue" />
            <MatchupInfoCard />
            <TeamInfoCard team="red" />

            {ROLES.map((role) => (
              <LaneInfoCard key={role} role={role} />
            ))}

            {TEAM_NAMES.map((team) =>
              ROLES.map(
                (role) =>
                  matchup[team][role] && (
                    <SummonerCard
                      key={`${team}_${role}`}
                      name={matchup[team][role]}
                      team={team}
                      role={role}
                    />
                  ),
              ),
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
