import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMic, FiSearch } from "react-icons/fi";

import filterIcon from "../assets/icons/filter.png"; // custom filter icon
import gamingHeadset1 from "../assets/images/gamingHeadset1.png";
import gamingHeadset2 from "../assets/images/gamingHeadset2.png";

import BottomNav from "../components/BottomNav"; // ✅ use shared BottomNav

// Product data
const products = [
  { id: 1, title: "Stylish Headphone", price: 1499, image: gamingHeadset1 },
  { id: 2, title: "TMA-2 HD Wireless", price: 3500, image: gamingHeadset2 },
  { id: 3, title: "Stylish Headphone Pro", price: 2499, image: gamingHeadset1 },
  { id: 4, title: "Gaming Headset Elite", price: 3999, image: gamingHeadset2 },
  { id: 5, title: "Bass Boost Headphones", price: 1999, image: gamingHeadset1 },
  { id: 6, title: "Wireless Gaming Headset", price: 4299, image: gamingHeadset2 },
];

const SubcategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listening, setListening] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();

  // Active filter states
  const [activeBrand, setActiveBrand] = useState("Logitech");
  const [activeColor, setActiveColor] = useState("White");
  const [activeType, setActiveType] = useState("Wired");

  // Speech recognition
  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setSearchTerm(speechToText);
      navigate("/search", { state: { query: speechToText } });
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  // Apply filters
  const handleApplyFilters = () => {
    console.log("Applied Filters:", { activeBrand, activeColor, activeType });
    setFilterOpen(false);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col relative font-sans">
      {/* Top Header */}
      <div className="px-4 py-4 flex justify-center sticky top-0 bg-gray-900 z-20">
        <h1 className="text-white font-poppins text-[22px] font-normal">
          Category
        </h1>
      </div>

      {/* Search Bar */}
      <div className="relative px-4 mb-4 sticky top-[60px] bg-gray-900 z-20">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          readOnly
          onClick={() => navigate("/search", { state: { query: searchTerm } })}
          className="w-full bg-gray-800 rounded-full py-2 pl-10 pr-12 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm placeholder-gray-500"
        />
        <FiSearch
          className="absolute left-6 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
          size={18}
          onClick={() => navigate("/search", { state: { query: searchTerm } })}
        />
        <FiMic
          className={`absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer ${
            listening ? "animate-[pulse_1.5s_infinite]" : ""
          }`}
          size={18}
          onClick={startSpeechRecognition}
        />
      </div>

      {/* Products Title + Filter */}
      <div className="flex justify-between items-center px-4 mb-4">
        <h2 className="text-white font-poppins text-[20px] font-normal">
          Headsets
        </h2>
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 border border-gray-600 px-3 py-1 rounded-lg hover:border-cyan-400 transition"
        >
          <img src={filterIcon} alt="Filter" className="w-5 h-5" />
          <span className="text-sm">Filter</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="px-4 flex-1 overflow-y-auto pb-24">
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() =>
                navigate(`/product/${product.id}`, { state: { product } })
              }
              className="bg-gray-800 rounded-lg p-3 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-cover rounded mb-3"
              />
              <div className="text-left w-full">
                <h3 className="text-sm font-semibold truncate">
                  {product.title}
                </h3>
                <p className="text-xs text-gray-400 mb-1">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Shared Bottom Navigation */}
      <BottomNav />

      {/* Filter Pop-Up */}
      {filterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-end z-50"
          onClick={() => setFilterOpen(false)}
        >
          <div
            className="bg-gray-900 rounded-t-3xl p-6 w-[92%] h-[70%] max-h-[70%] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
              <h2 className="text-base font-semibold">Filter</h2>
              <button
                className="text-gray-400 text-xl font-light hover:text-white"
                onClick={() => setFilterOpen(false)}
              >
                &times;
              </button>
            </div>

            {/* Filter Options */}
            <div className="space-y-6 mt-6">
              {/* Brand */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Brand</h3>
                <div className="flex gap-3 flex-wrap">
                  {["Logitech", "HyperX", "Boat"].map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setActiveBrand(brand)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        activeBrand === brand
                          ? "bg-cyan-400 text-black"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Color</h3>
                <div className="flex gap-3 flex-wrap">
                  {["White", "Black", "Red"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setActiveColor(color)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        activeColor === color
                          ? "bg-cyan-400 text-black"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Type</h3>
                <div className="flex gap-3 flex-wrap">
                  {["Wired", "Wireless"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        activeType === type
                          ? "bg-cyan-400 text-black"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min Price"
                    className="w-1/2 bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max Price"
                    className="w-1/2 bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-6">
                <button
                  onClick={handleApplyFilters}
                  className="w-full bg-cyan-400 text-black rounded-full py-3 font-semibold hover:bg-cyan-300 transition-colors"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide Up Animation */}
      <style>
        {`
          @keyframes slideUp {
            0% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slideUp { animation: slideUp 0.4s ease-out forwards; }
        `}
      </style>
    </div>
  );
};

export default SubcategoryPage;
