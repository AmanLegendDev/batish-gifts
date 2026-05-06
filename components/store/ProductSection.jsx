"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import ProductCard from "@/components/store/ProductCard";
const productCache = {};
const preloaded = new Set();
export default function ProductSection({ categoryId }) {

 const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
 

  const { cart } = useCartStore();

  /*
  SCROLL TO PRODUCT
  */
  useEffect(() => {
const listener = (e) => {

  const tryScroll = () => {

    const el = document.getElementById(
      `product-${e.detail}`
    );

    if (!el) {
      requestAnimationFrame(tryScroll);
      return;
    }

    const navbarOffset = 140;

    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({
      top,
      behavior: "smooth"
    });

  };

  tryScroll();

};

    window.addEventListener("scrollToProduct",listener);
    return ()=>window.removeEventListener("scrollToProduct",listener);
  },[]);

  /*
  🔥 FIXED FETCH (NO EMPTY FRAME)
  */
useEffect(() => {

  const category = categoryId || "all";

  let active = true;

  setLoading(true);

  // ✅ INSTANT CACHE
  if (productCache[category]) {

    setProducts(productCache[category]);

    setLoading(false);

    return;
  }

  // ✅ CLEAR OLD PRODUCTS
  setProducts([]);

  fetch(`/api/products/list?category=${category}`, {
    cache: "no-store"
  })
    .then(res => res.json())
    .then(data => {

      if (!active) return;

      productCache[category] = data;

      setProducts(data);

      setLoading(false);

    })
    .catch(() => {

      if (!active) return;

      setLoading(false);

    });

  return () => {
    active = false;
  };

}, [categoryId]);


useEffect(() => {

  if (preloaded.has("done")) return;

  preloaded.add("done");

  fetch("/api/categories/dropdown")
    .then(res => res.json())
    .then(categories => {

      categories.forEach(cat => {

        fetch(`/api/products/list?category=${cat._id}`)
          .then(res => res.json())
          .then(data => {

            productCache[cat._id] = data;

          });

      });

    });

}, []);

  /*
  CART
  */
  const totalItems = cart.reduce((a, i) => a + i.qty, 0);
  const totalPrice = cart.reduce((a, i) => a + i.sellingPrice * i.qty, 0);

  if (loading) {
  return (
    <section className="px-4 py-10">
      <div className="grid grid-cols-2 gap-3">
        {[...Array(6)].map((_,i)=>(
          <div
            key={i}
            className="h-64 rounded-3xl bg-white animate-pulse"
          />
        ))}
      </div>
    </section>
  );
}


  return (
    <section id="products" className="px-4 py-6 bg-[#fffaf5] min-h-[500px]">
      

      <div
      
       
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >

        {products.map(product => (
          <div key={product._id} id={`product-${product._id}`}>
            <ProductCard product={product} />
          </div>
        ))}

      </div>

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