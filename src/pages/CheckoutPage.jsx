import React, { useEffect, useState } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // ✅ toggle for price details

  const navigate = useNavigate();

  useEffect(() => {
    // ✅ mock data (can be moved into a separate file later)
    const mockData = {
      cart: [
        {
          productId: 1,
          name: "Stylish Headphones",
          price: 1499,
          originalPrice: 3000,
          discountPercent: 50,
          imageUrl: "src/assets/icons/headset1.png",
        },
        {
          productId: 2,
          name: "Gametosa Premium Keyboard",
          price: 3499,
          originalPrice: 5000,
          discountPercent: 30,
          imageUrl: "src/assets/images/keyboard.png",
        },
      ],
      deliveryAddress: {
        label: "Home",
        street: "123 Main Street",
        city: "Mumbai",
        state: "MH",
        zipCode: "400001",
        country: "India",
      },
      summary: {
        subtotal: 4998,
        deliveryFee: 50,
        discount: 1052,
        total: 3996,
      },
    };

    setCartItems(mockData.cart);
    setAddress(mockData.deliveryAddress);
    setOrderSummary(mockData.summary);
  }, []);

  if (!orderSummary) return <p className="text-white">Loading...</p>;

  const handleContinue = () => {
    navigate("/checkout2"); // ✅ route to Payment
  };

  return (
    <div className="w-full min-h-screen bg-[#000F14] text-white flex flex-col pb-32">
      {/* Header */}
      <div className="flex items-center px-4 py-6 border-b border-gray-700">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="flex-1 text-center text-2xl font-poppins">Checkout</h1>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mt-6 px-6">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-cyan-400 text-cyan-400 text-xs">
            1
          </div>
          <span className="mt-1 text-xs">Review</span>
        </div>

        {/* Line */}
        <div className="flex-1 h-[1px] bg-gray-600 mx-2"></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-500 text-gray-300 text-xs">
            2
          </div>
          <span className="mt-1 text-xs">Payment</span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-6 mt-10 px-6">
        {cartItems.map((product) => (
          <div key={product.productId} className="flex items-start gap-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-28 h-28 border border-gray-500 rounded"
            />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-light">{product.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">₹ {product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ₹ {product.originalPrice}
                  </span>
                )}
              </div>
              {product.discountPercent > 0 && (
                <span className="text-xs text-cyan-400 mt-1">
                  {product.discountPercent}% Off
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-700"></div>

      {/* Address */}
      {address && (
        <div className="px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Delivery Address</h2>
            <Link
              to="/profile"
              className="text-cyan-400 underline text-sm cursor-pointer"
            >
              Change
            </Link>
          </div>
          <div className="flex items-start gap-3 mt-3">
            <Home className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm">{address.label}</p>
              <p className="text-sm text-gray-400">
                {address.street}, {address.city}, {address.state} -{" "}
                {address.zipCode}, {address.country}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="px-6 mt-8">
        <h2 className="text-lg">Order Summary</h2>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex justify-between">
            <span className="font-bold">Sub-total</span>
            <span>₹ {orderSummary.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>₹ {orderSummary.deliveryFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Discount</span>
            <span>₹ {orderSummary.discount}</span>
          </div>
          <div className="flex justify-between border-t border-gray-700 pt-3">
            <span>Total</span>
            <span>₹ {orderSummary.total}</span>
          </div>
        </div>
      </div>

      {/* Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#000F14] border-t border-gray-700 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">₹ {orderSummary.total}</p>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-cyan-400 underline"
          >
            {showDetails ? "Hide Price Details" : "View Price Details"}
          </button>
        </div>
        <button
          onClick={handleContinue}
          className="bg-[#00D2FC] px-6 py-2 rounded-lg text-white font-semibold cursor-pointer"
        >
          Continue
        </button>
      </div>

      {/* Expandable Price Details */}
      {showDetails && (
        <div className="fixed bottom-20 left-0 w-full bg-[#0a1a20] border-t border-gray-700 px-6 py-4">
          <p className="text-sm text-gray-300">Sub-total: ₹ {orderSummary.subtotal}</p>
          <p className="text-sm text-gray-300">Delivery Fee: ₹ {orderSummary.deliveryFee}</p>
          <p className="text-sm text-gray-300">Discount: ₹ {orderSummary.discount}</p>
        </div>
      )}
    </div>
  );
}
