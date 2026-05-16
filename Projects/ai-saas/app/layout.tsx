import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gbot – AI Generation Platform",
  description: "The most powerful AI platform for conversation, image, code, music and video generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
