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
  return (
    <Tooltip>
      <TooltipTrigger>
        {fetchStatus === "loading" ? (
          <SearchIcon className="size-4 animate-spin stroke-blue-600" />
        ) : fetchStatus === "success" ? (
          <SearchCheckIcon className="size-4 stroke-blue-600" />
        ) : fetchStatus === "error" ? (
          <SearchXIcon className="size-4 stroke-red-600" />
        ) : undefined}
      </TooltipTrigger>
      <TooltipContent>
        {fetchStatus === "loading" ? (
          <div>サモナー検索中</div>
        ) : fetchStatus === "success" ? (
          <div>サモナーが見つかりました！</div>
        ) : fetchStatus === "error" ? (
          <div>サモナーが見つかりませんでした😢</div>
        ) : undefined}
      </TooltipContent>
    </Tooltip>
  );
};
