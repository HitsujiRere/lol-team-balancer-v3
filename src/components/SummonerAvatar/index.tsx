import { type RiotId, toOpggLink } from "@/types/riotId";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export type SummonerAvatarProps = {
  name: string;
  riotId?: RiotId;
  iconId?: number;
};

export const SummonerAvatar = ({
  name,
  riotId,
  iconId,
}: SummonerAvatarProps) => {
  return (
    <div className="flex flex-1 items-center">
      <Avatar>
        {iconId && (
          <AvatarImage
            src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/profileicon/${iconId}.png`}
            alt="サモナーアイコン"
          />
        )}
        <AvatarFallback />
      </Avatar>
      {riotId ? (
        <a href={toOpggLink(riotId)} target="_blank">
          <Button variant="link">{name}</Button>
        </a>
      ) : (
        <div className="px-4">{name}</div>
      )}
    </div>
  );
};
