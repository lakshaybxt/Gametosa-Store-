import React from "react";
import { FiMail, FiPhone, FiMessageCircle, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav"; // ✅ Imported BottomNav

const FAQItem = ({ question, answer }) => (
  <div className="bg-gray-800 rounded-lg p-4">
    <h3 className="font-semibold">{question}</h3>
    <p className="text-sm text-gray-400 mt-1">{answer}</p>
  </div>
);

const HelpAndSupportPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-gray-900 z-50 border-b border-gray-700 px-6 py-5 flex items-center">
        <button
          onClick={() => navigate("/profile")}
          className="mr-4 p-1 rounded hover:bg-gray-800 transition"
        >
          <FiArrowLeft className="text-white w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-center flex-1">Help & Support</h1>
        <div className="w-6" /> {/* Placeholder for spacing */}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-24 pb-24 px-6">
        {/* FAQ Section */}
        <div className="mb-8 max-w-xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem
              question="How can I track my order?"
              answer='Go to the "My Orders" section in your account to view the status of your orders.'
            />
            <FAQItem
              question="What is the return policy?"
              answer="You can return products within 7 days of delivery. Make sure the product is unused and in original condition."
            />
            <FAQItem
              question="How can I contact customer support?"
              answer="Use the options below to connect with our support team."
            />
          </div>
        </div>

        {/* Contact Options */}
        <div className="max-w-xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg">
              <FiMail className="text-blue-500 text-xl" />
              <span>support@gametosa.com</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg">
              <FiPhone className="text-green-500 text-xl" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg">
              <FiMessageCircle className="text-yellow-500 text-xl" />
              <span>Live Chat Support</span>
            </div>
          </div>

          {/* Support Button */}
          <div className="mt-8">
            <button
              className="w-full bg-blue-600 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
              aria-label="Start live chat support"
              onClick={() => navigate("/chatbot")} // ✅ Navigate to Chatbot page
            >
              Start Live Chat
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <BottomNav active="help" />
      </div>
    </div>
  );
};

export default HelpAndSupportPage;
