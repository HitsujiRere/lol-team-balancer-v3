import type { Role } from "../../../types/role";

export const LaneInfoCard = ({ role }: { role: Role }) => {
  return (
    <div
      key={role}
      className="col-start-2 box-border grid place-items-center rounded-medium border-default border-medium bg-background px-4 py-2"
    >
      {role.toUpperCase()}
    </div>
  );
};
