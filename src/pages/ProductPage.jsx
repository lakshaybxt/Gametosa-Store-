import React from "react";
import { useNavigate } from "react-router-dom";

// Centralize imports later in icons/index.js
import heartIcon from "../assets/icons/heart1.svg";
import shareIcon from "../assets/icons/share.svg";
import arrowIcon from "../assets/icons/arrow1.svg"; 
import colorIcon from "../assets/icons/color.svg"; 
import coinIcon from "../assets/icons/coin.png"; 
import starFull from "../assets/icons/star-full.svg"; 
import starHalf from "../assets/icons/star-half.svg"; 
import headsetImage from "../assets/icons/headset1.png"; 

const ProductPage = () => {
  const navigate = useNavigate();

  const product = {
    title: "Stylish Headphone",
    price: 1499,
    originalPrice: 3000,
    discount: 50,
    coins: 10,
    delivery: "Free delivery",
    rating: 4.5,
    reviews: 116,
    deliveryAddress: "Village baddoh tehsil Safidon district",
    pincode: "600058",
    colors: ["Black"], // expandable
  };

  // ⭐ Dynamic star rendering
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <img key={i} src={starFull} alt="Star" className="w-5 h-5 mr-1" />
        ))}
        {halfStar && <img src={starHalf} alt="Half Star" className="w-5 h-5 mr-1" />}
      </>
    );
  };

  return (
    <div className="text-white min-h-screen flex flex-col bg-[#000F14]">
      {/* Main Content */}
      <div className="flex-1 px-4 py-4 md:py-6 pb-20 md:pb-28">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} aria-label="Go back">
            <svg xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-400" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="w-6 h-6" /> {/* Spacer */}
        </div>

        {/* Product Image */}
        <img src={headsetImage} alt={product.title} className="w-full h-auto object-contain mb-4" />

        {/* Title + Icons */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <div className="flex gap-4">
            <img src={heartIcon} alt="Add to wishlist" className="w-6 h-6 cursor-pointer" />
            <img src={shareIcon} alt="Share product" className="w-6 h-6 cursor-pointer" />
          </div>
        </div>

        {/* Price + Discount */}
        <div className="flex items-center">
          <p className="text-xl font-bold text-green-400">
            ₹{product.price.toLocaleString()}
            <span className="text-sm text-gray-400 line-through ml-2">₹{product.originalPrice}</span>
          </p>
          <img src={arrowIcon} alt="Discount arrow" className="w-6 h-6 ml-3" />
          <span className="text-sm text-green-500 ml-1">-{product.discount}%</span>
        </div>

        {/* Coins */}
        <div className="flex items-center mt-2">
          <img src={coinIcon} alt="Coins" className="w-5 h-5 mr-2" />
          <p className="text-yellow-400 text-sm">+{product.coins} Coins on this order</p>
        </div>

        {/* Delivery + Rating */}
        <p className="text-sm text-gray-400 mt-2">{product.delivery}</p>
        <div className="flex items-center mt-2">
          {renderStars(product.rating)}
          <span className="text-sm">({product.reviews} Reviews)</span>
        </div>

        {/* Color Selection */}
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2">Color: {product.colors[0]}</p>
          <div className="flex gap-4">
            {product.colors.map((color, i) => (
              <img key={i} src={colorIcon} alt={`Color ${color}`} className="w-10 h-10" />
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="mt-6 text-sm">
          <p>
            Delivery to: <span className="text-blue-400">{product.pincode}</span>
          </p>
          <p className="text-gray-400">{product.deliveryAddress}</p>
          <button className="mt-2 border border-blue-400 px-3 py-1 rounded text-sm hover:bg-blue-400/20 transition">
            Change
          </button>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex fixed bottom-0 left-0 right-0">
        <button
          onClick={() => navigate("/cart")}
          className="flex-1 text-white py-3 font-semibold bg-[#00D2FC]"
        >
          Add to cart
        </button>
        <button
          className="flex-1 py-3 font-semibold bg-[#01161D] text-[#00D2FC]"
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
