import { useLanguage } from "../context/LanguageProvider";

export default function TermsCheckbox({ checked, error, onChange }) {
  const { lang } = useLanguage();

  const text = {
    en: {
      beforeLink: "I accept the",
      terms: "Terms & Conditions",
      middle: "and understand my",
      withdrawal: "right of withdrawal",
      after: "as well as the circumstances that lead to a repeal of the same.",
    },
    ar: {
      beforeLink: "أوافق على",
      terms: "الشروط والأحكام",
      middle: "وأفهم",
      withdrawal: "حق السحب",
      after: "وكذلك الظروف التي تؤدي إلى إلغائه.",
    },
  };

  const t = text[lang] || text.en;

  return (
    <div className="flex items-start gap-3 my-8">
      <input
        type="checkbox"
        id="terms"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`mt-1 ${error ? "accent-red-500" : "accent-blue-500"}`}
      />
      <label
        htmlFor="terms"
        className={`text-xs text-gray-600 leading-relaxed cursor-pointer ${
          lang === "ar" ? "text-right" : "text-left"
        }`}
      >
        {t.beforeLink}{" "}
        <a href="#" className="text-blue-500 hover:underline">
          {t.terms}
        </a>{" "}
        {t.middle}{" "}
        <span className="text-blue-500 hover:underline">{t.withdrawal}</span>{" "}
        {t.after}
      </label>
    </div>
  );
}
