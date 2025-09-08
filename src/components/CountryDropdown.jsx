import { useState } from "react";

function CountryDropdown({ value, onChange }) {
    const countries = [
  { code: "+30", name: "Greece", flag: "https://flagcdn.com/w20/gr.png" },
  { code: "+1", name: "United States", flag: "https://flagcdn.com/w20/us.png" },
  { code: "+44", name: "United Kingdom", flag: "https://flagcdn.com/w20/gb.png" },
  { code: "+49", name: "Germany", flag: "https://flagcdn.com/w20/de.png" },
];

  const [open, setOpen] = useState(false);
  const selected = countries.find((c) => c.name === value) || countries[0];

  return (
    <div className="relative w-full">
      <div
        className="flex items-center gap-2 h-full border-2 border-gray-200 px-3 py-2 rounded-lg bg-gray-100 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <img src={selected.flag} alt={selected.name} className="w-5 h-5" />
        <span className="text-sm">{selected.name}</span>
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-full border bg-white shadow-lg rounded-lg z-10 max-h-60 overflow-y-auto">
          {countries.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(c.name);
                setOpen(false);
              }}
            >
              <img src={c.flag} alt={c.name} className="w-5 h-5" />
              <span className="text-sm">{c.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CountryDropdown;
