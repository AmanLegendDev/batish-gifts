"use client";

import { useEffect,useState } from "react";
import { X,Search } from "lucide-react";

import { useRouter, usePathname } from "next/navigation";


export default function SearchOverlay({open,onClose}){
    
    const [query,setQuery]=useState("");
    const [results,setResults]=useState([]);
    const router = useRouter();
    const pathname = usePathname();

useEffect(()=>{

if(!query)return setResults([]);

const timer=setTimeout(async()=>{

const res=await fetch(
`/api/products/search?q=${query}`
);

const data=await res.json();

setResults(Array.isArray(data) ? data : []);

},250);

return()=>clearTimeout(timer);

},[query]);


if(!open)return null;


return(

<div className="fixed inset-0 z-[100] bg-[#020617] flex flex-col px-5 pt-16">


{/* CLOSE BUTTON */}

<button
onClick={onClose}
className="absolute top-6 right-5 text-white"
>

<X size={26}/>

</button>


{/* INPUT */}

<div className="flex items-center gap-3 border border-white/10 rounded-xl px-4 py-3 bg-[#111827]">


<Search size={18}/>


<input
autoFocus
placeholder="Search any item..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
className="bg-transparent outline-none text-white w-full"
/>

</div>


{/* RESULTS */}

<div className="mt-6 space-y-4 cursor-pointer">


{results.map(item=>(

<div
key={item._id}
onClick={() => {

  // CASE: already on category page
  if (pathname.startsWith("/category")) {

    window.dispatchEvent(
      new CustomEvent("categorySelected", {
        detail: item.category._id
      })
    );

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("scrollToProduct", {
          detail: item._id
        })
      );
    }, 200);

  } else {

    // 🔥 go to category page
    router.push(`/category/${item.category._id}?product=${item._id}`);

  }

  onClose();
}}

className="text-white border-b border-white/5 pb-3"
>

{item.name}

</div>

))}


{query && results.length===0 &&(

<p className="text-neutral-400">

No items found

</p>

)}


</div>


</div>

);

}