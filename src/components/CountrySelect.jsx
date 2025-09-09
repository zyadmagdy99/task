import { useState } from "react";
import CountryFlag from "react-country-flag";
import { allCountries } from "country-telephone-data";

function CountrySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);

  // Default to UAE if no value provided
  const defaultCountry = allCountries.find((c) => c.iso2 === "ae");

  const selected =
    allCountries.find((c) => c.dialCode === value) || defaultCountry;

  return (
    <div className="relative w-47">
      <div
        className="flex items-center gap-2 h-full px-4 py-3 border-2 border-gray-200 text-sm bg-gray-100 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <CountryFlag
          countryCode={selected.iso2.toUpperCase()}
          svg
          style={{ width: "20px", height: "20px" }}
        />
        <span className="text-sm">{`+${selected.dialCode}`}</span>
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-full border bg-gray-100 shadow-lg rounded-lg z-10 max-h-60 overflow-auto">
          {allCountries.map((c) => (
            <div
              key={c.iso2}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                onChange(c.dialCode);
                setOpen(false);
              }}
            >
              <CountryFlag
                countryCode={c.iso2.toUpperCase()}
                svg
                style={{ width: "20px", height: "20px" }}
              />
              <span className="text-sm">{`+${c.dialCode}`}</span>
              <span className="text-xs text-gray-500">{c.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CountrySelect;
