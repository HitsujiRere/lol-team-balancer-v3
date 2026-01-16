import { Link, Skeleton, Tooltip, User } from "@heroui/react";
import { MessageCircleQuestionIcon, MessageCircleXIcon } from "lucide-react";
import { type RiotId, toOpggLink } from "#domain/riotId";
import defaultIcon from "../../assets/default-icon.png";
import type { FetchStatus } from "../../types/summoner";

const DDRAGON_VERSION = import.meta.env.VITE_DDRAGON_VERSION ?? "16.1.1";
const BASE_ICON_URL = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/profileicon`;

const STATUS_UI_MAP = {
  idle: {
    color: "default",
    tooltip: undefined,
    Icon: undefined,
  },
  loading: {
    color: "default",
    tooltip: undefined,
    Icon: undefined,
  },
  success: {
    color: "success",
    tooltip: undefined,
    Icon: undefined,
  },
  not_found: {
    color: "danger",
    tooltip: "サモナーが見つかりませんでした☹️",
    Icon: MessageCircleQuestionIcon,
  },
  error: {
    color: "danger",
    tooltip: "サーバーエラー😖",
    Icon: MessageCircleXIcon,
  },
} as const;

export const SummonerInfo = ({
  name,
  riotId,
  iconId,
  fetchStatus,
}: {
  name: string;
  riotId?: RiotId;
  iconId?: number;
  fetchStatus: FetchStatus;
}) => {
  const avatarSrc = iconId
    ? `${BASE_ICON_URL}/${iconId}.png`
    : fetchStatus === "loading"
      ? undefined
      : defaultIcon;

  const statusConfig = STATUS_UI_MAP[fetchStatus];

  return (
    <div className="flex gap-1">
      <User
        avatarProps={{
          src: avatarSrc,
          icon: <Skeleton className="size-full" />,
          isBordered: true,
          color: statusConfig.color,
        }}
        name={name}
        description={
          riotId && (
            <Link
              isExternal
              href={toOpggLink(riotId)}
              size="sm"
              className="font-mono"
            >
              OP.GG
            </Link>
          )
        }
      />
      {statusConfig.color && statusConfig.Icon && (
        <Tooltip content={statusConfig.tooltip}>
          <div className="px-2">
            <statusConfig.Icon className="size-5" />
          </div>
        </Tooltip>
      )}
    </div>
  );
};
