import type { ReactNode } from "react";
import { Header } from "./Header";

export const MainLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <Header />

      <main className="grid gap-8 px-8 py-4">{children}</main>
    </div>
  );
};
