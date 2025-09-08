export default function TermsCheckbox({ checked, error, onChange }) {
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
        className="text-xs text-gray-600 leading-relaxed cursor-pointer"
      >
        I accept the{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Terms & Conditions
        </a>{" "}
        and understand my <span className="text-blue-500 hover:underline">right of withdrawal</span> as well as the circumstances that lead to a repeal of the same.
      </label>
    </div>
  );
}
