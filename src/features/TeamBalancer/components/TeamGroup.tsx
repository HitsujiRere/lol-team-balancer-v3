import type { Member } from "../types/member";
import { MemberItem } from "./MemberItem";

export type TeamGroupProps = {
  members: Member[];
};

export const TeamGroup = ({ members }: TeamGroupProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-16 gap-y-8">
      {members.map((member) => (
        <div key={member.name}>
          <MemberItem name={member.name} />
        </div>
      ))}
    </div>
  );
};
