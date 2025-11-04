import { MicIcon, MicOffIcon } from "lucide-react";
import { Toggle } from "../ui/toggle";

export type MuteToggleProps = {
  isMute: boolean;
  onChange: (isMute: boolean) => void;
};

export const MuteToggle = ({ isMute, onChange }: MuteToggleProps) => {
  return (
    <Toggle
      title="聞き専を切り替える"
      variant="ghost"
      className="group/toggle"
      pressed={isMute}
      onPressedChange={(isMute) => onChange(isMute)}
    >
      <MicIcon className="transition-opacity group-data-[state=on]/toggle:opacity-0" />
      <MicOffIcon className="absolute transition-opacity group-data-[state=off]/toggle:opacity-0" />
    </Toggle>
  );
};
