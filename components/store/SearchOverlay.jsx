"use client";

import { useEffect,useState } from "react";
import { X,Search } from "lucide-react";

import Image from "next/image";

export default function SearchOverlay({open,onClose}){

  const [query,setQuery]=useState("");
  const [results,setResults]=useState([]);
  const [loading,setLoading]=useState(false);

  
  

  /*
  🔥 INSTANT SEARCH (NO LAG)
  */
  useEffect(()=>{

    if(!query){
      setResults([]);
      return;
    }

    setLoading(true);

    const timer = setTimeout(async()=>{

      const res = await fetch(`/api/products/search?q=${query}`);
      const data = await res.json();

      setResults(data);
      setLoading(false);

    },150); // ⚡ FAST

    return ()=>clearTimeout(timer);

  },[query]);


  if(!open) return null;

  return(

    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex flex-col">

      {/* HEADER */}
      <div className="flex items-center gap-3 px-5 pt-6">

        <div className="flex-1 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg">

          <Search size={18} className="text-gray-500"/>

          <input
            autoFocus
            placeholder="Search gifts..."
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            className="outline-none w-full text-sm"
          />

        </div>

        <button onClick={onClose}>
          <X className="text-white" size={26}/>
        </button>

      </div>


      {/* RESULTS */}
      <div className="mt-6 px-5 overflow-y-auto">

        {loading && (
          <p className="text-white/70 text-sm">Searching...</p>
        )}

        {!loading && results.map(item=>(

          <div
            key={item._id}
onClick={() => {

  sessionStorage.setItem(
    "searchProduct",
    JSON.stringify({
      categoryId: item.category._id,
      productId: item._id
    })
  );

  window.location.href =
    `/category/${item.category._id}?product=${item._id}`;

}}
            className="flex items-center gap-3 py-3 border-b border-white/10 cursor-pointer"
          >

            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
              <Image
                src={item.image}
                fill
                alt={item.name}
                className="object-cover"
              />
            </div>

            <div className="flex-1">

              <p className="text-white text-sm line-clamp-1">
                {item.name}
              </p>

              <p className="text-xs text-white/60">
                ₹ {item.sellingPrice}
              </p>

            </div>

          </div>

        ))}

        {!loading && query && results.length===0 && (
          <p className="text-white/60 text-sm">
            No results found
          </p>
        )}

      </div>

    </div>

  );
}