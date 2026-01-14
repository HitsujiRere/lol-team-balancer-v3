import { Textarea } from "@heroui/react";
import { useState } from "react";
import { useUpdateRoom } from "./hooks/useUpdateRoom";
import { findRiotIds } from "./utils/findRiotIds";

export const ChatInput = () => {
  const [chat, setChat] = useState("");
  const updateRoom = useUpdateRoom();

  const handleChatChange = (chat: string) => {
    setChat(chat);
    const riotIds = findRiotIds(chat);
    updateRoom(riotIds);
  };

  return (
    <Textarea
      label="ロビーチャット"
      value={chat}
      onValueChange={handleChatChange}
      placeholder="サモナー #JP1がロビーに参加しました。"
      classNames={{ input: "field-sizing-content min-h-24" }}
      isClearable
      disableAutosize
    />
  );
};
