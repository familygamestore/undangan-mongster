import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MONGSTER — GRAND MLBB INVITATION",
  description: "Create exclusive invitations for communities joining MONGSTER events."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}