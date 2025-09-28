import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";
import { motion } from "framer-motion";

// ✅ Shared BottomNav
import BottomNav from "../components/BottomNav";

// Section Divider
const SectionDivider = ({ text }) => (
  <div className="flex items-center gap-4 my-4">
    <div className="flex-grow h-px bg-cyan-400/30"></div>
    <span className="text-cyan-400 text-sm font-semibold capitalize">{text}</span>
    <div className="flex-grow h-px bg-cyan-400/30"></div>
  </div>
);

// Toggle Switch
const ToggleSwitch = ({ isEnabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 ${
      isEnabled ? "bg-cyan-500" : "bg-gray-600"
    }`}
  >
    <span
      className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${
        isEnabled ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    general: true,
    sound: true,
    vibrate: false,
    specialOffers: true,
    appUpdates: true,
  });

  useEffect(() => {
    fetch("/mock/notifications.json")
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error(err));
  }, []);

  const groupedNotifications = useMemo(() => {
    return notifications.reduce((acc, n) => {
      if (!acc[n.type]) acc[n.type] = [];
      acc[n.type].push(n);
      return acc;
    }, {});
  }, [notifications]);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationOptions = [
    { key: "general", label: "General Notifications" },
    { key: "sound", label: "Sound" },
    { key: "vibrate", label: "Vibrate" },
    { key: "specialOffers", label: "Special Offers" },
    { key: "appUpdates", label: "App Updates" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#00162E] to-[#01091E] text-white font-[Poppins] relative">
      {/* Header */}
      <header className="flex items-center p-4 sticky top-0 bg-[#00162E] z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center mt-5 text-3xl font-normal pr-8">
          Notifications
        </h1>
        <button onClick={() => setShowSettings(!showSettings)} className="p-2">
          <Settings className="w-7 mt-5 h-7 text-cyan-400" />
        </button>
      </header>

      {/* Main Content */}
      <main className="mt-8 px-6 pb-32 overflow-y-auto">
        {!showSettings && (
          <>
            {groupedNotifications.new?.length > 0 && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <SectionDivider text="new" />
                <div className="flex flex-col gap-4">
                  {groupedNotifications.new.map((n) => (
                    <div
                      key={n.id}
                      className="bg-[#01151C] shadow p-4 rounded-lg text-sm leading-relaxed"
                    >
                      {n.message}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {groupedNotifications.old?.length > 0 && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <SectionDivider text="old" />
                <div className="flex flex-col gap-4">
                  {groupedNotifications.old.map((n) => (
                    <div
                      key={n.id}
                      className="bg-[#01151C] shadow p-4 rounded-lg text-sm leading-relaxed text-gray-400"
                    >
                      {n.message}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {notifications.length === 0 && (
              <div className="text-center text-gray-400 mt-20">
                <p className="text-lg">No Notifications Yet 📭</p>
              </div>
            )}
          </>
        )}

        {/* Settings Section */}
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-6"
          >
            {notificationOptions.map((option) => (
              <div
                key={option.key}
                className="flex justify-between items-center bg-[#01151C] p-4 rounded-lg"
              >
                <span>{option.label}</span>
                <ToggleSwitch
                  isEnabled={settings[option.key]}
                  onToggle={() => handleToggle(option.key)}
                />
              </div>
            ))}
          </motion.div>
        )}
      </main>

      {/* ✅ Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
