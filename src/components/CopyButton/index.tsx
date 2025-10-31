import { CopyIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export type CopyButtonProps = {
  data: string | (() => string);
} & React.ComponentProps<typeof Button>;

export const CopyButton = ({ data, ...props }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Tooltip open={isCopied}>
      <TooltipTrigger asChild>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              typeof data === "string" ? data : data(),
            );
            setIsCopied(true);
          }}
          onMouseLeave={() => setIsCopied(false)}
          {...props}
        >
          <CopyIcon />
          コピー
        </Button>
      </TooltipTrigger>
      <TooltipContent>コピーしました</TooltipContent>
    </Tooltip>
  );
};
