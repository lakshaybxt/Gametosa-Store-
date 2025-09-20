import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentMethodPage() {
  const navigate = useNavigate();
  const [orderSummary, setOrderSummary] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPaymentData() {
      try {
        const response = await fetch("/mock/checkoutData.json");
        if (!response.ok) {
          throw new Error("Failed to fetch checkoutData.json");
        }
        const data = await response.json();
        setOrderSummary(data);
        // ✅ Default to first available method if exists
        if (data.paymentMethods?.length > 0) {
          setSelectedPayment(data.paymentMethods[0].id);
        }
      } catch (err) {
        console.error("Error loading payment data", err);
        setError("Unable to load payment details. Please try again later.");
      }
    }
    fetchPaymentData();
  }, []);

  if (error) return <p className="text-red-400 p-6">{error}</p>;
  if (!orderSummary) return <p className="text-white p-6">Loading...</p>;

  const { currency, total, paymentMethods } = orderSummary;

  return (
    <div className="w-full min-h-screen bg-[#000F14] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 py-6 border-b border-gray-700">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="flex-1 text-center text-2xl font-poppins font-normal">
          Checkout
        </h1>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mt-6 px-6">
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-cyan-400 text-cyan-400 text-xs">
            ✓
          </div>
          <span className="mt-1 text-xs">Review</span>
        </div>
        <div className="flex-1 h-[1px] bg-cyan-400 mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 flex items-center justify-center rounded-full border border-cyan-400 text-cyan-400 text-xs">
            2
          </div>
          <span className="mt-1 text-xs">Payment</span>
        </div>
      </div>

      {/* Select Payment Title */}
      <div className="mt-6 px-6 text-lg font-normal">Select payment method</div>

      {/* Payment Options */}
      <div className="flex flex-col gap-4 mt-4 px-6">
        {paymentMethods.map((method) => {
          const isSelected = selectedPayment === method.id;
          return (
            <div
              key={method.id}
              onClick={() => setSelectedPayment(method.id)}
              role="radio"
              aria-checked={isSelected}
              className={`relative bg-[#000F14] border ${
                isSelected ? "border-cyan-400" : "border-white"
              } rounded-lg p-4 flex justify-between items-center cursor-pointer`}
            >
              <div className="flex flex-col">
                <span className="text-xl font-light">{method.name}</span>
                {method.note && (
                  <span className="text-sm text-cyan-400 mt-1">
                    {method.note}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg">
                  {currency} {total}
                </span>
                <div
                  className={`w-5 h-5 rounded-full border ${
                    isSelected ? "bg-cyan-400 border-none" : "border-white"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="mt-auto border-t border-gray-700 flex justify-between items-center px-6 py-4">
        <div>
          <p className="text-lg">
            {currency} {total}
          </p>
          <button className="text-cyan-400 text-sm">View Price Details</button>
        </div>
        <button
          onClick={() => navigate("/orderconfirmation")}
          disabled={!selectedPayment}
          className={`${
            selectedPayment
              ? "bg-cyan-400 cursor-pointer"
              : "bg-gray-500 cursor-not-allowed"
          } text-white font-semibold px-6 py-2 rounded-lg`}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
