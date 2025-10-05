// Sidebar.js
"use client";

import { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import clsx from "clsx";
import { Tag } from "lucide-react";

export default function Sidebar({ categories, onSelectCategory }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const parseName = (name) => {
    try {
      const parsed = JSON.parse(name);
      return parsed.en || parsed.ar || name;
    } catch {
      return name;
    }
  };

  const handleSelect = (id) => {
    setActiveCategory(id);
    onSelectCategory(id);
  };

  return (
    <>
      {/* ✅ Vertical Sidebar للشاشات الكبيرة */}
      <ul className="hidden lg:flex flex-col px-3 py-4 space-y-3 bg-black rounded-xl shadow-sm">
        {categories.map((root) => (
          <li key={root.id}>
            <div
              onClick={() => handleSelect(root.id)}
              className={clsx(
                "flex items-center bg-neutral-900 text-white gap-3 p-4 hover:text-black rounded-lg cursor-pointer transition-all duration-300",
                activeCategory === root.id
                  ? "bg-gradient-to-r from-yellow-300 to-amber-200 text-black font-bold shadow-md"
                  : "bg-gray-50 hover:bg-yellow-50 text-black"
              )}
            >
              <Tag className="w-5 h-5 opacity-60" />
              <span>{parseName(root.name)}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* ✅ Horizontal Slider للشاشات الصغيرة والمتوسطة */}
      <div className="block lg:hidden px-2 py-4 bg-black rounded-xl">
        <Splide
          options={{
            type: "slide",
            perPage: 3,
            perMove: 1,
            arrows: false,
            pagination: false,
            gap: "0.75rem",
            drag: "free",
            autoWidth: true,
          }}
          className="!overflow-hidden"
        >
          {categories.map((cat) => (
            <SplideSlide key={cat.id} className="flex justify-center">
              <div
                onClick={() => handleSelect(cat.id)}
                className={clsx(
                  "px-5 py-3 rounded-xl bg-neutral-900 cursor-pointer transition-all duration-300 ease-in-out text-center shadow-sm whitespace-nowrap",
                  activeCategory === cat.id
                    ? "bg-gradient-to-br from-neutal-200 to-amber-100 text-white font-semibold shadow-md scale-105"
                    : "bg-neutral-900 text-white hover:bg-yellow-50"
                )}
              >
                {parseName(cat.name)}
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
}
