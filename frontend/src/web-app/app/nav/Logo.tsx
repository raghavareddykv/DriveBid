"use client";

import { IoCarSport } from "react-icons/io5";
import { useParamsStore } from "@/hooks/useParamsStore";

export const Logo = () => {
  const reset = useParamsStore((state) => state.reset);

  return (
    <div
      className="flex items-center gap-2 text-3xl font-semibold cursor-pointer"
      onClick={reset}
    >
      <IoCarSport size={34} className="text-amber-600" />
      <div className="text-amber-500">DiveBid</div>
    </div>
  );
};
