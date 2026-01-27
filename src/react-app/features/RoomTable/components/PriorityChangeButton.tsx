import {
  Button,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useAtomCallback } from "jotai/utils";
import { SmileIcon } from "lucide-react";
import { type Key, useCallback } from "react";
import { summonersAtom } from "../../../stores/summonersAtom";
import { PRIORITIES, type Priority } from "../../../types/priority";
import { ROLES } from "../../../types/role";
import { PRIORITY_UI_MAP } from "./PrioritySelect";

const Items = Object.values(PRIORITIES).map((priority) => ({ priority }));

export const PriorityChangeButton = () => {
  const handleChange = useAtomCallback(
    useCallback(async (_get, set, key: Key) => {
      const priority = key as Priority;
      set(summonersAtom, (summoners) => {
        Object.keys(summoners).forEach((name) => {
          ROLES.forEach((role) => {
            summoners[name].priorities[role] = priority;
          });
        });
      });
    }, []),
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          color="secondary"
          startContent={<SmileIcon className="size-5" />}
        >
          優先度一括変更
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        items={Items}
        disabledKeys={["lock"]}
        onAction={handleChange}
      >
        {(item) => {
          const config = PRIORITY_UI_MAP[item.priority];

          return (
            <DropdownItem
              key={item.priority}
              startContent={
                <config.Icon className={cn(config.color, "size-5")} />
              }
            >
              {config.comment}
            </DropdownItem>
          );
        }}
      </DropdownMenu>
    </Dropdown>
  );
};
