import { useState } from "react";

const countries = [
  { code: "+30", name: "Greece", flag: "https://flagcdn.com/w20/gr.png" },
  { code: "+1", name: "USA", flag: "https://flagcdn.com/w20/us.png" },
  { code: "+44", name: "UK", flag: "https://flagcdn.com/w20/gb.png" },
  { code: "+49", name: "Germany", flag: "https://flagcdn.com/w20/de.png" },
];

function CountrySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = countries.find((c) => c.code === value) || countries[0];

  return (
    <div className="relative w-28 ">
      <div
        className="flex items-center border-r-0 gap-2 h-full px-4 py-3 border-2 border-gray-200 text-sm bg-gray-100 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <img src={selected.flag} alt={selected.name} className="w-5 h-5" />
        <span className="text-sm">{selected.code}</span>
      </div>
      {open && (
        <div className="absolute top-full left-0 h-full  mt-1 w-full border shadow-lg rounded-lg z-10">
          {countries.map((c) => (
            <div
              key={c.code}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(c.code);
                setOpen(false);
              }}
            >
              <img src={c.flag} alt={c.name} className="w-5 h-5" />
              <span className="text-sm">{c.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CountrySelect;
