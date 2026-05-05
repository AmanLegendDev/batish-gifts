"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import ProductCard from "@/components/store/ProductCard";

export default function ProductSection({ categoryId }) {

const [products, setProducts] = useState(null);

  const { cart } = useCartStore();


  useEffect(() => {

  const listener = (e) => {

    const el = document.getElementById(`product-${e.detail}`);

    if(el){
      el.scrollIntoView({
        behavior:"smooth",
        block:"center"
      });
    }

  };

  window.addEventListener("scrollToProduct",listener);

  return ()=>window.removeEventListener("scrollToProduct",listener);

},[]);

  /*
  🔥 FETCH PRODUCTS
  */
useEffect(() => {

  fetch(`/api/products/list?category=${categoryId || "all"}`)
    .then(res => res.json())
    .then(data => {

      // 🔥 NO RESET → smooth replace
      setProducts(data);

    });

}, [categoryId]);


  /*
  CART
  */
  const totalItems = cart.reduce((a, i) => a + i.qty, 0);
  const totalPrice = cart.reduce((a, i) => a + i.sellingPrice * i.qty, 0);





  /*
  🔥 EMPTY STATE
  */

if (!products) {
  return null; // first load only
}



  /*
  🔥 MAIN UI
  */
  return (
    <section id="products" className="px-4 py-6 bg-white">

      {/* PRODUCT GRID */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">

  {products.map(product => (
    <div key={product._id} id={`product-${product._id}`}>
      <ProductCard product={product} />
    </div>
  ))}

</div>


      {/* FLOAT CART */}
      <AnimatePresence>

        {totalItems > 0 && (

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[var(--primary)] text-white rounded-2xl px-5 py-3 shadow-lg flex justify-between items-center"
          >

            <div>
              <p className="text-sm font-semibold">
                {totalItems} item{totalItems > 1 && "s"}
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

    </section>
  );
}