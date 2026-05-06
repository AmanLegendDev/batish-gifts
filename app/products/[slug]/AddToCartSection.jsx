"use client";

import { useCartStore } from "@/store/cartStore";
import { motion } from "framer-motion";

export default function AddToCartSection({ product }) {

  const { addToCart, decreaseQty, cart } = useCartStore();

  const item = cart.find(i => i._id === product._id);

  const qty = item ? item.qty : 0;

  const handleAdd = () => {

    // ✅ SAFE SIMPLE ANIMATION
    const circle = document.createElement("div");

    circle.style.position = "fixed";
    circle.style.width = "18px";
    circle.style.height = "18px";
    circle.style.borderRadius = "999px";
    circle.style.background = "var(--primary)";
    circle.style.zIndex = "9999";
    circle.style.left = "50%";
    circle.style.top = "70%";
    circle.style.pointerEvents = "none";

    document.body.appendChild(circle);

    circle.animate(
      [
        {
          transform: "translate(0,0) scale(1)",
          opacity: 1
        },
        {
          transform: "translate(140px,-320px) scale(0.2)",
          opacity: 0
        }
      ],
      {
        duration: 700,
        easing: "ease-in-out"
      }
    );

    setTimeout(() => {
      circle.remove();
    }, 700);

    addToCart(product);
  };

  return (

    <div className="mt-7 bg-[#fffaf5] border border-gray-100 rounded-2xl p-4 flex items-center justify-between">

      {/* LEFT */}
      <div>

        <p className="text-sm font-semibold text-gray-900">
          Add to Cart
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Quick order with WhatsApp ⚡
        </p>

      </div>


      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* MINUS */}
        <button
          disabled={qty === 0}
          onClick={() => decreaseQty(product._id)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition
          ${
            qty === 0
              ? "bg-gray-200 text-gray-400"
              : "bg-white border border-gray-200 shadow-sm"
          }`}
        >
          −
        </button>


        {/* QTY */}
        <span className="w-5 text-center font-semibold text-sm">
          {qty}
        </span>


        {/* PLUS */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleAdd}
          className="w-10 h-10 rounded-full bg-[var(--primary)] text-white text-lg shadow-lg flex items-center justify-center"
        >
          +
        </motion.button>

      </div>

    </div>

  );
}