import React from "react";

const BackgroundBlur = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-10 left-8 w-40 h-40 rounded-full opacity-80 bg-cyan-400 blur-[130px]" />
      <div className="absolute top-20 right-4 sm:right-12 w-36 h-36 rounded-full opacity-70 bg-cyan-400 blur-[120px]" />
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full opacity-60 bg-cyan-400 blur-[120px]" />
      <div className="absolute top-1/2 left-2 -translate-y-1/2 w-24 h-24 rounded-full opacity-50 bg-cyan-400 blur-[90px] sm:hidden" />
    </div>
  );
};

export default BackgroundBlur;
