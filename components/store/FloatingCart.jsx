"use client";

import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function FloatingCart(){

  const cart = useCartStore(state => state.cart);

  const totalItems = cart.reduce((a,i)=>a+i.qty,0);
  const totalPrice = cart.reduce((a,i)=>a+i.sellingPrice*i.qty,0);

  return (

    <AnimatePresence>

      {totalItems > 0 && (

        <motion.div
          initial={{y:100,opacity:0}}
          animate={{y:0,opacity:1}}
          exit={{y:100,opacity:0}}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[var(--primary)] text-white rounded-2xl px-5 py-3 shadow-lg flex justify-between items-center z-50"
        >

          <div>
            <p className="text-sm font-semibold">
              {totalItems} item{totalItems>1 && "s"}
            </p>
            <p className="text-xs opacity-80">
              ₹ {totalPrice}
            </p>
          </div>

          <Link
            href="/cart"
            className="bg-white text-[var(--primary)] px-4 py-2 rounded-lg text-sm font-semibold"
          >
            View Cart →
          </Link>

        </motion.div>

      )}

    </AnimatePresence>

  );
}