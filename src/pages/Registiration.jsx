import React, { useState } from 'react';
import CountrySelect from '../components/CountrySelect';
import CountryDropdown from '../components/CountryDropdown';
import PaymentMethodOption from '../components/PaymentMethodOption';
import DurationSelector from '../components/DurationSelector';
import PayInAdvanceToggle from '../components/PayInAdvanceToggle';
import PriceSummary from '../components/PriceSummary';
import TermsCheckbox from '../components/TermsCheckbox';
import { useLanguage } from '../context/LanguageProvider';
import LanguageSwitcher from '../components/LanguageSwitcher'


const GoStudentBookingForm = () => {
  
  const [formData, setFormData] = useState({
    loginPhone: '',
    loginCountryCode: '+30',
    contactPhone: '',
    contactCountryCode: '+30',
    email: '',
    contactName: '',
    address: '',
    apt: '',
    postalCode: '',
    city: '',
    country: 'Greece',
    sessions: '8',
    paymentMethod: 'sepa',
    cardHolder: '',
    cardNumber: '',
    cardExpiryCvc: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: false
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.loginPhone.trim()) newErrors.loginPhone = true;
    if (!formData.contactPhone.trim()) newErrors.contactPhone = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.contactName.trim()) newErrors.contactName = true;
    if (!formData.address.trim()) newErrors.address = true;
    if (!formData.postalCode.trim()) newErrors.postalCode = true;
    if (!formData.city.trim()) newErrors.city = true;
    if (!formData.country) newErrors.country = true;
    if (!formData.termsAccepted) newErrors.termsAccepted = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = true;
    }

    // Card validation if card payment is selected
    if (formData.paymentMethod === 'card') {
      if (!formData.cardHolder.trim()) newErrors.cardHolder = true;
      if (!formData.cardNumber.trim()) newErrors.cardNumber = true;
      if (!formData.cardExpiryCvc.trim()) newErrors.cardExpiryCvc = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const calculatePricing = () => {
  const sessionCount = parseInt(formData.sessions);
  const basePrice =
    sessionCount === 8
      ? 29.6
      : sessionCount === 4
      ? 35.0
      : sessionCount === 12
      ? 27.5
      : 25.0;

  // 🔹 Dynamic discount rate
  const discountRate = formData.payInAdvance ? 0.09 : 0.04;

  const discount = Number((basePrice * sessionCount * discountRate).toFixed(2));
  const yourPrice = Number((basePrice * (1 - discountRate)).toFixed(2));
  const total = Number((yourPrice * sessionCount).toFixed(2));

  return {
    sessionCount,
    basePrice: basePrice.toFixed(2),
    yourPrice: yourPrice.toFixed(2),
    discount: discount.toFixed(2),
    total: total.toFixed(2),
    discountRate: (discountRate * 100).toFixed(1), // 🔹 Add this!
  };
};


  const submitOrder = async () => {
    if (!validateForm()) {
     
      alert(lang === "ar"
        ? "من فضلك املأ جميع الحقول المطلوبة بشكل صحيح."
        : "Please fill in all required fields correctly.");
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(lang === "ar"
        ? "تم إرسال الطلب بنجاح! ستصلك رسالة تأكيد عبر البريد الإلكتروني قريبًا."
        : "Order submitted successfully! You will receive a confirmation email shortly.");
      setIsProcessing(false);
    }, 2000);
  };

  const pricing = calculatePricing();

  const { lang } = useLanguage();

  const text = {
    en: {
      label: "LOGIN PHONE NUMBER",
      hint: "( preferably the student's )",
      placeholder: "Enter phone number",
            phoneLabel: "CONTACT PHONE NUMBER",
      phoneHint: "( preferably the parent's )",
      phonePlaceholder: "Enter contact number",
      emailLabel: "CONTACT EMAIL ADDRESS",
      emailHint: "( preferably the parent's )",
      emailPlaceholder: "Enter email address",
      nameLabel: "CONTACT NAME",
      namePlaceholder: "Enter full name",
       billing: "BILLING ADDRESS",
      address: "Address",
      nr: "Nr",
      postal: "Postal code",
      city: "City",
      monthly: "MONTHLY SESSIONS",
      sessions: ["4 Sessions", "8 Sessions", "12 Sessions", "16 Sessions"],
      
      
    },
    ar: {
      label: "رقم الهاتف لتسجيل الدخول",
      hint: "( يفضل أن يكون رقم الطالب )",
      placeholder: "أدخل رقم الهاتف",
           phoneLabel: "رقم هاتف للتواصل",
      phoneHint: "( يفضل أن يكون رقم ولي الأمر )",
      phonePlaceholder: "أدخل رقم للتواصل",
      emailLabel: "البريد الإلكتروني للتواصل",
      emailHint: "( يفضل بريد ولي الأمر )",
      emailPlaceholder: "أدخل البريد الإلكتروني",
      nameLabel: "الاسم للتواصل",
      namePlaceholder: "أدخل الاسم بالكامل",
           billing: "عنوان الفاتورة",
      address: "العنوان",
      nr: "رقم",
      postal: "الرمز البريدي",
      city: "المدينة",
      monthly: "الجلسات الشهرية",
      sessions: ["٤ جلسات", "٨ جلسات", "١٢ جلسة", "١٦ جلسة"],
    },
  };

  const t = text[lang] || text.en;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className='flex justify-center mb-3'>

      <LanguageSwitcher/>
      </div>
      <div className="max-w-7xl mx-auto shadow-xl px-4 grid lg:grid-cols-[1fr_400px]">
        {/* Form Section */}
        <div className="bg-white rounded-xl  p-8 " >
         <h1
        className={`text-3xl font-semibold mb-2 text-gray-900 text-center ${
          lang === "ar" ? "leading-relaxed" : ""
        }`}
      >
        {lang === "ar"
          ? "التسجيل والحجز في GoStudent"
          : "Registration & Booking at GoStudent"}
      </h1>

      <p
        className={`text-sm mb-8 text-center ${
          lang === "ar" ? "text-right text-gray-700" : "text-gray-600"
        }`}
      >
        {lang === "ar"
          ? "المنصة الرائدة للدروس الخصوصية عبر الإنترنت"
          : "The leading platform for online tutoring"}
      </p>

  {/* Login Phone */}
