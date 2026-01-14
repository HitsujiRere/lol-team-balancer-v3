import { NumberInput } from "@heroui/react";

export const LevelInput = ({
  level,
  onChange,
}: {
  level: number;
  onChange: (level: number) => void;
}) => {
  return (
    <NumberInput
      aria-label="level"
      value={level}
      minValue={0}
      onValueChange={onChange}
      className="max-w-32"
      isWheelDisabled
      startContent={<span>Lv.</span>}
    />
  );
};
