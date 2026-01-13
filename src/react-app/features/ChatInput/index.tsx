import { Textarea } from "@heroui/react";

export const ChatInput = () => {
  return (
    <Textarea
      label="ロビーチャット"
      labelPlacement="outside"
      placeholder="サモナー #JP1がロビーに参加しました。"
      classNames={{ input: "field-sizing-content min-h-24" }}
      isClearable
      disableAutosize
    />
  );
};