<div className="mb-5">
      <label
  className={`block font-medium mb-2 text-xs sm:text-sm md:text-base  text-gray-700/50 ${
    lang === "ar" ? "text-right" : "text-left"
  }`}
>
  {t.label}{" "}
  <span className="text-black">
    {t.hint.includes("student's") ? (
      <>
        ( preferably <span className="underline">student's</span> )
      </>
    ) : t.hint.includes("الطالب") ? (
      <>
        ( يفضل <span className="underline">الطالب</span> )
      </>
    ) : (
      t.hint
    )}
  </span>
</label>


      <div className={`flex ${lang === "ar" ? "" : ""}`}>
        <CountrySelect
          value={formData.loginCountryCode}
          onChange={(val) => handleInputChange("loginCountryCode", val)}
        />

        <input
          type="tel"
            dir={lang === "ar" ? "rtl" : ""}
          value={formData.loginPhone}
          onChange={(e) => handleInputChange("loginPhone", e.target.value)}
          placeholder={t.placeholder}
          className={`flex-1 px-4 py-3 border-2 ${
            lang === "ar" ? "border-r-0" : "border-l-0"
          } bg-gray-100 text-sm focus:outline-none transition-colors ${
            errors.loginPhone
              ? "border-red-500"
              : "border-gray-200 focus:border-blue-500"
          }`}
        />
      </div>
    </div>

 {/* Contact Phone */}
      <div className="mb-5">
        <label
          className={`block font-medium mb-2 text-xs sm:text-sm md:text-base  text-gray-700/50 ${
            lang === "ar" ? "text-right" : "text-left"
          }`}
        >
          {t.phoneLabel}{" "}
          <span className="text-black">
            <span className="underline">{t.phoneHint}</span>
          </span>
        </label>

        <div className={`flex ${lang === "ar" ? "" : ""}`}>
          <CountrySelect
            value={formData.contactCountryCode}
            onChange={(val) => handleInputChange("contactCountryCode", val)}
          />
          <input
            type="tel"
            dir={lang === "ar" ? "rtl" : ""}
            value={formData.contactPhone}
            onChange={(e) => handleInputChange("contactPhone", e.target.value)}
            placeholder={t.phonePlaceholder}
            className={`flex-1 px-4 py-3 border-2 bg-gray-100 text-sm focus:outline-none transition-colors ${
              lang === "ar" ? "border-r-0" : "border-l-0"
            } ${
              errors.contactPhone
                ? "border-red-500"
                : "border-gray-200 focus:border-blue-500"
            }`}
          />
        </div>
      </div>

      {/* Contact Email */}
      <div className="mb-5">
        <label
          className={`block font-medium mb-2 text-xs sm:text-sm md:text-base  text-gray-700/50 ${
            lang === "ar" ? "text-right" : "text-left"
          }`}
        >
          {t.emailLabel}{" "}
          <span className="text-black">
            <span className="underline">{t.emailHint}</span>
          </span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder={t.emailPlaceholder}
          className={`w-full px-4 py-3 border-2 bg-gray-100 rounded-lg text-sm focus:outline-none transition-colors ${
            errors.email
              ? "border-red-500"
              : "border-gray-200 focus:border-blue-500"
          }`}
        />
      </div>

      {/* Contact Name */}
      <div className="mb-5">
        <label
          className={`block font-medium mb-2 text-sm text-gray-400 ${
            lang === "ar" ? "text-right" : "text-left"
          }`}
        >
          {t.nameLabel}
        </label>
        <input
          type="text"
          value={formData.contactName}
          onChange={(e) => handleInputChange("contactName", e.target.value)}
          placeholder={t.namePlaceholder}
          className={`w-full px-4 py-3 border-2 bg-gray-100 rounded-lg text-sm focus:outline-none transition-colors ${
            errors.contactName
              ? "border-red-500"
              : "border-gray-200 focus:border-blue-500"
          }`}
        />
      </div>
          {/* Billing Address */}
  {/* Billing Address */}
      <div className="mb-5">
        <label
          className={`block font-medium mb-2 text-sm text-gray-400 ${
            lang === "ar" ? "text-right" : "text-left"
          }`}
        >
          {t.billing}
        </label>

        <div className={`flex gap-3 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder={t.address}
            className={`w-4/5 px-4 py-3 border-2 bg-gray-100 rounded-lg text-sm focus:outline-none transition-colors mb-3 ${
              errors.address ? "border-red-500" : "border-gray-200 focus:border-blue-500"
            }`}
          />
          <input
            type="text"
            value={formData.apt}
            onChange={(e) => handleInputChange("apt", e.target.value)}
            placeholder={t.nr}
            className="px-4 py-3 border-2 border-gray-200 bg-gray-100 rounded-lg text-sm focus:border-blue-500 focus:outline-none mb-3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={formData.postalCode}
            onChange={(e) => handleInputChange("postalCode", e.target.value)}
            placeholder={t.postal}
            className={`px-4 py-3 border-2 rounded-lg text-sm bg-gray-100 focus:outline-none transition-colors ${
              errors.postalCode
                ? "border-red-500"
                : "border-gray-200 focus:border-blue-500"
            }`}
          />
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder={t.city}
            className={`px-4 py-3 border-2 rounded-lg text-sm bg-gray-100 focus:outline-none transition-colors ${
              errors.city
                ? "border-red-500"
                : "border-gray-200 focus:border-blue-500"
            }`}
          />

          {/* Country dropdown with flags */}
          <CountryDropdown
            value={formData.country}
            onChange={(val) => handleInputChange("country", val)}
          />
        </div>
      </div>

      {/* Monthly Sessions */}
      <div className="mb-5">
        <label
          className={`block font-medium mb-2 text-sm text-gray-400 ${
            lang === "ar" ? "text-right" : "text-left"
          }`}
        >
          {t.monthly}
        </label>
        <select
          value={formData.sessions}
          onChange={(e) => handleInputChange("sessions", e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-lg text-sm focus:border-blue-500 focus:outline-none bg-gray-100"
        >
          {t.sessions.map((s, i) => (
            <option key={i} value={(i + 1) * 4}>
              {s}
            </option>
          ))}
        </select>
      </div>
          {/* Payment Method */}
          <div className="mb-5">
            <label
      className={`block font-medium mb-2 text-sm text-gray-400 ${
        lang === "ar" ? "text-right" : "text-left"
      }`}
    >
      {lang === "ar" ? "اختر طريقة الدفع" : "SELECT PAYMENT METHOD"}
    </label>
            <div className="flex flex-col gap-3 mb-5">
  <PaymentMethodOption
    id="sepa"
    value="sepa"
    logo="https://www.billwerk.plus/wp-content/uploads/2023/01/sepa-direct-debit-payment-method.png"
    selected={formData.paymentMethod}
    onChange={(val) => handleInputChange("paymentMethod", val)}
  />

  <PaymentMethodOption
    id="card"
    value="card"
    label=""
    logo="https://static.vecteezy.com/system/resources/previews/020/975/567/non_2x/visa-logo-visa-icon-transparent-free-png.png"
    selected={formData.paymentMethod}
    onChange={(val) => handleInputChange("paymentMethod", val)}
  />
</div>

          </div>

          {/* Card Details */}
          {formData.paymentMethod === 'card' && (
            <div className="mb-5">
             
              <input
                type="text"
                value={formData.cardHolder}
                onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                placeholder="Cardholder"
                className={`w-full px-4 py-3 border-2 bg-gray-100 rounded-lg text-sm focus:outline-none transition-colors mb-3 ${
                  errors.cardHolder ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
              />
              <div className="grid grid-cols-[1fr_150px] ">
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="Card number"
                  className={`px-4 py-3 border-2 border-r-0 bg-gray-100 text-sm focus:outline-none transition-colors ${
                    errors.cardNumber ? 'border-red-500' : 'border-gray-200 '
                  }`}
                />
               <input
  type="text"
  value={formData.cardExpiryCvc}
  onChange={(e) => {
    let val = e.target.value.replace(/\D/g, ''); // Remove non-digits

    // Limit to max 7 digits (MMYYCVC)
    val = val.slice(0, 7);

    // Format as MM / YY / CVC
    let formatted = '';
    if (val.length <= 2) {
      formatted = val;
    } else if (val.length <= 4) {
      formatted = val.slice(0, 2) + ' / ' + val.slice(2);
    } else {
      formatted = val.slice(0, 2) + ' / ' + val.slice(2, 4) + ' / ' + val.slice(4);
    }

    setFormData({ ...formData, cardExpiryCvc: formatted });
  }}
  placeholder="MM / YY / CVC"
  className={`px-4 py-3 border-2 text-sm bg-gray-100 border-l-0 focus:outline-none transition-colors text-right ${
    errors.cardExpiryCvc ? 'border-red-500' : 'border-gray-200'
  }`}
/>

              </div>
            </div>
          )}
 <p
      className={`text-sm text-gray-400 pt-5 ${
        lang === "ar" ? "text-right" : "text-left"
      }`}
    >
      {lang === "ar"
        ? "مدفوعات آمنة 100%. جميع البيانات مشفرة."
        : "100% secure payments. All data is encrypted."}
    </p>
        </div>

        {/* Order Summary */}
        <div className="flex flex-col justify-between rounded-xl p-8 bg-gray-100 ">
          <div >

    <div
      className={`font-semibold mb-5 text-gray-900 ${
        lang === "ar" ? "text-right" : "text-left"
      }`}
    >
      {lang === "ar" ? "نظرة عامة على الطلب" : "ORDER OVERVIEW"}
    </div>
       <DurationSelector
        selected={formData.duration}
        onChange={(val) => handleInputChange("duration", val)}


            /> {/* pay in advance  */} 
                  <PayInAdvanceToggle
              checked={formData.payInAdvance}
              onChange={(val) => handleInputChange("payInAdvance", val)}
            />

                
                    <PriceSummary pricing={pricing} />


                <button
                  onClick={submitOrder}
                  disabled={isProcessing}
                  className="w-full bg-blue-500 text-white py-4 rounded-lg text-base font-semibold mt-5 hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
 {isProcessing
        ? lang === "ar"
          ? "جارٍ المعالجة..."
          : "Processing..."
        : lang === "ar"
        ? "أكمل الطلب"
        : "Order Now"}                </button>

                {/* Terms */}
      <TermsCheckbox
              checked={formData.termsAccepted}
              error={errors.termsAccepted}
              onChange={(val) => handleInputChange("termsAccepted", val)}
            />          
          </div>
         <div
      className={`text-center mt-5 pt-5 font-semibold border-t border-gray-200 flex justify-center items-end text-sm text-gray-400 ${
        lang === "ar" ? "flex-row-reverse" : ""
      }`}
    >
      <span className="font-semibold">
        {lang === "ar" ? "٩٥٪" : "95%"}
      </span>
      <span className="ml-1">
        {lang === "ar" ? "معدل رضا العملاء!" : "SATISFACTION RATE!"}
      </span>
    </div>
        </div>
      </div>
    </div>
  );
};

export default GoStudentBookingForm;