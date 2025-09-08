import { useLanguage } from "../context/LanguageProvider";

export default function PriceSummary({ pricing }) {
  const { lang } = useLanguage();

  // Translations
  const t = {
    en: {
      sessions: "NUMBER OF SESSIONS P.M.",
      regularPrice: "REGULAR PRICE",
      yourPrice: "YOUR PRICE",
      discount: "DISCOUNT",
      setupFee: "Setup Fee",
      total: "TOTAL P.M.",
    },
    ar: {
      sessions: "عدد الجلسات شهريًا",
      regularPrice: "السعر العادي",
      yourPrice: "سعرك",
      discount: "خصم",
      setupFee: "رسوم الإعداد",
      total: "الإجمالي شهريًا",
    },
  };

  const labels = t[lang] || t.en;

  return (
    <div className="space-y-3 text-sm text-gray-500 font-semibold">
      <div className="flex justify-between items-center">
        <span>{labels.sessions}</span>
        <span className="font-semibold">{pricing.sessionCount}</span>
      </div>

      <div className="flex justify-between items-center">
        <span>{labels.regularPrice}</span>
        <span className="font-semibold line-through">
          {parseFloat(pricing.basePrice).toFixed(2)}€
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span>{labels.yourPrice}</span>
        <span className="font-semibold">
          {parseFloat(pricing.yourPrice).toFixed(2)}€
        </span>
      </div>

      <div className="flex justify-between items-center border-2 border-x-0 border-t-0 pb-2 border-b-white">
        <span className="text-green-600">
          {labels.discount} {pricing.discountRate}%
        </span>
        <span className="font-semibold text-green-600">
          -{parseFloat(pricing.discount).toFixed(2)}€
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span>{labels.setupFee}</span>
        <span className="font-semibold text-blue-500">0.00€</span>
      </div>

      <div className="flex justify-between items-center font-semibold text-base">
        <span>{labels.total}</span>
        <span className="text-blue-500">
          {parseFloat(pricing.total).toFixed(2)}€
        </span>
      </div>
    </div>
  );
}
