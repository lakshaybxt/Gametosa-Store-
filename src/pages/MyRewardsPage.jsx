import React, { useEffect, useState } from "react";
import { ArrowLeft, Bell, ShoppingBag, Mail } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import gImg from "../assets/images/G.png";
import myRewardImg from "../assets/images/myreward.png";

export default function MyRewardsPage() {
  const [rewards, setRewards] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/mock/myrewards.json")
      .then((res) => res.json())
      .then((data) => {
        setRewards(data.rewards);
        setTasks(data.tasks);
      })
      .catch((err) => console.error(err));
  }, []);

  const iconMapper = {
    bell: <Bell className="text-white" size={20} />,
    cart: <ShoppingBag className="text-white" size={20} />,
    mail: <Mail className="text-white" size={20} />,
  };

  const handleClaim = (taskTitle) => {
    alert(`You claimed: ${taskTitle}`);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#01091E] to-[#00162E] flex flex-col pb-24">
      
      {/* Header - sticky */}
      <header className="flex items-center px-4 py-3 sticky top-0 z-50 bg-gradient-to-b from-[#01091E] to-[#00162E]">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="text-white" size={22} />
        </button>
        <h1 className="flex-1 text-center text-white font-semibold text-lg sm:text-xl md:text-2xl">
          My Rewards
        </h1>
        <div className="w-6 h-6" />
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-4 space-y-6">
        
        {/* Reward Banner */}
        <div className="relative rounded-lg overflow-hidden mt-4">
          <img
            src={myRewardImg}
            alt="Level"
            className="w-full h-40 sm:h-44 md:h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-2 sm:px-4">
            <div className="flex flex-col items-center sm:flex-row sm:items-baseline gap-1">
              <h2 className="text-white font-poppins text-[20px] sm:text-[24px] font-medium leading-normal">
                Explorer L1
              </h2>
              <span className="text-[#898A8D] font-poppins text-[6px] sm:text-[8px] font-medium leading-normal">
                Current Level
              </span>
            </div>
            <p className="text-white font-poppins text-[10px] sm:text-[12px] font-medium leading-normal mt-1">
              Level Reached
            </p>
            <div className="w-20 sm:w-32 h-[1px] bg-white my-1"></div>
            <p className="text-white font-poppins text-[10px] sm:text-[12px] font-medium leading-normal">
              ₹5000 required for next level
            </p>
          </div>
        </div>

        {/* Accumulate Points */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Accumulate Points</h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between bg-[#050F33] rounded-lg px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  {iconMapper[task.icon]}
                  <div>
                    <p className="text-white text-sm font-medium">{task.title}</p>
                    <p className="text-gray-400 text-xs">{task.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleClaim(task.title)}
                  className="bg-gray-300 text-black text-xs px-3 py-1 rounded-md transition-colors duration-300 hover:bg-cyan-400"
                >
                  {task.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Most Popular Rewards */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Most Popular Rewards</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-[#00D2FC] rounded-lg p-3 sm:p-4 flex flex-col items-center text-center shadow-lg relative overflow-hidden border-[1px] border-gray-200"
              >
                <div className="absolute -top-2 left-0 w-full h-3 bg-[#00D2FC]/40 rounded-b-full"></div>
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#00D2FC]/40 rounded-t-full"></div>

                <div className="w-12 h-12 sm:w-14 sm:h-14 mb-2 sm:mb-3">
                  <img src={gImg} alt="G" className="w-full h-full object-contain" />
                </div>
                <h4 className="font-medium text-sm sm:text-base text-gray-900">{reward.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">{reward.validity}</p>
                <button className="text-sm font-medium underline mt-2 text-gray-800">T&C</button>
              </motion.div>
            ))}
          </div>
        </div>

      </main>

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <BottomNav />
      </div>
    </div>
  );
}
