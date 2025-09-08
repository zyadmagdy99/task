import { useState } from "react";
import { useLanguage } from "../context/LanguageProvider";

function CountryDropdown({ value, onChange }) {
  const { lang } = useLanguage();

  // Store translations for each country
  const countries = [
    {
      code: "+30",
      name: { en: "Greece", ar: "اليونان" },
      flag: "https://flagcdn.com/w20/gr.png",
    },
    {
      code: "+1",
      name: { en: "United States", ar: "الولايات المتحدة" },
      flag: "https://flagcdn.com/w20/us.png",
    },
    {
      code: "+44",
      name: { en: "United Kingdom", ar: "المملكة المتحدة" },
      flag: "https://flagcdn.com/w20/gb.png",
    },
    {
      code: "+49",
      name: { en: "Germany", ar: "ألمانيا" },
      flag: "https://flagcdn.com/w20/de.png",
    },
  ];

  const [open, setOpen] = useState(false);

  // Selected country based on code or fallback to first
  const selected =
    countries.find((c) => c.code === value) || countries[0];

  return (
    <div className="relative w-full">
      {/* Selected country */}
      <div
        className="flex items-center gap-2 h-full border-2 border-gray-200 px-3 py-2 rounded-lg bg-gray-100 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <img src={selected.flag} alt={selected.name[lang]} className="w-5 h-5" />
        <span className="text-sm">{selected.name[lang]}</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full border bg-white shadow-lg rounded-lg z-10 max-h-60 overflow-y-auto">
          {countries.map((c) => (
            <div
              key={c.code}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(c.code); // return code instead of name
                setOpen(false);
              }}
            >
              <img src={c.flag} alt={c.name[lang]} className="w-5 h-5" />
              <span className="text-sm">{c.name[lang]}</span>
              <span className="ml-auto text-xs text-gray-500">{c.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CountryDropdown;
