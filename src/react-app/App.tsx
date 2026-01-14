import { useDisclosure } from "@heroui/react";
import { ChatInput } from "./features/ChatInput";
import { GroupEditor } from "./features/GroupEditor";
import { RoomTable } from "./features/RoomTable";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <MainLayout>
      <ChatInput />

      <RoomTable onOpenGroupEditor={onOpen} />

      <GroupEditor isOpen={isOpen} onOpenChange={onOpenChange} />
    </MainLayout>
  );
}

export default App;
