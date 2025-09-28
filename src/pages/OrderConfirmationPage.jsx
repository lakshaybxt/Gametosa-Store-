import React, { useEffect, useState } from "react";
import starImg from "../assets/images/Star 1.png"; // adjust path if needed
import { Link } from "react-router-dom";

export default function OrderConfirmationPage() {
  const [tickAnimate, setTickAnimate] = useState(false);

  // Trigger animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => setTickAnimate(true), 100); // small delay for smoothness
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen bg-[#000F14] flex flex-col justify-center items-center px-4">
      {/* Star Image with Tick */}
      <div className="relative w-24 h-24 mb-8">
        {/* Star Image */}
        <img
          src={starImg}
          alt="Star"
          className="w-full h-full object-contain"
        />

        {/* White Circle with Tick */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center overflow-hidden">
            <span
              className={`text-black text-xl font-bold transform transition-transform duration-700 ease-out ${
                tickAnimate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
              }`}
            >
              ✓
            </span>
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-white text-2xl md:text-3xl font-normal font-poppins">
          Congratulations!
        </h1>
        <p className="text-white text-base md:text-lg font-poppins leading-relaxed">
          Your order has been placed.
        </p>
      </div>

      {/* Button */}
      <Link
        to="/trackorder"
        className="mt-12 w-full max-w-xs bg-[#00D2FC] text-[#FBFBFC] font-poppins font-semibold text-lg tracking-wide py-3 px-6 rounded-lg shadow-md hover:bg-[#00b8dc] transition text-center block"
      >
        Track Your Order
      </Link>
    </div>
  );
}
