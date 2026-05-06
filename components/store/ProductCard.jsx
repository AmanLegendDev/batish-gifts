"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";

export default function ProductCard({ product }) {

  const {
    cart,
    addToCart,
    increaseQty,
    decreaseQty
  } = useCartStore();

  const item = cart.find(
    i => i._id === product._id
  );

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
    clone.style.borderRadius = "16px";
    clone.style.transition =
      "all 0.7s cubic-bezier(.65,-0.2,.2,1.2)";

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

    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
    >

      {/* IMAGE */}
      

        <div className="relative w-full aspect-square overflow-hidden group">
          <Link href={`/products/${product.slug}`}>

          <div
            ref={imgRef}
            className="w-full h-full bg-gray-100"
          >

            <Image
              src={product.image || "/placeholder.png"}
              alt={product.name}
              fill
              sizes="(max-width:768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition duration-500"
              loading="lazy"
            />
          </div>
              </Link>

          {/* SOFT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

<Link
    href={`/products/${product.slug}`}
    className="absolute bottom-2 right-2 z-10 bg-white/90 backdrop-blur-md text-[10px] font-medium text-gray-700 px-2.5 py-1 rounded-full shadow-sm hover:bg-white transition"
  >
    View →
  </Link>

        </div>

      
      


      {/* CONTENT */}
      <div className="p-3 flex flex-col flex-1">

        {/* TITLE */}
        <Link href={`/products/${product.slug}`}>

          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>

        </Link>


        {/* DESC */}
        <p className="text-xs text-gray-400 line-clamp-2 mt-1 min-h-[32px]">
          {product.description}
        </p>


        {/* PRICE + ACTION */}
        <div className="flex items-center justify-between mt-4 min-h-[38px]">

          <span className="text-[var(--primary)] font-bold text-sm">
            ₹ {product.sellingPrice}
          </span>


          <AnimatePresence mode="wait">

            {qty === 0 ? (

              <motion.button
                key="add-btn"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleAdd}
                className="bg-[var(--primary)] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm hover:opacity-90 transition"
              >
                Add +
              </motion.button>

            ) : (

              <motion.div
                key="qty"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                className="flex items-center gap-3 bg-[var(--primary)] text-white rounded-full px-3 py-1.5"
              >

                <button
                  onClick={() => decreaseQty(product._id)}
                  className="text-base font-bold leading-none"
                >
                  −
                </button>

                <span className="text-xs font-semibold min-w-[10px] text-center">
                  {qty}
                </span>

                <button
                  onClick={() => increaseQty(product._id)}
                  className="text-base font-bold leading-none"
                >
                  +
                </button>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

    

      </div>

    </div>

  );

}