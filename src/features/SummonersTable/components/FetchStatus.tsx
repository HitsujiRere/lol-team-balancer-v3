import { SearchCheckIcon, SearchIcon, SearchXIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Summoner } from "@/types/summoner";

export type FetchStatusProps = {
  fetchStatus: Summoner["fetchStatus"];
};

export const FetchStatus = ({ fetchStatus }: FetchStatusProps) => {
  if (fetchStatus === "idle") {
    return undefined;
  }
  if (fetchStatus === "loading") {
    return (
      <Tooltip>
        <TooltipTrigger>
          <SearchIcon className="size-4 animate-spin stroke-blue-600" />
        </TooltipTrigger>
        <TooltipContent>
          <p>サモナー検索中</p>
        </TooltipContent>
      </Tooltip>
    );
  }
  if (fetchStatus === "success") {
    return (
      <Tooltip>
        <TooltipTrigger>
          <SearchCheckIcon className="size-4 stroke-blue-600" />
        </TooltipTrigger>
        <TooltipContent>
          <p>サモナーが見つかりました！</p>
        </TooltipContent>
      </Tooltip>
    );
  }
  if (fetchStatus === "error") {
    return (
      <Tooltip>
        <TooltipTrigger>
          <SearchXIcon className="size-4 stroke-red-600" />
        </TooltipTrigger>
        <TooltipContent>
          <p>サモナーが見つかりませんでした😢</p>
        </TooltipContent>
      </Tooltip>
    );
  }
};
