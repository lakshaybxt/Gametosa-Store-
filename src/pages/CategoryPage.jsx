import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import BottomNav from "../components/BottomNav";

// Category icons
import gamingHeadset from "../assets/icons/gaming headset.png";
import microphone from "../assets/icons/microphone.png";
import streamingCamera from "../assets/icons/streaming camera.png";
import gamingKeyboard from "../assets/icons/gaming keyboard.png";
import gamingMouse from "../assets/icons/gaming mouse.png";
import controller from "../assets/icons/controllers.png";
import gamingMonitor from "../assets/icons/headsetimg.png";
import gamingDisc from "../assets/icons/headsetpic.png";
import chargingStation from "../assets/icons/earhead.png";
import gamingChair from "../assets/icons/gaming chair.png";
import ergonomicChair from "../assets/icons/ergonomicChair.png";
import gamingMousepad from "../assets/icons/mousepad.png";

// Custom icons
import micIcon from "../assets/icons/vector2.svg";
import searchIcon from "../assets/icons/search1.svg";

const categories = [
  {
    title: "Audio & Communication",
    items: [
      { img: gamingHeadset, label: "Gaming Headsets", link: "/subcategory" },
      { img: microphone, label: "Microphones" },
      { img: streamingCamera, label: "Streaming Camera" },
    ],
  },
  {
    title: "PC Gaming Gear",
    items: [
      { img: gamingKeyboard, label: "Gaming Keyboards" },
      { img: gamingMouse, label: "Gaming Mice" },
      { img: gamingMonitor, label: "Gaming Monitor" },
    ],
  },
  {
    title: "Console Accessories",
    items: [
      { img: controller, label: "Controllers" },
      { img: gamingDisc, label: "Gaming Discs" },
      { img: chargingStation, label: "Charging Stations" },
    ],
  },
  {
    title: "Gaming Setup & Comfort",
    items: [
      { img: gamingChair, label: "Gaming Chairs" },
      { img: ergonomicChair, label: "Ergonomic Chairs" },
      { img: gamingMousepad, label: "Gaming Mousepads" },
    ],
  },
];

// 🔊 Speech Recognition Hook
const useSpeechRecognition = (onResult) => {
  const [listening, setListening] = useState(false);

  const start = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) =>
      onResult(event.results[0][0].transcript);
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  return { listening, start };
};

const CategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { listening, start } = useSpeechRecognition((result) => {
    setSearchTerm(result);
    navigate(`/search?query=${encodeURIComponent(result)}`);
  });

  // ✅ direct navigation on search icon click
  const handleSearch = () => {
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-[#00162E] to-[#01091E] text-white flex flex-col">
      {/* 🔝 Header */}
      <motion.div
        className="w-full px-4 pt-6 pb-4 fixed top-0 left-0 z-40 backdrop-blur-sm bg-gradient-to-b from-[#00162E] to-[#01091E]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full text-white hover:bg-[#00b8d4] transition"
          >
            <FiArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-xl font-bold flex-1 text-center">Category</h1>
          <div className="w-8" /> {/* placeholder for spacing */}
        </div>

        {/* 🔎 Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => navigate(`/search?query=${encodeURIComponent(searchTerm)}`)} // 👈 navigate on click
            className="w-full bg-[#0A1A2F] rounded-full py-2 pl-10 pr-10 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_10px_#00D2FC]"
          />
          <img
            src={searchIcon}
            alt="Search"
            onClick={handleSearch}
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
          />
          <img
            src={micIcon}
            alt="Microphone"
            onClick={start}
            className={`h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform ${
              listening ? "animate-pulse" : ""
            }`}
          />
        </div>
      </motion.div>

      {/* 📜 Scrollable Categories */}
      <div className="flex-1 overflow-y-auto mt-[130px] px-4 pb-28">
        {categories.map(({ title, items }) => (
          <CategorySection key={title} title={title}>
            {items.map(({ img, label, link }) => (
              <CategoryCard key={label} img={img} label={label} link={link} />
            ))}
          </CategorySection>
        ))}
      </div>

      {/* ⬇️ Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full z-40">
        <BottomNav />
      </div>
    </div>
  );
};

/* 🔲 Category Section */
const CategorySection = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-lg font-semibold mb-3">{title}</h2>
    <div className="grid grid-cols-3 gap-4">{children}</div>
    <div className="border-b border-gray-700 mt-6"></div>
  </div>
);

/* 🔲 Category Card */
const CategoryCard = ({ img, label, link }) => {
  const Wrapper = link ? Link : "div";
  return (
    <Wrapper
      to={link || "#"}
      className="flex flex-col items-center hover:scale-105 transition-transform"
    >
      <div className="bg-[#0A1A2F] rounded-md p-1 w-full aspect-square relative border border-cyan-500 shadow-[0_0_12px_#00D2FC] hover:shadow-[0_0_16px_#00D2FC] transition-shadow">
        <img
          src={img}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover rounded"
        />
        <span className="absolute bottom-1 w-full text-center text-xs bg-black/50">
          {label}
        </span>
      </div>
    </Wrapper>
  );
};

export default CategoryPage;
