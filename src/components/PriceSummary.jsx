export default function PriceSummary({ pricing }) {
  return (
    <div className="space-y-3 text-sm text-gray-500 font-semibold">
      <div className="flex justify-between items-center">
        <span>NUMBER OF SESSIONS P.M.</span>
        <span className="font-semibold">{pricing.sessionCount}</span>
      </div>

      <div className="flex justify-between items-center">
        <span>REGULAR PRICE</span>
        <span className="font-semibold line-through">{parseFloat(pricing.basePrice).toFixed(2)}€</span>
      </div>

      <div className="flex justify-between items-center">
        <span>YOUR PRICE</span>
        <span className="font-semibold">{parseFloat(pricing.yourPrice).toFixed(2)}€</span>
      </div>

      <div className="flex justify-between items-center border-2 border-x-0 border-t-0 pb-2 border-b-white">
        <span>
        <span className="text-green-600">DISCOUNT {pricing.discountRate}%</span>
        </span>
        <span className="font-semibold text-green-600">
          -{parseFloat(pricing.discount).toFixed(2)}€
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span>Setup Fee</span>
        <span className="font-semibold text-blue-500">0.00€</span>
      </div>

      <div className="flex justify-between items-center font-semibold text-base">
        <span>TOTAL P.M.</span>
        <span className="text-blue-500">{parseFloat(pricing.total).toFixed(2)}€</span>
      </div>
    </div>
  );
}
