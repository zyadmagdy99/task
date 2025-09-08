export default function DurationSelector({ selected, onChange }) {
  const options = [
    { value: 6, label: "6 Months" },
    { value: 9, label: "9 Months" },
    { value: 12, label: "12 Months" },
    { value: 18, label: "18 Months" },
    { value: 24, label: "24 Months" },
    { value: 36, label: "36 Months" },
  ];

  return (
    <div className="grid grid-cols-3  mb-5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`py-3  text-center font-medium border-1 transition-all ${
            selected === option.value
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
