import { ChatInput } from "./features/ChatInput";
import { GroupEditor } from "./features/GroupEditor";
import { RoomTable } from "./features/RoomTable";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  return (
    <MainLayout>
      <ChatInput />

      <RoomTable />

      <GroupEditor />
    </MainLayout>
  );
}

export default App;
