"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

import ProductCard from "@/components/store/ProductCard";
export default function ProductSection() {

const [products,setProducts]=useState([]);
const [filtered,setFiltered]=useState([]);

const { cart, addToCart, increaseQty, decreaseQty } = useCartStore();

useEffect(() => {

  const listener = (e) => {
    const id = e.detail;

    const el = document.getElementById(`product-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  window.addEventListener("scrollToProduct", listener);

  return () => window.removeEventListener("scrollToProduct", listener);

}, []);


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
const categoryId=e.detail;

if(categoryId==="all"){
setFiltered(products);
return;
}

setFiltered(products.filter(p=>p.category?._id===categoryId));
};

window.addEventListener("categorySelected",listener);
return()=>window.removeEventListener("categorySelected",listener);

},[products]);


const getQty = (id) => {
const item = cart.find(i => i._id === id);
return item ? item.qty : 0;
};

const totalItems = cart.reduce((a,i)=>a+i.qty,0);
const totalPrice = cart.reduce((a,i)=>a+i.sellingPrice*i.qty,0);


return(

<section id="products" className="px-4 py-6 bg-white">

{/* GRID */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">

{filtered.map(product => (

  
  <div key={product._id} id={`product-${product._id}`}>
  <ProductCard  product={product} />
</div>

))}

</div>


{/* FLOAT CART */}

<AnimatePresence>

{totalItems > 0 && (

<motion.div
initial={{y:100,opacity:0}}
animate={{y:0,opacity:1}}
exit={{y:100,opacity:0}}
className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[var(--primary)] text-white rounded-2xl px-5 py-3 shadow-lg flex justify-between items-center"
>

<div>
<p className="text-sm font-semibold">
{totalItems} item{totalItems>1 && "s"}
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