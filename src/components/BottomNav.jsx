import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiGrid, FiShoppingCart, FiUser } from "react-icons/fi";

// Nav items config
const items = [
  { to: "/home", label: "Home", icon: <FiHome size={20} /> },
  { to: "/category", label: "Category", icon: <FiGrid size={20} /> },
  { to: "/cart", label: "Cart", icon: <FiShoppingCart size={20} /> },
  { to: "/profile", label: "Me", icon: <FiUser size={20} /> },
];

const BottomNav = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#161B22] border-t border-gray-800 flex justify-around items-center py-2 z-10">
      {items.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            `flex flex-col items-center text-sm transition-all ${
              isActive ? "text-[#00D2FC]" : "text-white hover:text-cyan-300"
            }`
          }
        >
          {icon}
          <span className="text-[10px] mt-1">{label}</span>
        </NavLink>
      ))}
    </footer>
  );
};

export default BottomNav;
