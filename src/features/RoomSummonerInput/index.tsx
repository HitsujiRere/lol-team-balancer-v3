"use client";

import { PlusIcon } from "lucide-react";
import { type KeyboardEvent, useId, useState } from "react";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useRoomNamesStore } from "@/stores/useRoomNamesStore";
import { findRiotIdsAndNames } from "./findRiotIdsAndNames";

export const RoomSummonerInput = () => {
  const appendManualRiotIds = useRoomNamesStore(
    (state) => state.appendManualRiotIds,
  );
  const appendManualNames = useRoomNamesStore(
    (state) => state.appendManualNames,
  );

  const [text, setText] = useState("");

  const handleAppendName = () => {
    const [riotIds, names] = findRiotIdsAndNames(text);
    appendManualRiotIds(riotIds);
    appendManualNames(names);
    setText("");
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || event.key !== "Enter") return;
    handleAppendName();
  };

  const id = useId();

  return (
    <div className="grid gap-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor={id} className="shrink-0">
          サモナー名追加
        </Label>
        <InputGroup>
          <InputGroupInput
            id={id}
            placeholder="サモナー #JP1、さもなー #JP2、……"
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <InputGroupButton
            title="追加する"
            className="mr-1"
            onClick={handleAppendName}
          >
            <PlusIcon />
            追加
          </InputGroupButton>
        </InputGroup>
      </div>
    </div>
  );
};
