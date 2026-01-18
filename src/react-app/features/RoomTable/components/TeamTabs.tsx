import { cn, Tab, Tabs } from "@heroui/react";
import type { Key } from "react";
import { TEAM_NAMES, type TeamName } from "../../../types/teamName";

export const TeamTabs = ({
  team,
  onChange,
}: {
  team?: TeamName;
  onChange: (team?: TeamName) => void;
}) => {
  const handleChange = (key: Key) => {
    const next = key as TeamName;
    if (next !== team) {
      onChange(next);
    } else {
      onChange(undefined);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        selectedKey={team ?? "none"}
        onSelectionChange={handleChange}
        className="gap-0"
        classNames={{
          tabList: "gap-0",
        }}
      >
        {TEAM_NAMES.map((team) => (
          <Tab
            key={team}
            title={
              <div
                className={cn(
                  team === "blue" && "group-data-[selected=true]:text-blue-700",
                  team === "red" && "group-data-[selected=true]:text-red-700",
                )}
              >
                {team.toUpperCase()}
              </div>
            }
          />
        ))}
      </Tabs>
    </div>
  );
};
