"use client";

import { GoSearch } from "react-icons/go";
import { useParamsStore } from "@/hooks/useParamsStore";
import { ChangeEvent, useEffect, useState } from "react";

const Search = () => {
  const setParams = useParamsStore((state) => state.setParams);
  const searchTerm = useParamsStore((state) => state.searchTerm);
  const [value, setValue] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (searchTerm === "") setValue("");
  }, [searchTerm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    setParams({ searchTerm: value });
  };

  return (
    <div className="flex w-[50%] items-center border border-gray-300 rounded-full py-2">
      <input
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        onChange={handleChange}
        value={value}
        type="text"
        placeholder="Search for cars by make, model or color"
        className="input-custom"
      />
      <button onClick={handleSearch}>
        <GoSearch
          size={34}
          className="bg-amber-500 text-white rounded-full p-2 cursor-pointer mx-2"
        />
      </button>
    </div>
  );
};

export default Search;
