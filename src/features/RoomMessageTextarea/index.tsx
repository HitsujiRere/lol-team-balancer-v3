"use client";

import { XIcon } from "lucide-react";
import { useEffect, useEffectEvent, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRoomNamesStore } from "@/stores/useRoomNamesStore";
import { formatRiotId } from "@/types/riotId";
import { findRiotIds } from "./utils/findRiotIds";

export const RoomMessageTextarea = () => {
  const setMessageNames = useRoomNamesStore((state) => state.setMessageNames);

  const [message, setMessage] = useState("");

  const handleSetNames = useEffectEvent((message: string) => {
    const riotIds = findRiotIds(message);
    const names = riotIds.map((id) => formatRiotId(id));
    setMessageNames(names);
  });
  useEffect(() => handleSetNames(message), [message]);

  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>ルームメッセージ</Label>
      <div className="relative">
        <Textarea
          placeholder="サモナー #JP1がロビーに参加しました。"
          id={id}
          className="min-h-32"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <Button
          title="メッセージを削除"
          variant="ghost"
          size="icon-sm"
          className="absolute top-2 right-2"
          onClick={() => setMessage("")}
          disabled={message === ""}
        >
          <XIcon />
        </Button>
      </div>
    </div>
  );
};
