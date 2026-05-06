"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CategorySlider() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    fetch("/api/categories/dropdown")
      .then(res => res.json())
      .then(setCategories);

  }, []);

  return (

    <section className="relative py-10 bg-gradient-to-b from-[#fffaf5] to-white overflow-hidden">

      {/* SOFT BG GLOW */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-[var(--primary)]/5 rounded-full blur-3xl" />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="px-4 mb-6 flex items-end justify-between">

          <div>

            <p className="text-[11px] tracking-[4px] text-[var(--primary)] uppercase font-medium">
              Browse
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-1">
              Categories
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Explore gifts for every moment ✨
            </p>

          </div>

          <Link
            href="/category/all"
            className="text-sm text-[var(--primary)] font-semibold"
          >
            View All →
          </Link>

        </div>


        {/* SLIDER */}
        <div className="overflow-x-auto no-scrollbar px-4">

          <div className="flex gap-4 w-max pb-2">

            {/* ALL */}
            <CategoryItem
              title="All Gifts"
              image="/category/all.jpg"
              href="/category/all"
              priority
            />

            {categories.map((cat, index) => (

              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                viewport={{ once: true }}
              >

                <CategoryItem
                  title={cat.name}
                  image={cat.image}
                  href={`/category/${cat._id}`}
                />

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>

  );

}


/*
🔥 CATEGORY ITEM
*/

function CategoryItem({
  title,
  image,
  href
}) {

  return (

    <Link href={href}>

      <motion.div
        whileTap={{ scale: 0.96 }}
        whileHover={{ y: -3 }}
        className="
        group
        relative
        min-w-[108px]
        rounded-[28px]
        bg-white/90
        backdrop-blur
        border border-white
        shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        p-3
        flex flex-col items-center
        gap-3
        transition-all
        duration-300
      "
      >

        {/* IMAGE */}
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden">

          <Image
            src={image || "/placeholder.png"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />

        </div>


        {/* TITLE */}
        <p className="text-[12px] font-medium text-gray-700 text-center leading-tight line-clamp-2">
          {title}
        </p>


        {/* SOFT GLOW */}
        <div className="absolute inset-0 rounded-[28px] ring-1 ring-black/5 pointer-events-none" />

      </motion.div>

    </Link>

  );

}