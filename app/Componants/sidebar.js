// Sidebar.js
"use client";

import { useState } from "react";

export default function Sidebar({ categories, onSelectCategory }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const parseName = (name) => {
    try {
      const parsed = JSON.parse(name);
      return parsed.en || parsed.ar || name;
    } catch {
      return name;
    }
  };

  return (
    <ul className="flex flex-col text-white h-[50vh] overflow-y-auto md:h-auto md:overflow-visible">
      {categories.map((root) => (
        <li key={root.id} className="border-b border-gray-700">
          <div
            className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800"
            onClick={() => onSelectCategory(root.id)}
          >
            {parseName(root.name)}
          </div>
        </li>
      ))}
    </ul>
  );
}
