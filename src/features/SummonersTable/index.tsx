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
            </TableRow>
          </TableHeader>
          <TableBody>
            {roomNames.map((name) => (
              <TableRow key={name}>
                <TableCell>
                  <Checkbox defaultChecked />
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>Gold 1</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
