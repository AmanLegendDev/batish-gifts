"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CategorySlider() {

  const [categories,setCategories]=useState([]);

  useEffect(()=>{
    fetch("/api/categories/dropdown")
    .then(res=>res.json())
    .then(setCategories);
  },[]);

  return(

    <section className="py-10 bg-white">

      {/* HEADER */}
      <div className="px-4 mb-5 flex items-center justify-between">

        <div>
          <p className="text-xs tracking-[3px] text-[var(--primary)] uppercase">
            Browse
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            Categories
          </h2>
        </div>

        <Link
          href="/category/all"
          className="text-sm text-[var(--primary)] font-medium"
        >
          View All →
        </Link>

      </div>


      {/* SLIDER */}
      <div className="overflow-x-auto no-scrollbar px-4">

        <div className="flex gap-4 w-max">

          {/* ALL */}
          <CategoryItem
            title="All"
            image="/category/all.jpg"
            href="/category/all"
          />

          {categories.map((cat,index)=>(

            <motion.div
              key={cat._id}
              initial={{opacity:0, scale:0.9}}
              animate={{opacity:1, scale:1}}
              transition={{delay:index*0.05}}
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

    </section>

  );
}


/*
🔥 CATEGORY ITEM
*/

function CategoryItem({title,image,href}){

  return(

    <Link href={href}>

      <motion.div
        whileTap={{scale:0.95}}
        className="flex flex-col items-center gap-2 min-w-[90px] cursor-pointer"
      >

        {/* IMAGE */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-sm border border-gray-100">

          <Image
            src={image || "/placeholder.png"}
            alt={title}
            fill
            className="object-cover"
          />

        </div>

        {/* TITLE */}
        <p className="text-xs text-gray-700 text-center line-clamp-1">
          {title}
        </p>

      </motion.div>

    </Link>

  );
}