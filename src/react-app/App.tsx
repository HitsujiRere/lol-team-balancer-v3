import { ChatInput } from "./features/ChatInput";
import { MatchupEditor } from "./features/MatchupEditor";
import { RoomTable } from "./features/RoomTable";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  return (
    <MainLayout>
      <ChatInput />

      <RoomTable />

      <MatchupEditor />
    </MainLayout>
  );
}

export default App;
