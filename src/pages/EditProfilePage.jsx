import React, { useRef, useContext, useState, useEffect } from "react";
import { ChevronLeft, User, Mail, Phone, Camera, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ProfileContext } from "../context/ProfileContext";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { profile, setProfile } = useContext(ProfileContext);

  const [errors, setErrors] = useState({});
  const [canSave, setCanSave] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Validate fields
  useEffect(() => {
    const newErrors = {};
    if (profile.name?.trim() === "") newErrors.name = "Name cannot be empty";
    if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email))
      newErrors.email = "Invalid email address";
    if (profile.phone && !/^\+?[0-9]{7,15}$/.test(profile.phone))
      newErrors.phone = "Invalid phone number";

    setErrors(newErrors);
    setCanSave(Object.keys(newErrors).length === 0);
  }, [profile]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, avatar: imageUrl });
    }
  };

  const handleSave = () => {
    if (!canSave) return;
    alert("✅ Profile updated successfully!");
    navigate("/profile");
  };

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  return (
    <motion.div
      className="relative w-full h-screen bg-gradient-to-b from-[#00162E] to-[#01091E] text-white flex flex-col"
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
          className="flex-1 text-center text-[22px] md:text-[24px] font-semibold"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Edit Profile
        </motion.h1>
        <div className="w-6 h-6" />
      </div>

      {/* Scrollable Content */}
      <motion.div
        className="flex-1 mt-24 mb-24 px-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{ paddingBottom: "100px" }} // Ensure space for fixed save button
      >
        {/* Profile Picture */}
        <motion.div
          className="relative flex justify-center mt-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-full h-full rounded-full border-2 border-cyan-400 object-cover shadow-lg"
            />
            <button
              className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 bg-cyan-400 text-black p-2 rounded-full hover:bg-cyan-300"
              onClick={() => fileInputRef.current.click()}
            >
              <Camera size={18} />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </motion.div>

        <motion.p
          className="mt-4 text-lg font-semibold text-gray-300 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {profile.name || "Your Name"}
        </motion.p>

        {/* Edit Form */}
        <motion.div
          className="flex flex-col gap-6 mt-6 max-w-lg w-full mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Name */}
          <div>
            <label className="text-base text-gray-400">Full Name</label>
            <div className="flex items-center bg-[#010C22] rounded-lg px-3 py-3 mt-2">
              <User size={20} className="text-white mr-3" />
              <input
                type="text"
                name="name"
                value={focusedField === "name" ? profile.name : ""}
                onChange={handleChange}
                placeholder={focusedField === "name" ? "" : "Enter Name"}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                className="bg-transparent outline-none w-full text-white text-base placeholder-gray-400"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-base text-gray-400">Email Address</label>
            <div className="flex items-center bg-[#010C22] rounded-lg px-3 py-3 mt-2">
              <Mail size={20} className="text-white mr-3" />
              <input
                type="email"
                name="email"
                value={focusedField === "email" ? profile.email : ""}
                onChange={handleChange}
                placeholder={focusedField === "email" ? "" : "Enter Email ID"}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                className="bg-transparent outline-none w-full text-white text-base placeholder-gray-400"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="text-base text-gray-400">Date of Birth</label>
            <div className="flex items-center bg-[#010C22] rounded-lg px-3 py-3 mt-2">
              <Calendar size={20} className="text-white mr-3" />
              <input
                type="date"
                name="dob"
                value={profile.dob || ""}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-white text-base placeholder-gray-400"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-base text-gray-400">Gender</label>
            <div className="flex items-center bg-[#010C22] rounded-lg px-3 py-3 mt-2">
              <select
                name="gender"
                value={profile.gender || "Male"}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-white text-base"
              >
                <option value="Male" className="text-black">Male</option>
                <option value="Female" className="text-black">Female</option>
                <option value="Other" className="text-black">Other</option>
              </select>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-base text-gray-400">Phone Number</label>
            <div className="flex items-center bg-[#010C22] rounded-lg px-3 py-3 mt-2">
              <Phone size={20} className="text-white mr-3" />
              <input
                type="tel"
                name="phone"
                value={focusedField === "phone" ? profile.phone : ""}
                onChange={handleChange}
                placeholder={focusedField === "phone" ? "" : "+91 9876543210"}
                onFocus={() => handleFocus("phone")}
                onBlur={handleBlur}
                className="bg-transparent outline-none w-full text-white text-base placeholder-gray-400"
                pattern="\+?[0-9]{7,15}"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </motion.div>
      </motion.div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-[#00162E] border-t border-gray-700 z-50">
        <button
          onClick={handleSave}
          disabled={!canSave}
          className={`w-full bg-[#00D2FC] text-black font-semibold py-3 rounded-lg text-lg transition ${
            canSave ? "hover:bg-[#00bce0]" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Save
        </button>
      </div>
    </motion.div>
  );
};

export default EditProfilePage;
