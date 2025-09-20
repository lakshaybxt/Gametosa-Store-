import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // ✅ Import react-icons

const PasswordInput = ({ id, value, onChange, placeholder, show, toggle }) => {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 pr-12 rounded-lg bg-transparent border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none text-sm sm:text-base text-white font-poppins font-medium transition-all"
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 p-1"
      >
        {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
