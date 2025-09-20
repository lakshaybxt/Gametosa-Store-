import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiHeart, FiBell, FiMic, FiSearch } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

// Assets
import ellipseIcon from "../assets/icons/Ellipse 27.svg";
import vrBanner from "../assets/images/vr-banner.png";
import promoImage1 from "../assets/images/promo-banner.png";
import promoImage2 from "../assets/images/promo-banner2.png";
import promoImage3 from "../assets/images/promo-banner3.png";
import promoImage4 from "../assets/images/promo-banner4.png";

// Category icons
import headsetIcon from "../assets/icons/headset.png";
import keyboardIcon from "../assets/icons/keyboard.png";
import mouseIcon from "../assets/icons/mouse.png";
import screenIcon from "../assets/icons/screen.png";
import remoteIcon from "../assets/icons/remote.png";

// Product images for the "Best Products" and "Hot Deals" sections
import headsetProduct from "../assets/icons/placeholder_headset.png"; 
import mouseProduct from "../assets/icons/placeholder_mouse.png"; 

// New assets for the reviews section
import davidLeeIcon from "../assets/icons/Ellipse 27.svg"; 
import logo from "../assets/images/logo.png"

// Shared BottomNav
import BottomNav from "../components/BottomNav";

const categories = [
  { id: 1, name: "Headsets", icon: headsetIcon, route: "/subcategory" },
  { id: 2, name: "Keyboards", icon: keyboardIcon, route: "/subcategory/keyboards" },
  { id: 3, name: "Mouse", icon: mouseIcon, route: "/subcategory/mouse" },
  { id: 4, name: "PC", icon: screenIcon, route: "/subcategory/pc" },
  { id: 5, name: "Remote", icon: remoteIcon, route: "/subcategory/remote" },
];

const promoImages = [promoImage1, promoImage2, promoImage3, promoImage4];

const bestProducts = [
  {
    id: 1,
    name: "Gaming Headphone",
    image: headsetProduct,
    rating: 5,
  },
  {
    id: 2,
    name: "Gaming Mouse",
    image: mouseProduct,
    rating: 5,
  },
];

const hotDeals = [
  {
    id: 1,
    name: "Pro Gaming Headset",
    originalPrice: "₹2999",
    discountedPrice: "₹1799",
    image: headsetProduct,
  },
  {
    id: 2,
    name: "Pro Gaming Headset",
    originalPrice: "₹2999",
    discountedPrice: "₹1799",
    image: headsetProduct,
  },
  {
    id: 3,
    name: "Pro Gaming Headset",
    originalPrice: "₹2999",
    discountedPrice: "₹1799",
    image: headsetProduct,
  },
  {
    id: 4,
    name: "Pro Gaming Headset",
    originalPrice: "₹2999",
    discountedPrice: "₹1799",
    image: headsetProduct,
  },
];

