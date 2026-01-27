import { cn, Select, SelectItem, type Selection } from "@heroui/react";
import { FrownIcon, LaughIcon, LockIcon, SmileIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { PRIORITIES, type Priority } from "../../../types/priority";

const Items = Object.values(PRIORITIES).map((priority) => ({ priority }));

export const PRIORITY_UI_MAP = {
  lock: { Icon: LockIcon, color: cn("stroke-blue-600"), comment: "ロール固定" },
  high: { Icon: LaughIcon, color: cn("stroke-cyan-600"), comment: "最優先" },
  medium: { Icon: SmileIcon, color: cn("stroke-green-600"), comment: "ふつう" },
  low: { Icon: FrownIcon, color: cn("stroke-amber-600"), comment: "後回し" },
  never: { Icon: XIcon, color: cn("stroke-red-600"), comment: "無効" },
} as const;

export const PrioritySelect = ({
  priority,
  disabled,
  onChange,
}: {
  priority: Priority;
  disabled: boolean;
  onChange: (priority: Priority) => void;
}) => {
  const [value, setValue] = useState<Selection>(new Set([priority]));

  useEffect(() => {
    setValue(new Set([priority]));
  }, [priority]);

  return (
    <Select
      aria-label="Priority"
      items={Items}
      selectedKeys={value}
      onSelectionChange={(keys) => {
        const next = keys.currentKey as Priority | null;
        if (next) {
          setValue(new Set(next));
          onChange(next);
        }
      }}
      isDisabled={disabled}
      variant="bordered"
      className="w-20"
      classNames={{
        popoverContent: "w-40",
      }}
      renderValue={(items) => {
        return items.map((item) => {
          const config = PRIORITY_UI_MAP[item.data?.priority ?? "medium"];
          return (
            <config.Icon
              key={item.data?.priority}
              className={cn(config.color, "size-5")}
            />
          );
        });
      }}
    >
      {(item) => {
        const config = PRIORITY_UI_MAP[item.priority];

        return (
          <SelectItem
            key={item.priority}
            textValue={item.priority}
            className="data-[hover=true]:bg-inherit data-[hover=true]:outline-primary data-[selectable=true]:focus:bg-inherit data-[selectable=true]:focus:outline-primary"
          >
            <div className="flex items-center gap-2">
              <config.Icon className={cn(config.color, "size-5")} />
              <div>{config.comment}</div>
            </div>
          </SelectItem>
        );
      }}
    </Select>
  );
};
