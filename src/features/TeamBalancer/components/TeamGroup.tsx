import { Flipper } from "react-flip-toolkit";
import { cn } from "@/lib/utils";
import type { Member } from "../types/member";
import { FlippedItem } from "./FlippedItem";
import { MemberItem } from "./MemberItem";

export type TeamGroupProps = {
  members: Member[];
};

export const TeamGroup = ({ members }: TeamGroupProps) => {
  return (
    <Flipper
      flipKey={members
        .map((member) => `${member.name};${member.team}`)
        .join(",")}
    >
      <div className="grid grid-cols-2 gap-x-16 gap-y-8 grid-flow-col-dense">
        {members.map((member) => (
          <div
            key={member.name}
            className={cn({
              "col-start-1": member.team === "Blue",
              "col-start-2": member.team === "Red",
            })}
          >
            <FlippedItem flipId={member.name}>
              <MemberItem name={member.name} />
            </FlippedItem>
          </div>
        ))}
      </div>
    </Flipper>
  );
};
