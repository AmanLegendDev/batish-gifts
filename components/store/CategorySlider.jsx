"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CategorySlider({ onSelect }) {

const [categories,setCategories]=useState([]);
const [active,setActive]=useState("all");

useEffect(()=>{

fetch("/api/categories/dropdown")
.then(res=>res.json())
.then(setCategories);

},[]);


const handleSelect=(id)=>{

setActive(id);

window.dispatchEvent(
new CustomEvent(
"categorySelected",
{ detail:id }
)
);

if(onSelect) onSelect(id);

};


return(

<section
id="categories"
className="bg-[#020617] sticky top-[64px] z-40 border-b border-white/5"
>


{/* CATEGORY STRIP */}

<div className="overflow-x-auto px-4 py-3">

<div className="flex gap-3 w-max">


{/* ALL CATEGORY */}

<button

onClick={()=>handleSelect("all")}

className={`flex items-center gap-2 px-4 py-2 rounded-full border transition

${active==="all"
? "bg-yellow-400 text-black border-yellow-400"
: "border-white/10 text-white hover:border-yellow-400"}

`}
>

All

</button>



{categories.map(cat=>(

<motion.button

key={cat._id}

whileTap={{scale:.95}}

onClick={()=>handleSelect(cat._id)}

className={`flex items-center gap-2 px-4 py-2 rounded-full border transition whitespace-nowrap

${active===cat._id
? "bg-yellow-400 text-black border-yellow-400"
: "border-white/10 text-white hover:border-yellow-400"}

`}
>


<div className="w-8 h-8 relative rounded-full overflow-hidden border border-white/20">

<Image
src={cat.image || "/placeholder.png"}
alt={cat.name}
fill
className="object-cover"
/>

</div>


{cat.name}


</motion.button>

))}


</div>

</div>


</section>

);

}