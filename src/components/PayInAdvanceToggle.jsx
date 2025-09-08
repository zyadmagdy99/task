import React from "react";

export default function PayInAdvanceToggle({ checked, onChange }) {
  return (
    <label className="flex items-center cursor-pointer gap-3 py-6">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
          checked ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
      <span
        className={`text-sm font-medium transition-colors ${
          checked ? "text-green-700" : "text-gray-600"
        }`}
      >
        Pay in advance • EXTRA 5% DISCOUNT
      </span>
    </label>
  );
}
