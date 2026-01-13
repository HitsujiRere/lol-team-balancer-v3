import { ScaleIcon } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-separator border-b-2 p-4">
      <div className="flex gap-2">
        <ScaleIcon className="size-8" />
        <h1 className="font-bold text-2xl">LoLチーム調整くん</h1>
      </div>
    </header>
  );
};
