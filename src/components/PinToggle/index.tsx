import { PinIcon, PinOffIcon } from "lucide-react";
import { Toggle } from "../ui/toggle";

export type MuteToggleProps = {
  isLock: boolean;
  onChange: (isLock: boolean) => void;
};

export const PinToggle = ({ isLock, onChange }: MuteToggleProps) => {
  return (
    <Toggle
      title="チーム固定を切り替える"
      variant="ghost"
      className="group/toggle"
      pressed={isLock}
      onPressedChange={(isLock) => onChange(isLock)}
    >
      <PinOffIcon className="transition-opacity group-data-[state=on]/toggle:opacity-0" />
      <PinIcon className="absolute transition-opacity group-data-[state=off]/toggle:opacity-0" />
    </Toggle>
  );
};
