import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/app/nav/NavBar";
import { ReactNode } from "react";
import { ToasterProvider } from "@/app/providers/ToasterProvider";
import SignalRProvider from "@/app/providers/SignalRProvider";
import { ThemeInit } from "@/.flowbite-react/init";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "DriveBid",
  description: "DriveBid Application for Car Bidding Service.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeInit />
          <ToasterProvider />
          <NavBar />
          <main className="container mx-auto px-5 pt-10">
            <SignalRProvider>{children}</SignalRProvider>
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
