import { HouseIcon, SwordsIcon } from "lucide-react";
import { RoomMessageTextarea } from "@/features/RoomMessageTextarea";
import { SummonersTable } from "@/features/SummonersTable";
import { Header } from "./_components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="grid grid-cols-[1fr_2px_1fr] pb-8">
        <section className="flex flex-col gap-6 p-4">
          <h2 className="flex items-center gap-1 text-xl">
            <HouseIcon />
            カスタムルーム
          </h2>
          <RoomMessageTextarea />
          <SummonersTable />
        </section>

        <div>
          <div className="h-full w-0 border-r-2" />
        </div>

        <section className="p-4">
          <h2 className="flex items-center gap-1 text-xl">
            <SwordsIcon />
            チーム分け
          </h2>
          <div className="h-screen" />
        </section>
      </main>
    </>
  );
}
