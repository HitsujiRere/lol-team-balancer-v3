import { Button } from "@heroui/react";
import { useAtomCallback } from "jotai/utils";
import { SearchIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { client } from "../../../lib/hono";
import { roomAtom } from "../../../stores/room";
import { summonerFamily } from "../../../stores/summoner";

export const SearchButton = () => {
  const [isLoading, setLoading] = useState(false);

  const handleSearch = useAtomCallback(
    useCallback(async (get, set) => {
      const rooms = get(roomAtom);

      const searchSummoners = rooms
        .map((name) => get(summonerFamily(name)))
        .filter((s) => s.fetchStatus === "idle" && s.riotId);

      if (searchSummoners.length === 0) return;

      setLoading(true);

      searchSummoners.forEach((summoner) => {
        set(summonerFamily(summoner.name), (summoner) => {
          summoner.fetchStatus = "loading";
        });
      });

      const res = await client.api.summoners.profiles.$get({
        query: { ids: JSON.stringify(searchSummoners.map((s) => s.riotId)) },
      });

      if (res.ok) {
        const profiles = await res.json();
        profiles.forEach((profile, index) => {
          const name = searchSummoners[index].name;
          set(summonerFamily(name), (summoner) => {
            if (profile.success) {
              summoner.fetchStatus = "success";
              summoner.level = profile.summonerLevel;
              summoner.rank = profile.soloRankedRank;
              summoner.fetchedLevel = profile.summonerLevel;
              summoner.iconId = profile.profileIconId;
              summoner.fetchedRank = profile.soloRankedRank;
              summoner.rankWins = profile.soloRankedWins;
              summoner.rankLosses = profile.soloRankedLosses;
            } else {
              if (profile.error === "Data not found") {
                summoner.fetchStatus = "not_found";
              } else {
                summoner.fetchStatus = "error";
              }
            }
          });
        });
      } else {
        const error = await res.json();
        console.error(error);

        searchSummoners.forEach((summoner) => {
          set(summonerFamily(summoner.name), (summoner) => {
            summoner.fetchStatus = "error";
          });
        });
      }

      setLoading(false);
    }, []),
  );

  return (
    <Button
      color="primary"
      startContent={!isLoading && <SearchIcon className="size-5" />}
      onPress={handleSearch}
      isLoading={isLoading}
    >
      サモナー検索
    </Button>
  );
};
