import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Import mic icon
import micIcon from "../assets/icons/vector.svg";

// ✅ Shared BottomNav
import BottomNav from "../components/BottomNav";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [listening, setListening] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/mock/orders.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders.json");
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => console.error("Failed to load orders:", err));
  }, []);

  // ✅ Voice recognition
  const handleMicClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      setSearch(transcript);
    };

    recognition.onend = () => setListening(false);

    recognition.start();
  };

  // ✅ Routing for track order
  const handleTrackOrder = (orderId) => {
    navigate(`/trackorder`);
  };

  // ✅ Update quantity from dropdown
  const handleQuantityChange = (id, newQty) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, quantity: Number(newQty) } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00162E] to-[#01091E] flex flex-col">
      {/* Header */}
      <header className="flex items-center px-4 py-4 relative">
        <button onClick={() => navigate(-1)} className="text-white text-2xl">
          &#8592;
        </button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white text-2xl font-medium">
          My Order
        </h1>
      </header>

      {/* Search bar */}
      <div className="flex justify-center mt-5 mb-4 px-4">
        <div className="flex items-center bg-[#01162D] border border-[#00D2FC]  w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search...."
            className="flex-1 bg-transparent px-3 py-2 text-white placeholder-gray-400 outline-none"
          />
          <button onClick={handleMicClick} className="p-2 focus:outline-none">
            <img
              src={micIcon}
              alt="Mic"
              className={`w-5 h-5 ${listening ? "animate-pulse" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Orders list */}
      <div className="flex-1 mt-5 overflow-y-auto px-4 space-y-6 pb-28">
        {orders.length > 0 ? (
          orders
            .filter((order) =>
              order.product.toLowerCase().includes(search.toLowerCase())
            )
            .map((order, index) => (
              <div
                key={order.id}
                className="flex flex-row gap-4 border-b border-gray-700 pb-4"
              >
                {/* Left: Image + Quantity */}
                <div className="flex flex-col items-center">
                  <img
                    src="src/assets/images/keyboard.png"
                    alt={order.product}
                    className="w-24 h-24 rounded-lg border border-blue-400/70 object-cover"
                  />
                  {/* Quantity dropdown under image */}
                  <select
                    value={order.quantity}
                    onChange={(e) =>
                      handleQuantityChange(order.id, e.target.value)
                    }
                    className="mt-4 bg-black border border-blue-400 text-white text-sm rounded-md px-2 py-1 focus:outline-none"
                  >
                    {[...Array(50).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        Qty : {num + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Right: Product details */}
                <div className="flex-1 flex flex-col ml-4">
                  <p className="text-[#00D2FC] text-md font-medium">
                    {index === 0 ? "Arrived on Today" : "Delivered on Aug 1"}
                  </p>
                  <p className="text-white text-sm font-medium truncate">
                    Gametosa Premium ...
                  </p>
                  <p className="text-gray-400 text-sm">{order.color}</p>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[#00D2FC]">↓ 50%</span>
                    <span className="line-through text-gray-400">₹3,000</span>
                    <span className="text-white font-semibold">₹1,499</span>
                  </div>

                  {/* Track order only for latest */}
                  {index === 0 ? (
                    <button
                      onClick={() => handleTrackOrder(order.id)}
                      className="mt-3 bg-[#00D2FC] px-4 py-2 rounded-lg text-black font-semibold w-full sm:w-auto"
                    >
                      Track Order
                    </button>
                  ) : (
                    <div className="mt-3 flex flex-col items-start">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-[#FF9700] text-lg">
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Rate this Product
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
        ) : (
          <p className="text-center text-gray-400 mt-10">Loading orders...</p>
        )}
      </div>

      {/* Bottom nav */}
      <BottomNav />
    </div>
  );
}
