import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

// Import local images
import keyboardImg from "../assets/images/keyboard.png";
import gamingHeadset1Img from "../assets/images/gamingHeadset1.png";
import gamingHeadset2Img from "../assets/images/gamingHeadset2.png";
import arrowIcon from "../assets/icons/arrow.svg"; // discount arrow
import starIcon from "../assets/images/Star 1.png"; // rating star

const imageMap = {
  "keyboard.png": keyboardImg,
  "gamingHeadset1.png": gamingHeadset1Img,
  "gamingHeadset2.png": gamingHeadset2Img,
};

export default function MyWishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const response = await fetch("/mock/wishlist.json");
        const data = await response.json();

        // Map image names to imported images
        const updatedData = data.map((item) => ({
          ...item,
          image: imageMap[item.image.split("/").pop()] || item.image,
        }));

        setWishlistItems(updatedData);
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlistData();
  }, []);

  const renderRating = (rating = 4.5) => (
    <div className="flex items-center bg-[#00D2FC] rounded-full px-2 py-0.5 text-xs font-medium text-[#01161D] w-fit">
      {rating}
      <img src={starIcon} alt="star" className="ml-1 w-3 h-3" />
    </div>
  );

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#000F14] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#000F14] font-poppins pb-20">
      {/* Header */}
      <div className="flex items-center justify-center relative py-6 border-b border-[#1A2A33]">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 top-1/2 -translate-y-1/2 p-2 rounded-full transition"
        >
          <FiArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-white text-lg sm:text-xl font-medium">
          My Wishlist
        </h1>
      </div>

      {/* Wishlist Items */}
      <div className="px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#01161D] rounded-xl p-3 flex flex-col items-center shadow-md hover:scale-105 transition-transform"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-lg mb-3"
            />
            <div className="text-center w-full">
              <p className="text-white text-sm mb-1">{item.name}</p>
              <div className="flex items-center justify-center gap-2 mb-1 flex-wrap">
                <span className="text-white text-base font-medium">
                  ₹ {Number(item.price).toLocaleString()}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹ {Number(item.oldPrice).toLocaleString()}
                </span>
                <span className="flex items-center text-[#00D2FC] text-xs">
                  <img src={arrowIcon} alt="discount" className="w-3 h-3 mr-1" />
                  {item.discount}%
                </span>
              </div>
              <p className="text-white text-xs mb-1">{item.status}</p>
              {renderRating(item.rating)}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navbar */}
      <BottomNav />
    </div>
  );
}
