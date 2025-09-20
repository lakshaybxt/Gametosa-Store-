import React from "react";

const BackgroundEffects = ({ showModal = false, color = "#00D2FC" }) => {
  const gradient = (opacity = 0.3, blur = "blur-3xl", size = "w-96 h-96") => ({
    className: `absolute rounded-full ${size} ${blur}`,
    style: {
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity,
    },
  });

  return (
    <div
      className={`fixed inset-0 overflow-hidden pointer-events-none transition-opacity duration-500 ${
        showModal ? "opacity-80" : "opacity-100"
      }`}
    >
      {/* Top Right */}
      <div {...gradient(0.4, "blur-3xl", "w-96 h-96")} className="-top-32 -right-32 absolute" />

      {/* Bottom Left */}
      <div {...gradient(0.3, "blur-3xl", "w-80 h-80")} className="-bottom-32 -left-32 absolute" />

      {/* Center */}
      <div {...gradient(0.2, "blur-3xl", "w-64 h-64")} className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2" />

      {/* Additional accents */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full opacity-15 blur-2xl" style={{ background: color }} />
      <div className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full opacity-20 blur-2xl" style={{ background: color }} />
    </div>
  );
};

export default BackgroundEffects;
