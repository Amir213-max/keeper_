"use client";
import { useState } from "react";

export default function Sidebar({ categories, onSelectCategory }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <ul className="flex flex-col text-white">
      {categories.map((root) => (
        <li key={root.id} className="border-b border-gray-700">
          <div
            className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800"
            onClick={() => setOpenDropdown(openDropdown === root.id ? null : root.id)}
          >
            {root.name}
            {root.subCategories.length > 0 && (
              <span>{openDropdown === root.id ? "−" : "▼"}</span>
            )}
          </div>

          {openDropdown === root.id && root.subCategories.length > 0 && (
            <ul className="bg-gray-700">
              {root.subCategories.map((sub) => (
                <li
                  key={sub.id}
                  className="px-6 py-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => onSelectCategory(sub.name)}
                >
                  {sub.name}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
