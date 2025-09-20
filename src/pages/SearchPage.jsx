import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Import your own icons
import backIcon from "../assets/icons/arrow.svg"; // back arrow
import searchIcon from "../assets/icons/search1.svg";
import micIcon from "../assets/icons/vector2.svg";
import clockIcon from "../assets/icons/clock.svg";
import starIcon from "../assets/icons/star-full.svg";
// import closeIcon from "../assets/icons/close.svg"; // close icon

// Example product images
import headphoneIcon from "../assets/icons/headset5.png";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const recognitionRef = useRef(null);
  const searchInputRef = useRef(null);

  // Example data
  const recentSearches = ["Headphone", "Mouse", "Gaming Keyboard", "VR Headset"];
  const suggested = [
    "Headphone",
    "Mouse",
    "Speaker",
    "Controller",
    "Keyboard",
    "Chair",
    "Headset",
    "Gaming Monitor",
    "Mechanical Keyboard",
    "RGB Mousepad",
  ];
  const products = [
    {
      id: 1,
      name: "TMA-2 Comfort Wireless",
      price: 270,
      rating: 4.6,
      reviews: 86,
      image: headphoneIcon,
      category: "Headphone",
    },
    {
      id: 2,
      name: "TMA-2 DJ Pro",
      price: 320,
      rating: 4.8,
      reviews: 124,
      image: headphoneIcon,
      category: "Headphone",
    },
    {
      id: 3,
      name: "TMA-2 Move Wireless",
      price: 230,
      rating: 4.4,
      reviews: 67,
      image: headphoneIcon,
      category: "Headphone",
    },
    {
      id: 4,
      name: "Razer Gaming Mouse",
      price: 89,
      rating: 4.7,
      reviews: 215,
      image: headphoneIcon,
      category: "Mouse",
    },
    {
      id: 5,
      name: "Mechanical RGB Keyboard",
      price: 129,
      rating: 4.9,
      reviews: 189,
      image: headphoneIcon,
      category: "Keyboard",
    },
  ];

  // Voice recognition setup
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        filterProducts(transcript);
        setShowResults(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Focus search input on component mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Voice recognition error:", error);
      }
    }
  };

  const filterProducts = (query) => {
    if (!query.trim()) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    filterProducts(value);
    setShowResults(value.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredProducts([]);
    setShowResults(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSmoothNavigate = (path) => {
    document.querySelector(".search-container").style.opacity = "0";
    setTimeout(() => navigate(path), 300);
  };

  const selectRecentSearch = (term) => {
    setSearchQuery(term);
    filterProducts(term);
    setShowResults(true);
  };

  return (
    <motion.div
      className="search-container min-h-screen px-4 py-4 transition-opacity duration-300"
      style={{ backgroundColor: "rgba(1, 22, 46, 1)" }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-md hover:bg-cyan-900/30 transition-all"
        >
          <img src={backIcon} alt="Back" className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold items-center ml-7 text-white">
          Search
        </h2>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="relative flex items-center rounded-xl border border-cyan-500/30 px-3 py-2 mb-5 bg-gray-800/40 backdrop-blur-sm shadow-[0_0_15px_rgba(0,210,252,0.2)]"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <img
          src={searchIcon}
          alt="Search"
          className="w-5 h-5 mr-2 filter brightness-125"
        />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search gaming gear..."
          className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400 text-white"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleSearchSubmit}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="p-1 rounded-full hover:bg-gray-700/50 transition-all mx-1"
          >
            <img src={closeIcon} alt="Clear" className="w-4 h-4" />
          </button>
        )}
        <div
          className={`p-2 rounded-full ml-1 cursor-pointer transition-all ${
            isListening ? "animate-pulse bg-red-500" : "hover:bg-cyan-900/30"
          }`}
          onClick={toggleListening}
        >
          <img
            src={micIcon}
            alt="Mic"
            className="w-5 h-5 filter brightness-125"
          />
        </div>
      </motion.div>

      {/* Search Results */}
      {showResults && (
        <motion.div
          className="mb-6 transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-sm mb-3 font-medium text-cyan-300">
            Search Results ({filteredProducts.length})
          </p>

          {filteredProducts.length > 0 ? (
            <div className="space-y-3">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="flex items-center p-3 rounded-xl bg-gray-800/40 border border-cyan-500/10 cursor-pointer transition-all hover:border-cyan-400/30 hover:shadow-[0_0_15px_rgba(0,210,252,0.2)]"
                  onClick={() => handleSmoothNavigate(`/product/${product.id}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white rounded-lg flex items-center justify-center w-16 h-16 mr-3 p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{product.name}</p>
                    <p className="text-sm text-cyan-300">USD {product.price}</p>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                      <img
                        src={starIcon}
                        alt="Star"
                        className="w-4 h-4 mr-1"
                      />
                      {product.rating} ({product.reviews} Reviews)
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-cyan-400 p-2 rounded-full hover:bg-gray-700/50 transition-all">
                    ⋮
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">
                No products found for "{searchQuery}"
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Try different keywords
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Recent Searches */}
      {!showResults && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-sm mb-3 font-medium">
            <span className="text-cyan-400">Recent </span>
            <span className="text-purple-400">Search</span>
          </p>
          <div className="space-y-2">
            {recentSearches.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-800/40 border border-cyan-500/10 cursor-pointer transition-all hover:border-cyan-400/30 hover:shadow-[0_0_10px_rgba(0,210,252,0.1)]"
                onClick={() => selectRecentSearch(item)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="flex items-center">
                  <img
                    src={clockIcon}
                    alt="Clock"
                    className="w-4 h-4 mr-3 filter brightness-125"
                  />
                  <span className="text-gray-300">{item}</span>
                </div>
                <button className="text-gray-500 hover:text-cyan-400 p-1 rounded-full hover:bg-gray-700/50 transition-all">
                  →
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Suggested Searches */}
      {!showResults && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-sm mb-3 font-medium">
            <span className="text-cyan-400">You Might Want </span>
            <span className="text-purple-400">To Search</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {suggested.map((item, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-2 border border-cyan-500/30 rounded-xl text-sm cursor-pointer transition-all hover:bg-cyan-900/30 hover:border-cyan-400/50 hover:shadow-[0_0_10px_rgba(0,210,252,0.2)]"
                style={{ color: "rgba(200, 200, 210, 1)" }}
                onClick={() => selectRecentSearch(item)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * idx }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Popular Products */}
      {!showResults && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-sm mb-3 font-medium">
            <span className="text-cyan-400">Popular </span>
            <span className="text-purple-400">Products</span>
          </p>
          <div className="space-y-4">
            {products.map((p, idx) => (
              <motion.div
                key={p.id}
                className="flex items-center p-3 rounded-xl bg-gray-800/40 border border-cyan-500/10 cursor-pointer transition-all hover:border-cyan-400/30 hover:shadow-[0_0_15px_rgba(0,210,252,0.2)]"
                onClick={() => handleSmoothNavigate(`/product/${p.id}`)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="bg-white rounded-lg flex items-center justify-center w-16 h-16 mr-3 p-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{p.name}</p>
                  <p className="text-sm text-cyan-300">USD {p.price}</p>
                  <div className="flex items-center text-sm text-gray-400 mt-1">
                    <img src={starIcon} alt="Star" className="w-4 h-4 mr-1" />
                    {p.rating} ({p.reviews} Reviews)
                  </div>
                </div>
                <button className="text-gray-400 hover:text-cyan-400 p-2 rounded-full hover:bg-gray-700/50 transition-all">
                  ⋮
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchPage;
