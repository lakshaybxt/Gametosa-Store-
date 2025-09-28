import React, { useState, useRef, useContext } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  CreditCard,
  Heart,
  Gift,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "../components/BottomNav";
import { ProfileContext } from "../context/ProfileContext";

// Images
import cameraIcon from "../assets/images/Camera.png";

const ProfilePage = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const profileItems = [
    { icon: ShoppingBag, label: "My Orders", action: () => navigate("/myorders") },
    { icon: CreditCard, label: "Payment Methods", action: () => navigate("/checkout2") },
    { icon: Heart, label: "Wishlisted Products", action: () => navigate("/wishlist") },
    { icon: Gift, label: "Rewards", action: () => navigate("/rewards") },
    { icon: Bell, label: "Notifications", action: () => navigate("/notifications") },
    { icon: HelpCircle, label: "Help & Support", action: () => navigate("/help") },
    { icon: LogOut, label: "Log out", action: () => setShowLogoutModal(true), hasChevron: false },
  ];

  // Handle profile picture upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, avatar: imageUrl });
    }
  };

  // Handle logout
  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <motion.div
      className="relative w-full h-screen bg-gradient-to-b from-[#00162E] to-[#01091E] text-white font-['Poppins'] flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700 fixed top-0 left-0 w-full z-50 bg-[#00162E]">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex justify-center items-center w-6 h-6"
          whileTap={{ scale: 0.85 }}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
        <motion.h1
          className="flex-1 text-center text-[22px] md:text-[24px] font-semibold text-white"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          My Profile
        </motion.h1>
        <div className="w-6 h-6" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-28 pb-28 px-5">
        {/* Profile Info */}
        <motion.div
          className="flex items-center gap-6 mt-4 mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Profile Image */}
          <div className="relative group">
            <motion.img
              src={profile.avatar}
              alt="Profile"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-2 ring-cyan-400 shadow-[0_0_20px_#00D2FC] group-hover:shadow-[0_0_30px_#00D2FC] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            />
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <motion.button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#000F14] flex items-center justify-center ring-1 ring-cyan-400 hover:scale-110 transition-transform"
              whileTap={{ scale: 0.9 }}
            >
              <img src={cameraIcon} alt="Edit" className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Name + Email */}
          <div className="flex flex-col items-start justify-center flex-1 space-y-1">
            <h2 className="text-[20px] font-semibold text-white tracking-wide">{profile.name}</h2>
            <p className="text-[15px] text-gray-300 tracking-wide font-light">{profile.email}</p>
            <motion.button
              onClick={() => navigate("/editprofile")}
              className="mt-3 px-5 py-1.5 bg-[#00D2FC] text-[#000F14] text-[14px] rounded-md shadow-[0_0_10px_#00D2FC] hover:bg-[#00B8E6] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              Edit Profile
            </motion.button>
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-4 pb-6">
          {profileItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={item.action}
              className="w-full flex items-center justify-between px-5 py-4 bg-[#0A1A2F]/50 rounded-lg hover:bg-[#0D223D] transition-all duration-200"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex items-center gap-4">
                <item.icon className="w-6 h-6 text-[#00D2FC]" />
                <span className="text-gray-100 text-[16px]">{item.label}</span>
              </div>
              {item.hasChevron !== false && <ChevronRight className="w-5 h-5 text-gray-400" />}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <BottomNav active="profile"/>
      </div>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#0A1A2F] border border-cyan-400/40 rounded-2xl shadow-[0_0_20px_#00D2FC] w-full max-w-sm p-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">Logout</h3>
              <p className="text-gray-300 mb-6">Are you sure you want to log out?</p>
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleLogout}
                  className="flex-1 py-3 bg-[#00D2FC] text-[#000F14] rounded-lg font-medium hover:bg-[#00B8E6] transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfilePage;
