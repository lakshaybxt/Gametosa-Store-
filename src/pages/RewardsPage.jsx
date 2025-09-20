import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "../components/BottomNav";

export default function RewardsPage() {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/mock/coupons.json")
      .then((res) => res.json())
      .then((data) => setCoupons(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#000F1A] to-[#010618] flex flex-col pb-28">
      {/* Header - sticky */}
      <div className="flex items-center px-4 py-3 sticky top-0 bg-gradient-to-b from-[#000F1A] to-[#010618] z-50">
        <button onClick={() => navigate(-1)} className="flex items-center">
          <ArrowLeft className="text-white cursor-pointer" size={22} />
        </button>
        <h1 className="flex-1 text-center text-white font-bold text-2xl sm:text-2xl md:text-3xl">
          Coupons & Rewards
        </h1>
        <div className="w-6 h-6" />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto mt-0 px-4">
        {/* Large Reward Image */}
        <div className="flex justify-center m-0 p-0">
          <img
            src="/src/assets/images/reward.png"
            alt="Reward"
            className="w-full max-w-md sm:max-w-lg md:max-w-xl h-auto object-contain m-0 p-0"
          />
        </div>

        {/* My Rewards Button */}
        <div className="flex justify-center mb-2">
          <Link
            to="/myrewards"
            className="bg-[#00D2FC] hover:bg-cyan-400 transition w-full max-w-xs sm:max-w-sm text-center py-3 rounded-lg font-medium text-white text-sm sm:text-base"
          >
            My Rewards
          </Link>
        </div>

        {/* Coupons Section */}
        <div className="mt-2 max-w-md sm:max-w-lg md:max-w-xl mx-auto">
          <h2 className="text-white text-lg sm:text-xl font-semibold mb-2">
            My Coupons
          </h2>
          {coupons.length === 0 ? (
            <p className="text-gray-400">Loading coupons...</p>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {coupons.map((coupon) => (
                <motion.div
                  key={coupon.id}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex w-full cursor-pointer rounded-xl overflow-hidden shadow-lg h-24 sm:h-28"
                >
                  {/* Left 25% blue with animated glow */}
                  <motion.div
                    className="w-1/4 bg-[#153dac] flex items-center justify-center relative"
                    whileHover={{ boxShadow: "0 0 20px #00D2FC" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#00D2FC]/40 to-transparent rounded-l-xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "mirror",
                      }}
                    />
                    <img
                      src={
                        coupon.img ||
                        "/src/assets/images/coupon-placeholder.png"
                      }
                      alt={coupon.title}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-md relative z-10"
                    />
                  </motion.div>

                  {/* Right 75% white */}
                  <motion.div
                    className="w-3/4 bg-white p-4 sm:p-5 flex flex-col justify-center gap-1 rounded-r-xl"
                    whileHover={{ boxShadow: "0 0 20px #00D2FC" }}
                  >
                    <p className="text-sm sm:text-base text-gray-500">
                      {coupon.subtitle}
                    </p>
                    <h3 className="text-gray-900 font-bold text-base sm:text-lg">
                      {coupon.title}
                    </h3>
                    <div className="mt-1 h-[1px] bg-gray-300 rounded-full w-full" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <BottomNav active="rewards" />
      </div>
    </div>
  );
}
