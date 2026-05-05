"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CategoryPills({ active ,onChange}){
const router = useRouter()

  const [categories,setCategories]=useState([]);
  
 

useEffect(() => {
  const el = document.querySelector(`[data-id="${active}"]`);
  if(el){
    el.scrollIntoView({
      behavior: "smooth",
      inline: "center"
    });
  }
}, [active]);
  useEffect(()=>{
    fetch("/api/categories/dropdown")
    .then(res=>res.json())
    .then(setCategories);
  },[]);


const handleClick = (id) => {
  if(id === active) return;
  router.replace(`/category/${id}`, { scroll: false });
};


  return(

    <div className="px-4 py-3 sticky top-[60px] z-40 bg-white border-b border-gray-100">

      <div className="flex gap-3 overflow-x-auto no-scrollbar">

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