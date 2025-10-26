import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "LoL Team Balancer",
  description: "LoLのカスタムゲームのチームバランスを取るツールです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={zenKakuGothicNew.className}>
      <body>{children}</body>
    </html>
  );
}
