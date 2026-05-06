"use client";

import { useEffect, useState,useRef } from "react";
import { motion } from "framer-motion";

import Image from "next/image";


export default function CategoryPills({ active ,onChange}){



  const [categories,setCategories]=useState([]);
  const scrollRef = useRef(null);
  
 

useEffect(() => {

  const container = scrollRef.current;

  const activeEl = document.querySelector(
    `[data-id="${active}"]`
  );

  if (!container || !activeEl) return;

  const left =
    activeEl.offsetLeft - 16;

  container.scrollTo({
    left,
    behavior: "smooth"
  });

}, [active,categories]);


  useEffect(()=>{
    fetch("/api/categories/dropdown")
    .then(res=>res.json())
    .then(setCategories);
  },[]);

const handleClick = (id) => {

  if (id === active) return;

  onChange?.(id);

  window.history.replaceState(
    null,
    "",
    `/category/${id}`
  );

  requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

};


  return(

    <div className="px-4 py-3 sticky top-[60px] z-40 bg-white border-b border-gray-100">

      <div
  ref={scrollRef}
  className="flex gap-3 overflow-x-auto no-scrollbar"
>

        {/* ALL */}
        <Pill
        id="all"
          label="All"
          image="/category/all.jpg"
          active={active==="all"}
          onClick={()=>handleClick("all")}
          
        />

        {categories.map(cat=>(
          <Pill
            key={cat._id}
            label={cat.name}
            image={cat.image}
            active={active===cat._id}
            onClick={()=>handleClick(cat._id)}
            id={cat._id}
          />
        ))}

      </div>

    </div>

  );
}



/*
🔥 SINGLE PILL WITH IMAGE
*/

function Pill({id,label,image,active,onClick}){

  return(

    <motion.button
    data-id={id}
      whileTap={{scale:0.95}}
      onClick={onClick}
      className={`

      flex items-center gap-2
      whitespace-nowrap
      px-3 py-2 rounded-full text-sm font-medium transition

      ${active
        ? "bg-[var(--primary)] text-white shadow-md"
        : "bg-gray-100 text-gray-700"
      }

      `}
    >

      {/* IMAGE */}
      <div className={`

        w-7 h-7 rounded-full overflow-hidden relative

        ${active ? "ring-2 ring-white" : ""}

      `}>

        {image ? (
<Image
  src={image}
  alt={label}
  fill
  sizes="28px"
  className="object-cover"
/>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs">
            🎁
          </div>
        )}

      </div>

      {/* TEXT */}
      <span>{label}</span>

    </motion.button>

  );
}