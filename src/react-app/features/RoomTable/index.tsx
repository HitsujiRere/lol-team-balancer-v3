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
import { ScaleIcon } from "lucide-react";
import { DebugActions } from "./components/DebugActions";
import { columns, HeaderCell } from "./components/HeaderCell";
import { SearchButton } from "./components/SearchButton";
import { SummonerCell } from "./components/SummonerCell";
import { SummonerSelect } from "./components/SummonerSelect";
import { selectedNamesAtom } from "./stores/selectedNamesAtom";
import { summonersInRoomAtom } from "./stores/summonersInRoomAtom";

export const RoomTable = ({
  onOpenGroupEditor,
}: {
  onOpenGroupEditor: () => void;
}) => {
  const summoners = useAtomValue(summonersInRoomAtom);
  const selectedNames = useAtomValue(selectedNamesAtom);

  return (
    <div className="grid gap-4">
      <div className="flex gap-8">
        <Button
          color="primary"
          startContent={<ScaleIcon className="size-5" />}
          onPress={onOpenGroupEditor}
          isDisabled={selectedNames.length !== 10}
        >
          チーム分け
        </Button>

        <SearchButton />
      </div>

      <DebugActions />

      <Table aria-label="Example table with custom cells" removeWrapper>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>
              <HeaderCell name={column.name} uid={column.uid} />
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={summoners}
          emptyContent={
            "ロビーチャットをコピペすることで簡単に追加できます！😊"
          }
        >
          {(item) => (
            <TableRow key={item.name}>
              {(column) => (
                <TableCell>
                  {column === "select" ? (
                    <SummonerSelect name={item.name} column={column} />
                  ) : (
                    <SummonerCell summoner={item} column={column} />
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
