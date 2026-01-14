import { Button, cn } from "@heroui/react";
import { MicIcon, MicOffIcon } from "lucide-react";

export const MuteToggle = ({
  isMute,
  onChange,
}: {
  isMute: boolean;
  onChange: (isMute: boolean) => void;
}) => {
  return (
    <Button
      aria-label="is-mute"
      onPress={() => onChange(!isMute)}
      isIconOnly
      variant={isMute ? "flat" : "light"}
    >
      <MicIcon className={cn("size-5", isMute && "opacity-0")} />
      <MicOffIcon className={cn("absolute size-5", !isMute && "opacity-0")} />
    </Button>
  );
};
