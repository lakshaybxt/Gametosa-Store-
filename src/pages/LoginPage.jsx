import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import googleIcon from "../assets/images/google.png";
import otpIcon from "../assets/images/otp-icon.png";
import BackgroundBlur from "../components/BackgroundBlur";
import PasswordInput from "../components/PasswordInput";
import SocialButton from "../components/SocialButton";
import OtpModal from "../components/OtpModal";

const LoginPage = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validation: check mobile or email
    const isMobile = /^[0-9]{10}$/.test(emailOrMobile);
    const isEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailOrMobile);

    if (isMobile || isEmail) {
      console.log("Login successful:", { emailOrMobile, password, rememberMe });
      navigate("/home"); // ✅ directly go to home
    } else {
      alert("Please enter a valid 10 digit mobile number or Gmail ID");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <BackgroundBlur />

      {/* Login Container */}
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

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email / Mobile */}
          <div>
            <label htmlFor="emailOrMobile" className="sr-only">
              Email or Mobile
            </label>
            <input
              id="emailOrMobile"
              type="text"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              placeholder="Email / Mobile"
              className="w-full px-4 py-3.5 rounded-lg bg-transparent border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none text-sm sm:text-base text-white font-poppins font-medium"
            />
          </div>

          {/* Password */}
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
          />

          {/* Remember + Reset */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2 w-4 h-4 accent-cyan-400"
              />
              Remember me
            </label>
            <a href="#" className="text-cyan-400 hover:underline">
              Reset Password
            </a>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="flex-1 py-3 bg-transparent border border-gray-600 text-white font-medium rounded-lg hover:bg-gray-800 transition duration-200 text-sm sm:text-base"
            >
              Register
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-cyan-400 hover:bg-cyan-500 text-black font-medium rounded-lg transition duration-200 text-sm sm:text-base"
            >
              Login
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

        {/* Terms */}
        <p className="text-center text-gray-500 text-xs mt-10 px-4 leading-relaxed">
          By continuing you are accepting our
          <br />
          <a href="#" className="text-cyan-400 hover:underline">
            Terms & Conditions
          </a>
        </p>
      </div>

      {/* OTP Modal */}
      <OtpModal isOpen={otpOpen} onClose={() => setOtpOpen(false)} />
    </div>
  );
};

export default LoginPage;