const reviews = [
  {
    id: 1,
    user: "David Lee",
    client: "Client",
    text: "I've been gaming for as long as I can remember, and I've always loved the sense of escape and adventure that it provides.",
    rating: 4.5,
    icon: davidLeeIcon,
  },
  {
    id: 2,
    user: "Jane Doe",
    client: "Client",
    text: "Amazing products! The quality and design are top-notch. I highly recommend this store to all my friends.",
    rating: 5,
    icon: davidLeeIcon,
  },
  {
    id: 3,
    user: "John Smith",
    client: "Client",
    text: "Fast shipping and excellent customer service. The gaming headset I bought is fantastic. Will definitely be a returning customer.",
    rating: 4.5,
    icon: davidLeeIcon,
  },
  {
    id: 4,
    user: "Emily Chen",
    client: "Client",
    text: "The website is easy to navigate and the prices are great. I found exactly what I was looking for and the checkout process was smooth.",
    rating: 5,
    icon: davidLeeIcon,
  },
];

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(8700);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const reviewsRef = useRef(null);
  const navigate = useNavigate();

  // Promo carousel auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % promoImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Hot deals timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const remainingSeconds = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${remainingSeconds}`;
  };
  
  // 🔹 New auto-scroll logic for reviews carousel
  useEffect(() => {
    const container = reviewsRef.current;
    if (!container) return;

    const cards = Array.from(container.children[0].children);
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = 16; // Based on `space-x-4` which is 16px in Tailwind CSS

    const autoScroll = setInterval(() => {
      setActiveReviewIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % reviews.length;
        const nextScrollPosition = nextIndex * (cardWidth + gap);

        container.scrollTo({
          left: nextScrollPosition,
          behavior: 'smooth'
        });

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [reviews.length]);

  // 🔹 Reviews carousel scroll listener to sync dots on manual scroll (kept for manual scrolling)
  useEffect(() => {
    const reviewsElement = reviewsRef.current;
    if (!reviewsElement) return;

    const cards = Array.from(reviewsElement.children[0].children);
    const options = {
      root: null, // Use the viewport as the root element
      rootMargin: '0px -50% 0px -50%', // Create a 'hot zone' in the center
      threshold: 0, // We only need to know if it enters the 'hot zone'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const visibleIndex = cards.findIndex(card => card === entry.target);
          if (visibleIndex !== -1) {
            setActiveReviewIndex(visibleIndex);
          }
        }
      });
    }, options);

    cards.forEach(card => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <div className="text-white min-h-screen flex flex-col bg-[#000F14]">
      {/* 🔹 Header Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#02162E] border-b border-gray-700">
        <div className="max-w-6xl w-full mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <img
                src={ellipseIcon}
                alt="User"
                className="w-10 h-10 rounded-full border border-gray-600"
              />
              <h1 className="text-lg font-bold">User Name</h1>
            </div>
            <div className="flex items-center gap-4">
              <FiHeart
                onClick={() => navigate("/wishlist")}
                className="w-5 h-5 cursor-pointer hover:text-cyan-400 transition"
              />
              <FiBell
                onClick={() => navigate("/notifications")}
                className="w-5 h-5 cursor-pointer hover:text-cyan-400 transition"
              />
            </div>
          </div>

          <div className="mb-3">
            <div
              onClick={() => navigate("/search")}
              className="flex items-center bg-gray-800 rounded-full px-3 py-2 w-full cursor-pointer hover:bg-gray-700 transition"
            >
              <FiSearch className="w-5 h-5 text-gray-400" />
              <span className="flex-1 px-3 text-sm text-gray-400">Search</span>
              <FiMic className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-[130px] pb-24">
        <div className="max-w-6xl w-full mx-auto px-4">
          {/* VR Banner */}
          <div
            className="mt-6 relative cursor-pointer rounded-md overflow-hidden group"
            onClick={() => navigate("/category")}
          >
            <img
              src={vrBanner}
              alt="VR Banner"
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 max-w-[70%] md:max-w-[50%]">
              <h2 className="text-2xl md:text-4xl font-bold leading-snug">
                <span style={{ background: "linear-gradient(to right, rgba(0,210,252,1), rgba(210,0,242,1))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Best Pro Gaming
                </span>{" "}
                <span className="text-white">Accessories</span>
              </h2>
              <p className="text-gray-300 text-sm md:text-base mt-2">
                Gaming accessories include controllers, headsets, charging stations & more.
              </p>
              <div className="flex gap-3 mt-4 flex-nowrap overflow-x-auto">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("/subcategory"); }}
                  className="border border-cyan-400 px-4 py-2 rounded-md font-semibold text-sm hover:bg-cyan-400 hover:text-black transition flex-shrink-0"
                >
                  Show Products
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("/subcategory"); }}
                  className="bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 rounded-md font-semibold text-sm hover:opacity-90 transition flex-shrink-0"
                >
                  Show Collection
                </button>
              </div>
            </div>
          </div>

          {/* 🔹 Promo Carousel */}
          <div className="mt-6 overflow-hidden rounded-md">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {promoImages.map((img, index) => (
                <div
                  key={index}
                  className="relative w-full flex-shrink-0 cursor-pointer group"
                  onClick={() => navigate(`/promo/${index + 1}`)}
                >
                  <img src={img} alt={`Promo ${index + 1}`} className="w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
              ))}
          </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center pt-4 gap-2">
            {promoImages.map((_, i) => (
              <div
                key={i}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-cyan-400 w-6" : "bg-gray-600 w-2.5"}`}
              ></div>
            ))}
          </div>

          {/* 🔹 Categories */}
          <h3 className="text-lg md:text-xl font-bold text-left mt-8">Categories</h3>
          <div className="mt-4 flex justify-between items-center overflow-x-auto gap-4 pb-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={cat.route}
                className="flex flex-col items-center p-2 rounded-md hover:bg-cyan-500/20 cursor-pointer flex-shrink-0 transition-colors"
              >
                <img src={cat.icon} alt={cat.name} className="w-12 h-12 object-contain" />
                <p className="text-xs mt-1">{cat.name}</p>
              </Link>
            ))}
          </div>

          {/* 🔹 Best Products Section */}
          <div className="mt-8 pb-2">
            <h3 className="text-lg md:text-xl font-bold text-left">
              <span style={{ background: "linear-gradient(to right, rgba(0,210,252,1), rgba(210,0,242,1))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Best Pro Gaming
              </span>{" "}
              <span className="text-white">Products</span>
            </h3>
            <div className="flex gap-4 mt-4 overflow-x-auto pb-4 custom-scrollbar">
              {bestProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-44 bg-[#0A1D37] rounded-lg p-4 text-center cursor-pointer transition-transform duration-200 hover:scale-105"
                >
                  <img src={product.image} alt={product.name} className="w-full h-32 object-contain mb-2" />
                  <p className="text-sm font-semibold truncate">{product.name}</p>
                  <div className="flex justify-center text-yellow-400 text-sm mt-1">
                    {'★'.repeat(product.rating)}
                    {'☆'.repeat(5 - product.rating)}
                  </div>
                  <button className="w-full mt-3 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 hover:opacity-90 transition">
                    Add to cart
                  </button>
                </div>
              ))}
          </div>
          
          {/* 🔹 Hot Deals Section */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔥</span>
              <h3 className="text-xl md:text-2xl font-bold text-left">
                <span style={{ background: "linear-gradient(to right, rgba(0,210,252,1), rgba(210,0,242,1))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Hot Deals
                </span>{" "}
                <span className="text-white">for You</span>
              </h3>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Grab the best accessories at unbeatable prices!
          </p>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-xs text-gray-500">Deal ends in</p>
            <div className="text-lg font-bold">
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-2">
            {hotDeals.map((deal) => (
              <div
                key={deal.id}
                className="relative bg-[#0A1D37] rounded-lg p-3 text-center cursor-pointer transition-transform duration-200 hover:scale-105"
              >
                <span className="absolute top-2 left-2 bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  -40% OFF
                </span>
                <img src={deal.image} alt={deal.name} className="w-full h-24 object-contain" />
                <p className="text-sm font-semibold mt-2 truncate">{deal.name}</p>
                <div className="flex justify-center items-center mt-1">
                  <span className="text-gray-500 text-xs line-through">{deal.originalPrice}</span>
                  <span className="text-lg font-bold ml-2">{deal.discountedPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 🔹 Reviews Section */}
      <div className="mt-8">
        <h3 className="text-lg md:text-xl font-bold text-left mb-4">Reviews</h3>
        <div
          className="overflow-x-scroll pb-4 hide-scrollbar snap-x snap-mandatory"
          ref={reviewsRef}
        >
          <div className="flex space-x-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 bg-[#0A1D37] p-6 rounded-lg shadow-lg snap-center"
              >
                <h4 className="text-lg font-bold mb-2">One Time Level!</h4>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.icon}
                    alt={review.user}
                    className="w-12 h-12 rounded-full border-2 border-cyan-400"
                  />
                  <div>
                    <p className="font-semibold">{review.user}</p>
                    <p className="text-gray-400 text-sm">{review.client}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  {review.text}
                </p>
                <div className="flex items-center text-yellow-400">
                  {'★'.repeat(Math.floor(review.rating))}
                  {review.rating % 1 !== 0 && <span className="text-gray-500 text-sm">½</span>}
                  {'☆'.repeat(5 - Math.ceil(review.rating))}
                  <span className="ml-2 text-white font-bold">{review.rating} / 5.0</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dots that reflect the current scroll position */}
      <div className="flex justify-center items-center pt-4 gap-2">
        {reviews.map((_, index) => (
          <div
            key={index}
            className={`h-2.5 rounded-full transition-all duration-300 ${index === activeReviewIndex ? "bg-cyan-400 w-6" : "bg-gray-600 w-2.5"}`}
          ></div>
        ))}
      </div>
    </div>
    
    {/* 🔹 GAMETOSA Footer */}
    <div className="mt-8 text-center pt-8 border-t border-gray-700">
      <div className="flex justify-center items-center gap-2 mb-4">
        <img src={logo} alt="Gametosa Logo" className="w-30 md:w-32" />
      </div>
      <h4 className="text-xl font-normal mb-2">Reach Out & Let Your Mind Explore</h4>
      <div className="text-gray-400 text-sm space-y-2 mb-6">
        <Link to="/about" className="block">About Us</Link>
        <Link to="/contact" className="block">Contact With Us</Link>
        <Link to="/privacy" className="block">Privacy Policy</Link>
        <Link to="/terms" className="block">Terms & Conditions</Link>
      </div>
      {/* Custom Social Icons */}
      <div className="flex justify-center gap-6 text-2xl text-gray-400 ">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
          <FaFacebookF />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
          <FaInstagram />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
          <FaYoutube />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
          <FaTwitter />
        </a>
      </div>
    </div>
  </div>
  <BottomNav />
</div>
</div>
</div>
  );
};

export default HomePage;