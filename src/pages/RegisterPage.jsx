import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import googleIcon from "../assets/images/google.png";
import otpIcon from "../assets/images/otp-icon.png";
import BackgroundBlur from "../components/BackgroundBlur";
import PasswordInput from "../components/PasswordInput";
import SocialButton from "../components/SocialButton";
import OtpModal from "../components/OtpModal";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Register with:", { mobile, password, confirmPassword });
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <BackgroundBlur />

      {/* Register Container */}
      <div className="w-full max-w-sm mx-4 relative z-10">
        {/* Logo + Welcome */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <img
              src={logo}
              alt="Logo"
              className="w-32 sm:w-40 md:w-48 object-contain drop-shadow-[0_0_8px_rgba(0,210,252,0.4)] mt-0 sm:mt-6 md:mt-10"
            />
          </div>
          <h2 className="text-white text-xl sm:text-2xl font-medium tracking-wide">
            WELCOME!!
          </h2>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="sr-only">
              Mobile Number
            </label>
            <input
              id="mobile"
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile Number"
              className="w-full px-4 py-3.5 rounded-lg bg-transparent border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none text-sm sm:text-base text-white font-poppins font-medium"
            />
          </div>

          {/* Password */}
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
          />

          {/* Confirm Password */}
          <PasswordInput
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            show={showConfirmPassword}
            toggle={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex-1 py-3 bg-transparent border border-gray-600 text-white font-medium rounded-lg hover:bg-gray-800 transition duration-200 text-sm sm:text-base"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-cyan-400 hover:bg-cyan-500 text-black font-medium rounded-lg transition duration-200 text-sm sm:text-base"
            >
              Register
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center my-6">
            <span className="text-gray-400 text-sm">Or</span>
          </div>

          {/* Social Buttons */}
          <SocialButton
            text="Continue with OTP"
            icon={otpIcon}
            onClick={() => setOtpOpen(true)}
          />
          <SocialButton text="Continue with Google" icon={googleIcon} />
        </form>

        {/* Redirect */}
        <p className="text-center text-gray-500 text-xs mt-8 px-4 leading-relaxed">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-cyan-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>

      {/* OTP Modal - Always outside form & container */}
      <OtpModal isOpen={otpOpen} onClose={() => setOtpOpen(false)} />
    </div>
  );
};

export default RegisterPage;
