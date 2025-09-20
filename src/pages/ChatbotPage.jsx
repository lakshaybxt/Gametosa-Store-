import React, { useState } from "react";
import { FiArrowLeft, FiSend, FiImage, FiMic } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello, good morning.", time: "10:41 pm" },
    {
      sender: "bot",
      text: "I am Gametosa Support. Is there anything I can help you with?",
      time: "10:42 pm",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Auto bot reply
    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text: "Got it! Our support team will assist you shortly 🚀",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-[#00162E] to-[#01091E] text-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3 sticky top-0 z-50 bg-gradient-to-b from-[#00162E] to-[#01091E] border-b border-gray-700">
        <button onClick={() => navigate(-1)} className="mr-4">
          <FiArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="flex-1 text-center text-lg sm:text-xl font-semibold">Help & Support</h1>
        <div className="w-6" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                msg.sender === "user"
                  ? "bg-gray-700 text-white"
                  : "bg-cyan-500 text-black"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-xs text-gray-400 mt-1">{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center p-3 border-t border-gray-700 bg-[#00162E]">
        <button className="p-2 text-gray-400 hover:text-white">
          <FiImage className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your message..."
          className="flex-1 mx-2 bg-transparent outline-none text-white text-sm placeholder-gray-400"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="p-2 text-gray-400 hover:text-white">
          <FiMic className="w-5 h-5" />
        </button>
        <button
          onClick={sendMessage}
          className="p-2 bg-cyan-500 text-black rounded-full ml-2 hover:bg-cyan-400"
        >
          <FiSend className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
