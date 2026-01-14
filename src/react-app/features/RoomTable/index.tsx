import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useAtomValue } from "jotai";
import { ScaleIcon, SearchIcon } from "lucide-react";
import { roomAtom } from "../../stores/room";
import { summonersAtom } from "../../stores/summoner";
import { renderCell } from "./components/renderCell";

const columns = [
  { name: "名前", uid: "name" },
  { name: "レベル", uid: "level" },
  { name: "ランク", uid: "rank" },
  { name: "聞き専", uid: "isMute" },
];

export const RoomTable = ({
  onOpenGroupEditor,
}: {
  onOpenGroupEditor: () => void;
}) => {
  const rooms = useAtomValue(roomAtom);

  const summoners = useAtomValue(summonersAtom);
  const summonerList = Object.entries(summoners)
    .filter(([name]) => rooms.includes(name))
    .map(([, summoner]) => summoner);

  return (
    <div className="grid gap-4">
      <div className="flex gap-8">
        <Button
          color="primary"
          startContent={<ScaleIcon />}
          onPress={onOpenGroupEditor}
        >
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
          items={summonerList}
          emptyContent={
            "ロビーチャットをコピペすることで簡単に追加できます！😊"
          }
        >
          {(item) => (
            <TableRow key={item.name}>
              {(column) => <TableCell>{renderCell(item, column)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
