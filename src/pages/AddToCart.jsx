import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function AddCard() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const handleAddCard = () => {
    // Simple validation
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Please enter a valid 16-digit card number");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      alert("Expiry must be in MM/YY format");
      return;
    }
    if (!/^\d{3,4}$/.test(cvc)) {
      alert("Please enter a valid 3 or 4 digit CVC");
      return;
    }

    // TODO: Replace with API integration
    alert("Card Added!");
    navigate(-1);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#00162E] to-[#01091E] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-700">
        <Link to="/" className="text-white">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="text-white text-xl font-medium">New Card</h1>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-6 px-6 py-6 flex-1 max-w-md mx-auto w-full">
        <p className="text-white text-base">Add Debit or Credit Card</p>

        {/* Card Number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="cardNumber" className="text-white text-sm">
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter your card number"
            maxLength={16}
            className="w-full rounded-lg border border-white/50 bg-[#00142B] px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#00D2FC]"
          />
        </div>

        {/* Expiry Date & CVC */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="expiry" className="text-white text-sm">
              Expiry Date
            </label>
            <input
              id="expiry"
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full rounded-lg border border-white/50 bg-[#00142B] px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#00D2FC]"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="cvc" className="text-white text-sm">
              Security Code
            </label>
            <input
              id="cvc"
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="CVC"
              maxLength={4}
              className="w-full rounded-lg border border-white/50 bg-[#00142B] px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#00D2FC]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:opacity-80"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddCard}
            className="px-4 py-2 rounded-lg bg-[#00D2FC] text-black font-medium hover:opacity-90"
          >
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
}
