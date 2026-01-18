import { ROLES, type Role } from "../role";
import type { GamePriority } from "./gamePriority";
import { PRIORITIES } from "./priority";

export const lockedRole = (priorities: GamePriority): Role | undefined => {
  return ROLES.find((role) => priorities[role] === PRIORITIES.lock);
};
