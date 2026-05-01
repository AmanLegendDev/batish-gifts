"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

export default function ProductSection() {

const [products,setProducts]=useState([]);
const [filtered,setFiltered]=useState([]);
const [added,setAdded]=useState(null);

const addToCart=useCartStore(state=>state.addToCart);
const cart=useCartStore(state=>state.cart);


/*
FETCH PRODUCTS
*/

useEffect(()=>{

fetch("/api/products/list")
.then(res=>res.json())
.then(data=>{
setProducts(data);
setFiltered(data);
});

},[]);


/*
CATEGORY FILTER LISTENER
*/

useEffect(()=>{

const listener=(e)=>{

const categoryId=e.detail;

if(categoryId==="all"){
setFiltered(products);
return;
}

setFiltered(
products.filter(
p=>p.category?._id===categoryId
)
);

};

window.addEventListener(
"categorySelected",
listener
);

return()=>window.removeEventListener(
"categorySelected",
listener
);

},[products]);


/*
ADD TO CART HANDLER
*/

const handleAdd=(product)=>{

addToCart(product);

setAdded(product._id);

setTimeout(()=>{
setAdded(null);
},2000);

};


/*
TOTAL ITEMS
*/

const totalItems=cart.reduce(
(acc,item)=>acc+item.qty,
0
);


return(

<section className="bg-[#020617] text-white px-4 pt-2 pb-32 mt-6">


{/* GRID */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">


{filtered.map(product=>(

<div

key={product._id}

className="bg-[#020617] border border-white/10 rounded-2xl p-3 shadow-sm flex flex-col"

>


{/* IMAGE BLOCK */}

<div className="relative w-full aspect-square rounded-xl bg-[#020617] border border-white/5 overflow-hidden">

<Image

src={product.image || "/placeholder.png"}

fill

alt={product.name}

className="object-contain p-2"

/>

</div>


{/* TITLE */}

<h3 className="text-sm font-medium mt-2 line-clamp-2">

{product.name}

</h3>


{/* DESCRIPTION */}

<p className="text-xs text-neutral-400 line-clamp-2 mt-1 min-h-[32px]">

{product.description}

</p>


{/* PRICE + BUTTON ROW */}

<div className="flex justify-between items-center mt-2">


<span className="text-yellow-400 text-sm font-semibold">

₹ {product.sellingPrice}

</span>


<button

onClick={()=>handleAdd(product)}

className={`

text-xs font-semibold px-3 py-1.5 rounded-lg transition

${added===product._id

? "bg-green-500 text-white"

: "bg-yellow-400 text-black"}

`}

>

{added===product._id

? "Added ✔"

: "ADD"}

</button>


</div>


</div>

))}


</div>


{/* STICKY CART POPUP */}

<AnimatePresence>

{totalItems>0 &&(

<motion.div

initial={{y:120,opacity:0}}

animate={{y:0,opacity:1}}

exit={{y:120,opacity:0}}

transition={{duration:.25}}

className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-yellow-400 text-black rounded-2xl px-5 py-3 shadow-xl flex justify-between items-center"

>


<div className="text-sm font-semibold">

{totalItems} items added

</div>


<Link

href="/cart"

className="bg-black text-yellow-400 px-4 py-2 rounded-lg text-sm font-semibold"

>

Proceed

</Link>


</motion.div>

)}

</AnimatePresence>


</section>

);

}