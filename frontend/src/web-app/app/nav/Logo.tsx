"use client";

import { IoCarSport } from "react-icons/io5";
import { useParamsStore } from "@/hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";

export const Logo = () => {
  const router = useRouter();
  const pathName = usePathname();
  const reset = useParamsStore((state) => state.reset);

  const handleReset = () => {
    if (pathName !== "/") router.push("/");
    reset();
  };

  return (
    <div
      className="flex items-center gap-2 text-3xl font-semibold cursor-pointer"
      onClick={handleReset}
    >
      <IoCarSport size={34} className="text-amber-600" />
      <div className="text-amber-500">DiveBid</div>
    </div>
  );
};
