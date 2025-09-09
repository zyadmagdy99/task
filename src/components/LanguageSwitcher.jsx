// src/components/LanguageSwitcher.jsx
import { useState } from "react";
import { useLanguage } from "../context/LanguageProvider";

const languages = [
  { code: "ar", label: "العربية", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/960px-Flag_of_the_United_Arab_Emirates.svg.png" },
  { code: "en", label: "English", flag: "https://flagcdn.com/w20/gb.png" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div className="relative w-40">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none"
      >
        <span className="flex items-center gap-2">
          <img src={currentLang.flag} alt="" className="w-5 h-5 rounded-sm" />
          {currentLang.label}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 ${
                lang === l.code ? "bg-gray-50 font-semibold" : ""
              }`}
            >
              <img src={l.flag} alt="" className="w-5 h-5 rounded-sm" />
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
