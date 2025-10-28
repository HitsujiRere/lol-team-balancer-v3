"use client";

import { useShallow } from "zustand/shallow";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRoomNamesStore } from "@/stores/useRoomNamesStore";
import { SummonerRow } from "./components/SummonerRow";

export const SummonersTable = () => {
  const roomNames = useRoomNamesStore(useShallow((state) => state.names()));

  return (
    <div className="relative grid gap-2">
      <Label>サモナーテーブル</Label>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox defaultChecked />
              </TableHead>
              <TableHead>サモナー名</TableHead>
              <TableHead>ランク</TableHead>
              <TableHead>聞き専</TableHead>
              <TableHead>削除</TableHead>
            </TableRow>
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
