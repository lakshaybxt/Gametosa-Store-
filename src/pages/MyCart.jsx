import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";

// ---------- ICONS ----------
const IconBack = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden className={props.className}>
    <path
      d="M15 18l-6-6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconRemove = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      d="M6 7h12M9 7v10m6-10v10M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconStar = ({ half = false, className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    {half ? (
      <>
        <defs>
          <linearGradient id="half" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="52%" stopColor="#FF9700" />
            <stop offset="52%" stopColor="white" />
          </linearGradient>
        </defs>
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
          fill="url(#half)"
        />
      </>
    ) : (
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
        fill="#FF9700"
      />
    )}
  </svg>
);

// ---------- SMALL UTIL ----------
const Currency = ({ value }) => (
  <span className="font-[Inter]">₹ {value.toLocaleString("en-IN")}</span>
);

// ---------- CART ITEM ----------
const CartItem = ({ item, onRemove, onWishlist, onBuyNow, activeButton, setActiveButton }) => {
  const { id, img, title, color, rating, discount, oldPrice, price } = item;

  return (
    <div className="bg-[#01091E] shadow-md rounded-lg md:rounded-xl mb-4">
      <div className="p-4 grid grid-cols-[108px_1fr] gap-4">
        <img
          src={img}
          alt={title}
          className="w-[108px] h-[108px] rounded-[10px] border border-[rgba(58,183,255,0.70)] object-cover"
        />
        <div className="flex flex-col gap-1">
          <div className="text-white text-[16px] md:text-[20px] lg:text-[22px] font-[Poppins] leading-tight">
            {title}
          </div>
          <div className="text-white/60 text-sm md:text-base">{color}</div>

          <div className="flex items-center gap-2">
            <span className="text-white text-sm md:text-base">{rating}</span>
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <IconStar key={i} className="w-4 h-4 md:w-5 md:h-5" />
              ))}
              <IconStar half className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-[#00D2FC] text-sm md:text-base">{discount}%</span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <div className="text-white/60 text-sm md:text-lg line-through decoration-[#999598]">
              <Currency value={oldPrice} />
            </div>
            <div className="text-[#FCFCFC] text-base md:text-xl font-[Inter]">
              <Currency value={price} />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons with desktop + mobile click/tap handling */}
      <div className="grid grid-cols-3 divide-x divide-[#154B67]">
        {["remove", "wishlist", "buy"].map((btnType) => {
          const isActive = activeButton === `${btnType}-${id}`;
          const label =
            btnType === "remove" ? "Remove" : btnType === "wishlist" ? "Add to Wishlist" : "Buy Now";

          return (
            <button
              key={btnType}
              onMouseDown={() => setActiveButton(`${btnType}-${id}`)}
              onMouseUp={() => setActiveButton(null)}
              onMouseLeave={() => setActiveButton(null)}
              onTouchStart={() => setActiveButton(`${btnType}-${id}`)}
              onTouchEnd={() => setActiveButton(null)}
              onClick={() => {
                if (btnType === "remove") onRemove(id);
                else if (btnType === "wishlist") onWishlist(item);
                else onBuyNow(item);
              }}
              className={`flex items-center justify-center gap-2 h-[41px] w-full bg-[#000F14] text-white text-xs md:text-sm 
                          hover:bg-cyan-400 transition-colors duration-150 active:scale-95
                          ${isActive ? "bg-cyan-400 text-black" : ""}`}
            >
              {btnType === "remove" && <IconRemove className="w-4 h-4 md:w-5 md:h-5" />}
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ---------- MAIN PAGE ----------
export default function MyCart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([
    { id: 1, img: "src/assets/images/keyboard.png", title: "Stylish Headphones", color: "Black", rating: 4.5, discount: 50, oldPrice: 3000, price: 1499 },
    { id: 2, img: "src/assets/images/gamingHeadset2.png", title: "Gametosa Premium Watch", color: "Silver", rating: 4.2, discount: 30, oldPrice: 5000, price: 3499 },
    { id: 3, img: "src/assets/images/keyboard.png", title: "Gaming Mouse", color: "Black", rating: 4.7, discount: 20, oldPrice: 2000, price: 1599 },
    { id: 4, img: "src/assets/images/gamingHeadset1.png", title: "Gaming Mouse", color: "Black", rating: 4.7, discount: 20, oldPrice: 2000, price: 1599 },
    { id: 5, img: "src/assets/images/keyboard.png", title: "Gaming Mouse", color: "Black", rating: 4.7, discount: 20, oldPrice: 2000, price: 1599 },
  ]);

  const [activeButton, setActiveButton] = useState(null);

  const handleRemove = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const handleWishlist = (item) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push(item);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    navigate("/wishlist");
  };
  const handleBuyNow = (item) => {
    localStorage.setItem("buyNowProduct", JSON.stringify(item));
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen w-full bg-[#01091E] text-white pb-20">
      <div className="mx-auto w-full max-w-[402px] md:max-w-[900px] lg:max-w-[1200px] min-h-screen flex flex-col px-2 md:px-6">
        {/* header fixed */}
        <header className="h-[100px] md:h-[140px] w-full bg-[#01091E] flex items-center px-5 fixed top-0 left-0 z-10">
          <button
            className="w-9 h-9 md:w-11 md:h-11 grid place-items-center mr-4"
            onClick={() => navigate("/home")}
          >
            <IconBack className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-[25px] pl-28 md:text-[28px] lg:text-[32px] font-[Poppins]">My Cart</h1>
        </header>

        {/* cart items scrollable */}
        <main className="flex-1 overflow-y-auto mt-[100px] md:mt-[140px]">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onWishlist={handleWishlist}
                onBuyNow={handleBuyNow}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
              />
            ))
          )}
        </main>
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
