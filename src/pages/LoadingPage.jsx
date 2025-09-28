import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- Asset Imports ---
import logo from "../assets/images/logo.png";
import img1 from "../assets/icons/img1.png";
import img2 from "../assets/icons/img2.png";
import img3 from "../assets/icons/img3.png";
import img4 from "../assets/icons/img4.png";
import img5 from "../assets/icons/img5.png";
import img6 from "../assets/icons/img6.png";
import img7 from "../assets/icons/img7.png";
import img8 from "../assets/icons/img8.png";
import img9 from "../assets/icons/img9.png";

const allImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

// Adjusted Layouts for better visual balance (same as before)
const imageLayouts = [
  { width: "30%", height: "28%", top: "0%", left: "0%" },
  { width: "28%", height: "25%", top: "0%", left: "34%" },
  { width: "32%", height: "30%", top: "0%", left: "64%" },
  { width: "27%", height: "28%", top: "28%", left: "0%" },
  { width: "36%", height: "26%", top: "25%", left: "30%" },
  { width: "31%", height: "28%", top: "28%", left: "64%" },
  { width: "30%", height: "28%", top: "58%", left: "0%" },
  { width: "32%", height: "32%", top: "50%", left: "32%" },
  { width: "30%", height: "28%", top: "58%", left: "64%" },
];

// Step indices for 3-step animation
const stepIndices = [
  [0, 1, 3, 4, 8], // Step 1
  [2, 5],           // Step 2
  [6, 7],           // Step 3
];

const LoadingPage = ({ onLoadComplete }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStep(1), 2000),
      setTimeout(() => setAnimationStep(2), 3000),
      setTimeout(() => setAnimationStep(3), 4000),
      setTimeout(() => onLoadComplete && onLoadComplete(), 6000),
    ];

    return () => timers.forEach((t) => clearTimeout(t));
  }, [onLoadComplete]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-black via-black/80 to-black flex justify-center items-start overflow-hidden">
      {/* Neon background circles */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, #00D2FC, #005768)",
          filter: "blur(120px)",
          top: "15%",
          left: "30%",
          opacity: 0.3,
        }}
        animate={{ x: ["0%", "5%", "0%"], y: ["0%", "-5%", "0%"], rotate: [0, 360, 0] }}
        transition={{ type: "tween", repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 250,
          background: "radial-gradient(circle, #FF00FF, #FF7FFF)",
          filter: "blur(100px)",
          top: "5%",
          left: "55%",
          opacity: 0.2,
        }}
        animate={{ x: ["0%", "-5%", "0%"], y: ["0%", "5%", "0%"] }}
        transition={{ type: "tween", repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />

      {/* Image Grid (now 75% height) */}
      <div className="absolute top-[2%] w-full h-[75%] z-10 p-2">
        {allImages.map((imgSrc, i) => {
          const currentStep = stepIndices.findIndex((step) => step.includes(i)) + 1;
          const showImage = animationStep >= currentStep;

          return (
            <motion.div
              key={i}
              className="absolute aspect-square rounded-xl overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url(${imgSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "2px solid rgba(0,210,252,0.35)",
                boxShadow: "0 0 25px rgba(0,210,252,0.3)",
                ...imageLayouts[i],
              }}
              initial={{ opacity: 0, scale: 0.7, rotate: -10, y: 50 }}
              animate={
                showImage
                  ? { opacity: 1, scale: 1, rotate: 0, y: 0 }
                  : {}
              }
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 18,
                delay: i * 0.12,
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 40px #00D2FC",
                rotate: [0, 3, -3, 0],
                transition: { type: "tween", duration: 0.5 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Logo */}
      <div className="absolute bottom-5 mb-6 flex flex-col items-center w-full px-4 z-20">
        <motion.img
          src={logo}
          alt="Gametosa Logo"
          className="w-56 md:w-72 h-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12, duration: 1, delay: 0.3 }}
          whileHover={{
            scale: 1.15,
            rotate: [0, 5, -5, 0],
            filter: "drop-shadow(0 0 45px #00D2FC)",
            transition: { type: "tween", duration: 0.6, repeat: Infinity },
          }}
          style={{ filter: "drop-shadow(0 0 25px #00D2FC)" }}
        />
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 w-full h-[25%] bg-gradient-to-t from-black to-transparent z-0" />
    </div>
  );
};

export default LoadingPage;
