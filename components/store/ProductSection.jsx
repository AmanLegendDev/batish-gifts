"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

export default function ProductSection() {

const [products,setProducts]=useState([]);
const [filtered,setFiltered]=useState([]);

const {
cart,
addToCart,
increaseQty,
decreaseQty
} = useCartStore();


useEffect(()=>{

fetch("/api/products/list")
.then(res=>res.json())
.then(data=>{
setProducts(data);
setFiltered(data);
});

},[]);



useEffect(()=>{

const listener=(e)=>{

const id = e.detail;

let tries = 0;

const checkElement = setInterval(()=>{

const el = document.getElementById(id);

if(el){

el.scrollIntoView({
behavior:"smooth",
block:"center"
});

clearInterval(checkElement);

}

tries++;

if(tries>15){

clearInterval(checkElement);

}

},100);

};

window.addEventListener(
"scrollToProduct",
listener
);

return ()=>{

window.removeEventListener(
"scrollToProduct",
listener
);

};

},[]);


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



const getQty = (id) => {

const item = cart.find(i => i._id === id);

return item ? item.qty : 0;

};


const totalItems = cart.reduce(
(acc,item)=>acc+item.qty,
0
);

const totalPrice = cart.reduce(
(acc,item)=>acc + item.sellingPrice * item.qty,
0
);


return(

<section  id="products" className="bg-[#020617] text-white px-4 pt-1 pb-2 mt-2">


<div className="grid grid-cols-2 md:grid-cols-4 gap-4">


{filtered.map(product=>{

const qty = getQty(product._id);

return(

<div id={product._id}
key={product._id}
className="bg-[#020617] border border-white/10 rounded-2xl p-3 shadow-md hover:border-yellow-400 transition flex flex-col"
>


{/* IMAGE */}

<div className="relative w-full aspect-square rounded-xl bg-black/20 overflow-hidden">

<Image
src={product.image}
fill
sizes="(max-width:740px) 50vw, 25vw"
alt={product.name}
className="object-cover rounded-t-2xl"
/>

</div>


{/* TITLE */}

<h3 className="text-sm font-semibold mt-2 line-clamp-2">

{product.name}

</h3>


{/* DESCRIPTION */}

<p className="text-xs text-neutral-400 line-clamp-2 mt-1 min-h-[30px]">

{product.description}

</p>


{/* PRICE + CART CONTROL */}

<div className="flex justify-between items-center mt-3">


<span className="text-yellow-400 font-semibold text-sm">

₹ {product.sellingPrice}

</span>


{qty === 0 ? (

<button

onClick={()=>addToCart(product)}

className="bg-yellow-400 text-black text-xs px-3 py-1.5 rounded-lg font-semibold"

>

ADD

</button>

) : (

<div className="flex items-center gap-2 bg-yellow-400 text-black rounded-lg px-2 py-1">

<button
onClick={()=>decreaseQty(product._id)}
className="font-bold text-lg"
>

−

</button>

<span className="text-sm font-semibold">

{qty}

</span>

<button
onClick={()=>increaseQty(product._id)}
className="font-bold text-lg"
>

+

</button>

</div>

)}


</div>


</div>

);

})}


</div>


{/* STICKY CART BAR */}

<AnimatePresence>

{totalItems > 0 && (

<motion.div

initial={{ y:120, opacity:0 }}

animate={{ y:0, opacity:1 }}

exit={{ y:120, opacity:0 }}

transition={{ duration:.25 }}

className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-md bg-yellow-400 text-black rounded-2xl px-5 py-3 shadow-xl flex justify-between items-center"

>


{/* LEFT SIDE */}

<div className="flex flex-col leading-tight">

<span className="text-sm font-semibold">

{totalItems} item{totalItems > 1 && "s"}

</span>

<span className="text-xs font-medium opacity-80">

₹ {totalPrice}

</span>

</div>


{/* BUTTON */}

<Link

href="/cart"

className="bg-black text-yellow-400 px-4 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition"

>

View Cart →

</Link>


</motion.div>

)}

</AnimatePresence>


</section>

);

}