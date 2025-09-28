import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Phone,
  Home,
  Grid,
  ShoppingCart,
  User,
  ChevronLeft,
} from "lucide-react";

export default function TrackOrderPage() {
  const [trackData, setTrackData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/mock/trackpackage.json")
      .then((res) => res.json())
      .then((data) => setTrackData(data))
      .catch((err) => console.error("Error loading trackpackage.json:", err));
  }, []);

  // ✅ Always go back to Profile page
  const handleGoBack = () => {
    navigate("/profile");
  };

  const handleCall = (phoneNumber) => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      alert("Phone number for the delivery agent is not available.");
    }
  };

  if (!trackData) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-[#00162E] to-[#01091E] flex items-center justify-center text-white">
        Loading order details...
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#00162E] to-[#01091E] flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-[#00162E] flex items-center px-4 py-4 z-50">
        <button
          onClick={handleGoBack}
          className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="flex-1 text-center text-xl font-semibold text-white">
          Track Order
        </h1>
        <div className="w-10 h-10" />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto mt-20 mb-20 px-0">
        {/* Product Info */}
        <div className="flex flex-col md:flex-row items-center gap-4 bg-[#01091E] p-4 rounded-lg mx-4 shadow">
          <img
            src={trackData.productImage}
            alt="product"
            className="w-28 h-28 rounded-lg border border-cyan-400"
          />
          <div className="flex flex-col gap-1 text-white">
            <h2 className="text-lg font-medium">{trackData.productName}</h2>
            <p className="text-sm text-gray-300">{trackData.color}</p>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">{trackData.discount}%</span>
              <span className="line-through text-gray-400">
                ₹{trackData.oldPrice}
              </span>
              <span className="text-white font-semibold">
                ₹{trackData.newPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Quantity Box */}
        <div className="mx-4 mt-2 border border-cyan-400 bg-black text-white rounded-md px-3 py-2 text-sm w-fit">
          Quantity : <span className="font-semibold">{trackData.quantity}</span>
        </div>

        {/* Tracking Steps */}
        <div className="bg-[#01091E] p-4 rounded-lg mx-4 mt-4 shadow flex flex-col gap-6">
          <h2 className="text-white font-semibold text-lg">Order Status</h2>
          {trackData.steps.map((step, idx) => {
            const isLast = idx === trackData.steps.length - 1;

            return (
              <div key={idx} className="flex gap-3">
                {/* Circle + Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      step.completed
                        ? "bg-green-600 border-green-600"
                        : "border-gray-400"
                    }`}
                  >
                    {step.completed && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    )}
                  </div>
                  {!isLast && (
                    <div
                      className={`flex-1 w-[2px] ${
                        step.completed ? "bg-green-600" : "bg-gray-400"
                      }`}
                    />
                  )}
                </div>

                {/* Text */}
                <div>
                  <p className="text-white font-medium">{step.title}</p>
                  {step.description && (
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  )}
                  {step.timestamp && (
                    <p className="text-gray-400 text-xs">{step.timestamp}</p>
                  )}
                  {step.title === "Out for Delivery" &&
                    trackData.arrivedText && (
                      <p className="text-cyan-400 text-sm mt-1">
                        {trackData.arrivedText}
                      </p>
                    )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery Guy */}
        <div className="bg-[#01091E] p-4 rounded-lg mx-4 mt-4 shadow flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={trackData.deliveryGuy.image}
              alt="Delivery"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-white font-semibold">
                {trackData.deliveryGuy.name}
              </p>
              <p className="text-gray-300 text-sm">
                {trackData.deliveryGuy.role}
              </p>
            </div>
          </div>
          {/* Call button */}
          <button
            onClick={() => handleCall(trackData.deliveryGuy.phone)}
            className="bg-white p-3 rounded-full hover:bg-gray-200 active:scale-95 transition-transform"
          >
            <Phone className="text-black w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-[#01151C] flex justify-around items-center py-3 border-t border-gray-700 z-50">
        <Link to="/home" className="flex flex-col items-center text-white">
          <Home className="w-6 h-6" />
          <span className="text-[10px] mt-1">Home</span>
        </Link>
        <Link to="/category" className="flex flex-col items-center text-white">
          <Grid className="w-6 h-6" />
          <span className="text-[10px] mt-1">Category</span>
        </Link>
        <Link to="/cart" className="flex flex-col items-center text-white">
          <ShoppingCart className="w-6 h-6" />
          <span className="text-[10px] mt-1">Cart</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-cyan-400">
          <User className="w-6 h-6" />
          <span className="text-[10px] mt-1">Me</span>
        </Link>
      </div>
    </div>
  );
}
