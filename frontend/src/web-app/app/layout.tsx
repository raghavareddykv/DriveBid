import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/app/nav/NavBar";
import { ReactNode } from "react";
import { ToasterProvider } from "@/app/providers/ToasterProvider";

export const metadata: Metadata = {
  title: "DriveBid",
  description: "DriveBid Application for Car Bidding Service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToasterProvider />

        <NavBar />

        <main className="container mx-auto px-5 pt-10">{children}</main>
      </body>
    </html>
  );
}
