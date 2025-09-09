import { useState } from "react";
import CountryFlag from "react-country-flag";
import countriesData from "world-countries";
import { useLanguage } from "../context/LanguageProvider";

function CountryDropdown({ value, onChange }) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  // Map countriesData to a simpler format
  const countries = countriesData.map((c) => ({
    code: c.cca2, // ISO2 code for flag
    name: {
      en: c.name.common,
      ar: c.translations?.ara?.common || c.name.common, // fallback if Arabic translation missing
    },
  }));

  // Default to UAE if no value
  const defaultCountry = countries.find((c) => c.code === "AE");
  const selected = countries.find((c) => c.code === value) || defaultCountry;

  return (
    <div className="relative w-full">
      {/* Selected country */}
      <div
        className="flex items-center gap-2 h-full border-2 border-gray-200 px-3 py-2 rounded-lg bg-gray-100 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <CountryFlag countryCode={selected.code} svg style={{ width: 20, height: 20 }} />
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
                onChange(c.code);
                setOpen(false);
              }}
            >
              <CountryFlag countryCode={c.code} svg style={{ width: 20, height: 20 }} />
              <span className="text-sm">{c.name[lang]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CountryDropdown;
