import React from "react"; 
import { Routes, Route, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Context
import { ProfileProvider } from "./context/ProfileContext";
// Pages
import LoadingPage from "./pages/LoadingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import SubcategoryPage from "./pages/SubcategoryPage";
import FilterPage from "./pages/FilterPage";
import ProductPage from "./pages/ProductPage";
import MyCart from "./pages/MyCart";
import MyWishlistPage from "./pages/MyWishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import AddToCart from "./pages/AddToCart";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import MyRewardsPage from "./pages/MyRewardsPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import EditProfilePage from "./pages/EditProfilePage";
import MyOrderPage from "./pages/MyOrderPage";
import RewardsPage from "./pages/RewardsPage";
import HelpAndSupportPage from "./pages/HelpAndSupportPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import NotificationsPage from "./pages/NotificationsPage";
import ChatbotPage from "./pages/ChatbotPage";   // ✅ NEW IMPORT

// Background + UI
import BackgroundEffects from "./pages/BackgroundEffects";
import BottomNav from "./pages/BottomNav";

function App() {
  const navigate = useNavigate();

  const pageTransition = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  return (
    <ProfileProvider>
      <div className="relative min-h-screen bg-black overflow-hidden">
        <BackgroundEffects />

        <AnimatePresence mode="wait">
          <Routes>
            {/* Loading Page */}
            <Route
              path="/"
              element={<LoadingPage onLoadComplete={() => navigate("/login")} />}
            />

            {/* Login Page */}
            <Route
              path="/login"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <LoginPage onLogin={() => navigate("/home")} />
                </motion.div>
              }
            />

            {/* Register Page */}
            <Route
              path="/register"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <RegisterPage />
                </motion.div>
              }
            />

            {/* Home Page */}
            <Route
              path="/home"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <HomePage />
                  <BottomNav />
                </motion.div>
              }
            />

            {/* Profile Page */}
            <Route
              path="/profile"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <ProfilePage />
                  <BottomNav />
                </motion.div>
              }
            />

            {/* Edit Profile */}
            <Route
              path="/editprofile"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <EditProfilePage />
                </motion.div>
              }
            />

            {/* Search Page */}
            <Route
              path="/search"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <SearchPage />
                </motion.div>
              }
            />

            {/* Category Page */}
            <Route
              path="/category"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <CategoryPage />
                  <BottomNav />
                </motion.div>
              }
            />

            {/* Subcategory Page */}
            <Route
              path="/subcategory"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <SubcategoryPage />
                </motion.div>
              }
            />

            {/* Filter Page */}
            <Route
              path="/filter"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <FilterPage />
                </motion.div>
              }
            />

            {/* Product Details */}
            <Route
              path="/product/:id"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <ProductPage />
                </motion.div>
              }
            />

            {/* Cart Page */}
            <Route
              path="/cart"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <MyCart />
                  <BottomNav />
                </motion.div>
              }
            />

            {/* Add to Cart Page */}
            <Route
              path="/addtocart"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <AddToCart />
                </motion.div>
              }
            />

            {/* Wishlist Page */}
            <Route
              path="/wishlist"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <MyWishlistPage />
                  <BottomNav />
                </motion.div>
              }
            />

            {/* Checkout Page (Step 1) */}
            <Route
              path="/checkout"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <CheckoutPage />
                </motion.div>
              }
            />

            {/* Payment Method Page (Step 2) */}
            <Route
              path="/checkout2"
              element={
                <motion.div key="checkout2" {...pageTransition} className="h-full">
                  <PaymentMethodPage />
                </motion.div>
              }
            />

            {/* Order Confirmation */}
            <Route
              path="/orderconfirmation"
              element={
                <motion.div
                  key="orderconfirmation"
                  {...pageTransition}
                  className="h-full"
                >
                  <OrderConfirmationPage />
                </motion.div>
              }
            />

            {/* My Orders */}
            <Route
              path="/myorders"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <MyOrderPage />
                </motion.div>
              }
            />

            {/* Rewards */}
            <Route
              path="/rewards"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <RewardsPage />
                </motion.div>
              }
            />

            {/* My Rewards */}
            <Route
              path="/myrewards"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <MyRewardsPage />
                </motion.div>
              }
            />

            {/* Track Order */}
            <Route
              path="/trackorder"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <TrackOrderPage />
                </motion.div>
              }
            />

            {/* Notifications */}
            <Route
              path="/notifications"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <NotificationsPage />
                </motion.div>
              }
            />

            {/* Help & Support */}
            <Route
              path="/help"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <HelpAndSupportPage />
                </motion.div>
              }
            />

            {/* ✅ New Chatbot Page */}
            <Route
              path="/chatbot"
              element={
                <motion.div {...pageTransition} className="h-full">
                  <ChatbotPage />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </ProfileProvider>
  );
}

export default App;
