import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import type { Team } from "../types/team";
import { MemberView } from "./MemberView";

export type MemberItemProps = {
  name: string;
  team: Team;
};

export const MemberItem = ({ name, team }: MemberItemProps) => {
  const {
    isDragging,
    setActivatorNodeRef,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: name,
    data: { team },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn({
        "opacity-50": isDragging,
      })}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <MemberView
        name={name}
        team={team}
        handle={{
          ref: setActivatorNodeRef,
          attributes,
          listeners,
        }}
      />
    </div>
  );
};
