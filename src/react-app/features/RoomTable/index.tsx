import {
  Button,
  cn,
  Input,
  NumberInput,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { MicIcon, MicOffIcon, ScaleIcon, SearchIcon } from "lucide-react";
import type { Summoner } from "../../types/summoner";

export const columns = [
  { name: "名前", uid: "name" },
  { name: "レベル", uid: "level" },
  { name: "ランク", uid: "rank" },
  { name: "聞き専", uid: "is-mute" },
];

export const users: Summoner[] = [
  {
    name: "りんご #JP1",
    level: 12,
    rank: "IRON_IV",
    isMute: false,
  },
  {
    name: "バナナ #JP1",
    level: 23,
    rank: "BRONZE_III",
    isMute: false,
  },
  {
    name: "ぶどう #JP1",
    level: 34,
    rank: "SILVER_II",
    isMute: true,
  },
  {
    name: "いちご #JP1",
    level: 45,
    rank: "GOLD_I",
    isMute: false,
  },
  {
    name: "みかん #JP1",
    level: 56,
    rank: "PLATINUM_IV",
    isMute: false,
  },
];

const renderCell = (summoner: Summoner, columnKey: React.Key) => {
  if (columnKey === "name") {
    return <div>{summoner.name}</div>;
  }

  if (columnKey === "level") {
    return (
      <NumberInput
        aria-label="level"
        value={summoner.level}
        minValue={0}
        onValueChange={() => {}}
        className="max-w-32"
        isWheelDisabled
        startContent={<span>Lv.</span>}
      />
    );
  }

  if (columnKey === "rank") {
    return (
      <Input
        aria-label="rank"
        value={summoner.rank}
        onValueChange={() => {}}
        className="max-w-32"
      />
    );
  }

  if (columnKey === "is-mute") {
    return (
      <Button
        aria-label="is-mute"
        isIconOnly
        size="sm"
        variant={summoner.isMute ? "flat" : "light"}
        className="group"
      >
        <MicIcon
          className={cn("absolute size-4", summoner.isMute && "opacity-0")}
        />
        <MicOffIcon
          className={cn("absolute size-4", !summoner.isMute && "opacity-0")}
        />
      </Button>
    );
  }

  return 0;
};

export const RoomTable = () => {
  return (
    <div className="grid gap-4">
      <div className="flex gap-8">
        <Button color="primary" startContent={<ScaleIcon />}>
          チーム分け
        </Button>
        <Button color="primary" startContent={<SearchIcon />}>
          サモナー検索
        </Button>
      </div>

      <Table aria-label="Example table with custom cells" removeWrapper>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={users}
          emptyContent={
            "ロビーチャットをコピペすることで簡単に追加できます！😊"
          }
        >
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
