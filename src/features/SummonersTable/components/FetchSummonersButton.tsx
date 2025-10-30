import { hc } from "hono/client";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AppType } from "@/server/hono";
import { useRoomNamesStore } from "@/stores/useRoomNamesStore";
import { useSummonersStore } from "@/stores/useSummonersStore";
import { formatRiotId } from "@/types/riotId";

export const FetchSummonersButton = () => {
  const [isFetching, setIsFetching] = useState(false);

  const client = hc<AppType>("/");

  const handleFetchSummoners = async () => {
    setIsFetching(true);

    const roomRiotIds = useRoomNamesStore.getState().riotIds();
    const changeSummoner = useSummonersStore.getState().changeSummoner;
    const summoners = useSummonersStore.getState().summoners;

    const promises = roomRiotIds
      .map<string>((riotId) => formatRiotId(riotId))
      .filter((name) => summoners[name]?.fetchStatus === "idle")
      .slice(0, 15)
      .map(async (name) => {
        changeSummoner(name, { fetchStatus: "loading" });
        const encoded = encodeURIComponent(name);
        const data = await client.api.summoner.id[":id"].$get({
          param: { id: encoded },
        });
        if (data.status === 200) {
          const info = await data.json();
          changeSummoner(name, {
            level: info.summonerLevel,
            iconId: info.profileIconId,
            rank: info.soloRankedRank,
            fetchStatus: "success",
            rankWins: info.soloRankedWins,
            rankLosses: info.soloRankedLosses,
          });
        } else {
          changeSummoner(name, {
            fetchStatus: "error",
          });
          const info = await data.json();
          console.log({ name, info });
        }
      });

    await Promise.all(promises);
    setIsFetching(false);
  };

  return (
    <Button
      variant="default"
      onClick={handleFetchSummoners}
      disabled={isFetching}
    >
      <SearchIcon className={cn({ "animate-spin": isFetching })} />
      サモナー検索
    </Button>
  );
};
