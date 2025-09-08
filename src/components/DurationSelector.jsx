import { useLanguage } from "../context/LanguageProvider";

export default function DurationSelector({ selected, onChange }) {
  const { lang } = useLanguage();

  const options = [
    { value: 6, label: { en: "6 Months", ar: "٦ شهور" } },
    { value: 9, label: { en: "9 Months", ar: "٩ شهور" } },
    { value: 12, label: { en: "12 Months", ar: "١٢ شهر" } },
    { value: 18, label: { en: "18 Months", ar: "١٨ شهر" } },
    { value: 24, label: { en: "24 Months", ar: "٢٤ شهر" } },
    { value: 36, label: { en: "36 Months", ar: "٣٦ شهر" } },
  ];

  return (
    <div className="grid grid-cols-3 mb-5 ">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`py-3 text-center font-medium border  transition-all ${
            selected === option.value
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          {option.label[lang]}
        </button>
      ))}
    </div>
  );
}
