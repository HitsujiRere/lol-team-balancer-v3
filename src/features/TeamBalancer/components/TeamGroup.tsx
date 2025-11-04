import { SortableContext } from "@dnd-kit/sortable";
import { Flipper } from "react-flip-toolkit";
import { cn } from "@/lib/utils";
import type { Team } from "../types/team";
import { FlippedItem } from "./FlippedItem";
import { GroupTag } from "./GroupTag";
import { MemberItem } from "./MemberItem";
import { TeamTag } from "./TeamTag";

export type TeamGroupProps = {
  blueNames: string[];
  redNames: string[];
  disabledFlip: boolean;
};

export const TeamGroup = ({
  blueNames,
  redNames,
  disabledFlip,
}: TeamGroupProps) => {
  const members: [string, Team][] = [
    ...blueNames.map<[string, Team]>((name) => [name, "Blue"]),
    ...redNames.map<[string, Team]>((name) => [name, "Red"]),
  ];

  return (
    <SortableContext items={members.map(([name]) => name)}>
      <Flipper
        flipKey={`${blueNames.join(",")};${redNames.join(",")}`}
        className="mx-auto grid w-min grid-flow-row-dense grid-cols-[1fr_200px_1fr] gap-x-4 gap-y-4"
      >
        <TeamTag team="Blue" names={blueNames} />
        <GroupTag blueNames={blueNames} redNames={redNames} />
        <TeamTag team="Red" names={redNames} />

        {members.map(([name, team]) => (
          <FlippedItem key={name} flipId={name} disabled={disabledFlip}>
            <div
              className={cn({
                "col-start-1": team === "Blue",
                "col-start-3": team === "Red",
              })}
            >
              <MemberItem name={name} team={team} />
            </div>
          </FlippedItem>
        ))}
      </Flipper>
    </SortableContext>
  );
};
