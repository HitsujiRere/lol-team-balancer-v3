"use client";

import { XIcon } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRoomNamesStore } from "@/stores/useRoomNamesStore";
import { DebugMessageButton } from "./components/DebugMessageButton";
import { findRiotIds } from "./utils/findRiotIds";

export const RoomMessageTextarea = () => {
  const setMessageRiotIds = useRoomNamesStore(
    (state) => state.setMessageRiotIds,
  );

  const [message, setMessage] = useState("");

  const updateRiotIds = (newMessage: string) => {
    setMessage(newMessage);
    const riotIds = findRiotIds(newMessage);
    setMessageRiotIds(riotIds);
  };

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
          onClick={() => updateRiotIds("")}
          disabled={message === ""}
        >
          <XIcon />
        </Button>
      </div>

      <div>
        <DebugMessageButton setMessage={updateRiotIds} />
      </div>
    </div>
  );
};
