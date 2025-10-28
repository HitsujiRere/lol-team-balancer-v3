import type { ChangeEvent } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

export type LevelInputProps = {
  level: number;
  onChange: (level: number) => void;
};

export const LevelInput = ({ level, onChange }: LevelInputProps) => {
  const levelText = level === 0 ? "" : level.toString();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextLevel = Number(event.target.value);
    if (!Number.isNaN(nextLevel)) {
      onChange(nextLevel);
    }
  };

  return (
    <InputGroup className="w-24">
      <InputGroupAddon>Lv.</InputGroupAddon>
      <InputGroupInput
        type="number"
        value={levelText}
        onChange={handleChange}
      />
    </InputGroup>
  );
};
