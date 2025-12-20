import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/app/nav/NavBar";
import { ReactNode } from "react";
import { ToasterProvider } from "@/app/providers/ToasterProvider";
import SignalRProvider from "@/app/providers/SignalRProvider";
import { getCurrentUser } from "@/app/actions/authActions";

export const metadata: Metadata = {
  title: "DriveBid",
  description: "DriveBid Application for Car Bidding Service.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <ToasterProvider />

        <NavBar />

        <main className="container mx-auto px-5 pt-10">
          <SignalRProvider user={user}>{children}</SignalRProvider>
        </main>
      </body>
    </html>
  );
}
