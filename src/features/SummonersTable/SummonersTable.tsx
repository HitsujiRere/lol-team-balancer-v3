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

export const SummonersTable = () => {
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
            <TableRow>
              <TableCell>
                <Checkbox defaultChecked />
              </TableCell>
              <TableCell>サモナー #JP1</TableCell>
              <TableCell>Gold 1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
