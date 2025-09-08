function PaymentMethodOption({ id, value, label, logo, selected, onChange }) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${
        selected === value
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Visible radio button */}
      <input
        type="radio"
        id={id}
        name="paymentMethod"
        value={value}
        checked={selected === value}
        onChange={() => onChange(value)}
        className="w-5 h-5 accent-blue-500"
      />

      {/* Logo + Label */}
      <img src={logo} alt={label} className="w-10 h-10 object-contain" />
      <span className="font-medium">{label}</span>
    </label>
  );
}

export default PaymentMethodOption;