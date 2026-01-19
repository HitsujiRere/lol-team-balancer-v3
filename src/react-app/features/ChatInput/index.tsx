import { Button, Textarea } from "@heroui/react";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { debugModeAtom } from "../../stores/debugModeAtom";
import { useUpdateRoom } from "./hooks/useUpdateRoom";
import { findRiotIds } from "./utils/findRiotIds";
import { randomMessage } from "./utils/randomMessage";

export const ChatInput = () => {
  const debugMode = useAtomValue(debugModeAtom);

  const [chat, setChat] = useState("");

  const updateRoom = useUpdateRoom();

  const handleChatChange = (chat: string) => {
    setChat(chat);
    const riotIds = findRiotIds(chat);
    updateRoom(riotIds);
  };

  return (
    <div>
      <Textarea
        label="ロビーチャット"
        value={chat}
        onValueChange={handleChatChange}
        placeholder="サモナー #JP1がロビーに参加しました。"
        classNames={{
          input: "field-sizing-content min-h-24",
          clearButton: "[&>svg]:size-6",
        }}
        isClearable
        disableAutosize
      />
      {debugMode && (
        <div className="mt-2">
          <Button
            color="danger"
            onPress={() => handleChatChange(randomMessage())}
          >
            仮メッセージ
          </Button>
        </div>
      )}
    </div>
  );
};
