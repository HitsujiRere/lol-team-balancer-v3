"use client";

import { useShallow } from "zustand/shallow";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRoomNamesStore } from "@/stores/useRoomNamesStore";
import { FetchSummonersButton } from "./components/FetchSummonersButton";
import { HeaderRow } from "./components/HeaderRow";
import { SummonerRow } from "./components/SummonerRow";

export const SummonersTable = () => {
  const roomNames = useRoomNamesStore(useShallow((state) => state.names()));

  return (
    <div className="relative grid gap-2">
      <div className="flex items-end gap-8">
        <Label>サモナーテーブル</Label>
        <FetchSummonersButton />
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <HeaderRow />
          </TableHeader>
          <TableBody>
            {roomNames.length > 0 ? (
              roomNames.map((name) => <SummonerRow key={name} name={name} />)
            ) : (
              <TableRow>
                <TableCell colSpan={99} className="h-24 text-center text-base">
                  ルームメッセージをコピペすることでも簡単に追加できます！😊
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
