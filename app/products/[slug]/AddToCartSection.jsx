"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { motion } from "framer-motion";

export default function AddToCartSection({ product }) {

  const { addToCart, decreaseQty, cart } = useCartStore();

  const getQty = () => {
    const item = cart.find(i => i._id === product._id);
    return item ? item.qty : 0;
  };

  const qty = getQty();

  return (

    <div className="mt-6 flex items-center justify-between bg-gray-50 p-3 rounded-xl">

      {/* LEFT TEXT */}
      <p className="text-sm font-medium text-gray-700">
        Add to Cart
      </p>

      {/* QTY CONTROLS */}
      <div className="flex items-center gap-3">

        {/* MINUS */}
        <button
          disabled={qty === 0}
          onClick={()=>decreaseQty(product._id)}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-lg
            ${qty === 0
              ? "bg-gray-200 text-gray-400"
              : "bg-white border border-gray-300"
            }`}
        >
          −
        </button>

        {/* QTY */}
        <span className="text-sm font-semibold w-5 text-center">
          {qty}
        </span>

        {/* PLUS */}
        <motion.button
          whileTap={{scale:.9}}
          onClick={(e)=>{
  const img = document.getElementById("main-product-image"); // ✅ FIX

  if(img){
    const clone = img.cloneNode(true);
    const rect = img.getBoundingClientRect();

    clone.style.position = "fixed";
    clone.style.top = rect.top + "px";
    clone.style.left = rect.left + "px";

    clone.style.height = "400px";
    clone.style.width = "80px";

    
    clone.style.zIndex = 999;

    document.body.appendChild(clone);

    clone.animate([
      { transform: "translate(0,0)", opacity: 1 },
      { transform: "translate(300px,-300px) scale(0.2)", opacity: 0 }
    ],{
      duration: 600,
      easing: "ease-in-out"
    });

    setTimeout(()=>clone.remove(),600);
  }

  addToCart(product);
}}
          className="w-9 h-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-lg shadow"
          
        >
          +
        </motion.button>

      </div>

    </div>
  );
}