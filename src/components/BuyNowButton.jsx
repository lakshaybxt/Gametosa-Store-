// src/components/buttons/BuyNowButton.jsx
import React from "react";

export default function BuyNowButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 h-[41px] bg-[#00D2FC] text-black font-semibold rounded-lg hover:opacity-90 transition"
    >
      Buy Now
    </button>
  );
}
