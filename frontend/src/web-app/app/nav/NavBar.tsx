"use client";

import Search from "@/app/nav/Search";
import { Logo } from "@/app/nav/Logo";
import { LoginButton } from "@/app/nav/LoginButton";
import UserActions from "@/app/nav/UserActions";
import { useSession } from "next-auth/react";

export const NavBar = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow">
      <Logo />

      <Search />

      {user ? <UserActions user={user} /> : <LoginButton />}
    </header>
  );
};
