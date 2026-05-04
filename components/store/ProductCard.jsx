"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";

export default function ProductCard({ product }) {

  const { cart, addToCart, increaseQty, decreaseQty } = useCartStore();

  const item = cart.find(i => i._id === product._id);
  const qty = item ? item.qty : 0;

  const imgRef = useRef(null);

  /*
  🔥 FLY TO CART
  */

  const handleAdd = () => {

    const img = imgRef.current;
    if (!img) {
      addToCart(product);
      return;
    }

    const rect = img.getBoundingClientRect();
    const clone = img.cloneNode(true);

    clone.style.position = "fixed";
    clone.style.left = rect.left + "px";
    clone.style.top = rect.top + "px";
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";
    clone.style.zIndex = 9999;
    clone.style.borderRadius = "12px";
    clone.style.transition = "all 0.7s cubic-bezier(.65,-0.2,.2,1.2)";

    document.body.appendChild(clone);

    const targetX = window.innerWidth - 60;
    const targetY = 20;

    requestAnimationFrame(() => {
      clone.style.left = targetX + "px";
      clone.style.top = targetY + "px";
      clone.style.width = "20px";
      clone.style.height = "20px";
      clone.style.opacity = 0.5;
    });

    setTimeout(() => {
      clone.remove();
      addToCart(product);
    }, 700);
  };

  return (

    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col"
    >

      {/* IMAGE */}
      <div className="relative w-full aspect-square overflow-hidden">

        <Link href={`/products/${product.slug}`}>

          <div ref={imgRef} className="w-full h-full">

            <Image
              src={product.image || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

          </div>

        </Link>

        {/* SOFT GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        {/* ADD BUTTON */}
        {qty === 0 && (
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-semibold shadow-md text-[var(--primary)]"
          >
            Add +
          </motion.button>
        )}

      </div>


      {/* CONTENT */}
      <div className="p-3 flex flex-col flex-1">

        <Link href={`/products/${product.slug}`}>

          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </h3>

        </Link>

        <p className="text-xs text-gray-400 line-clamp-2 mt-1">
          {product.description}
        </p>


        <div className="flex justify-between items-center mt-3">

          <span className="text-[var(--primary)] font-bold text-sm">
            ₹ {product.sellingPrice}
          </span>


          {/* QTY CONTROLLER */}
          <AnimatePresence mode="wait">

            {qty > 0 && (

              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                className="flex items-center gap-2 bg-[var(--primary)] text-white rounded-full px-3 py-1"
              >

                <button
                  onClick={() => decreaseQty(product._id)}
                  className="text-lg font-bold"
                >
                  −
                </button>

                <span className="text-xs font-semibold">
                  {qty}
                </span>

                <button
                  onClick={() => increaseQty(product._id)}
                  className="text-lg font-bold"
                >
                  +
                </button>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </div>

    </motion.div>

  );
}