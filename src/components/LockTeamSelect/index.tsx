import { cn } from "@/lib/utils";
import type { LockTeam } from "@/types/summoner/summoner";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";

export type LockTeamSelectProps = {
  lockTeam: LockTeam;
  onChange: (lockTeam: LockTeam) => void;
};

export const LockTeamSelect = ({ lockTeam, onChange }: LockTeamSelectProps) => {
  return (
    <NativeSelect
      value={lockTeam}
      className={cn("w-32", {
        "bg-blue-200": lockTeam === "Blue",
        "bg-red-200": lockTeam === "Red",
      })}
      onChange={(event) => onChange(event.target.value as LockTeam)}
    >
      <NativeSelectOption value="None">未設定</NativeSelectOption>
      <NativeSelectOption value="Blue" className="bg-blue-200">
        Blue
      </NativeSelectOption>
      <NativeSelectOption value="Red" className="bg-red-200">
        Red
      </NativeSelectOption>
    </NativeSelect>
  );
};
