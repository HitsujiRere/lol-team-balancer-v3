import { HouseIcon, SwordsIcon } from "lucide-react";
import { RoomMessageTextarea } from "@/features/RoomMessageTextarea";
import { RoomSummonerInput } from "@/features/RoomSummonerInput";
import { SummonersTable } from "@/features/SummonersTable";
import { TeamBalancer } from "@/features/TeamBalancer";
import { Header } from "./_components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="container mx-auto flex min-h-screen flex-col gap-12 pt-4 pb-32">
        <section className="flex flex-col gap-6 px-4">
          <h2 className="flex items-center gap-1 text-xl">
            <HouseIcon />
            カスタムルーム
          </h2>
          <RoomMessageTextarea />
          <RoomSummonerInput />
          <SummonersTable />
        </section>

        <section className="flex flex-col gap-6 px-4">
          <h2 className="flex items-center gap-1 text-xl">
            <SwordsIcon />
            チーム分け
          </h2>
          <TeamBalancer />
        </section>
      </main>
    </>
  );
}
