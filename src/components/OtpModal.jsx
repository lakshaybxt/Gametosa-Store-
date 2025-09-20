import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoShort from "../assets/images/G.png"; // short logo

const OtpModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); 
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(59);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setMobile("");
      setOtp(Array(6).fill(""));
      setTimer(59);
    }
  }, [isOpen]);

  // Countdown for OTP
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSend = () => {
    if (!mobile) return alert("Please enter mobile number");
    setStep(2);
    setTimer(59);
  };

  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto move focus forward
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
      // Auto move back on delete
      if (!value && index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  const handleLogin = () => {
    console.log("OTP entered:", otp.join(""));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-0 left-0 right-0 w-full sm:max-w-md sm:left-1/2 sm:-translate-x-1/2 rounded-t-[50px] px-6 pt-8 pb-10 text-center"
            style={{
              background:
                "linear-gradient(40deg, #00131B 21.88%, #021D26 127.39%)",
            }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img
                src={logoShort}
                alt="Logo"
                className="w-16 aspect-[68.8/66] flex-shrink-0"
              />
            </div>

            {/* Step 1: Enter Mobile */}
            {step === 1 && (
              <>
                <h2 className="text-white text-lg font-poppins font-semibold mb-6">
                  Enter your mobile number
                </h2>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Mobile Number"
                  className="w-full px-4 py-3.5 rounded-lg bg-[#021D26] border border-[#005768] placeholder-[#005768] text-white font-poppins text-base font-medium mb-8"
                />
                <div className="flex gap-4">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-[3px] border border-[#005768b3] bg-[#0057684d] text-white font-medium font-poppins"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSend}
                    className="flex-1 py-3 rounded-[3px] bg-[#00D2FC] text-black font-semibold font-poppins"
                  >
                    Send
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Enter OTP */}
            {step === 2 && (
              <>
                <h2 className="text-white text-lg font-poppins font-semibold mb-3">
                  Welcome back!
                </h2>
                <p className="text-white text-xs font-poppins font-semibold mb-6">
                  We have sent an OTP to your mobile number.
                  <br />
                  Enter the OTP below to login.
                </p>
                <div className="flex justify-center gap-3 mb-6">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      className="w-10 h-12 text-center text-lg font-semibold rounded-md bg-transparent border border-[#005768] text-white focus:ring-2 focus:ring-cyan-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-white font-poppins font-medium mb-6">
                  Reset OTP in{" "}
                  <span className="text-[#00BD4C]">{timer} seconds</span>
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-[3px] border border-[#005768b3] bg-[#0057684d] text-white font-medium font-poppins"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogin}
                    className="flex-1 py-3 rounded-[3px] bg-[#00D2FC] text-black font-semibold font-poppins"
                  >
                    Login
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OtpModal;
