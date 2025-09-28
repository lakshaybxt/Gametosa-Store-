import React from "react";

const SocialButton = ({ text, icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-between py-3 px-4 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition duration-200 text-sm sm:text-base"
  >
    <span className="flex-1 text-center">{text}</span>
    <img src={icon} alt={`${text} icon`} className="w-5 h-5" />
  </button>
);

export default SocialButton;
