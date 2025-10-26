import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const RoomMessageTextarea = () => {
  return (
    <div className="relative grid gap-2">
      <Label htmlFor="message">ルームメッセージ</Label>
      <Textarea
        placeholder="サモナー #JP1がロビーに参加しました。"
        id="message"
        className="min-h-32"
      />
      <Button
        title="Remove textarea"
        variant="ghost"
        size="icon-sm"
        className="absolute top-7 right-2"
      >
        <XIcon />
      </Button>
    </div>
  );
};
