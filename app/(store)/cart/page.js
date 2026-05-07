"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage(){

const { cart, addToCart, removeItem, decreaseQty } = useCartStore();

const totalItems = cart.reduce((a,i)=>a+i.qty,0);

const subtotal = cart.reduce(
(a,i)=>a + i.sellingPrice * i.qty,
0
);


/*
WHATSAPP MESSAGE
*/

const generateMessage = () => {

let message = "Hello, I want to order:\n\n";

cart.forEach(item=>{
message += `- ${item.name} x${item.qty}\n`;
});

message += `\nTotal: ₹${subtotal}\n\nName:\nAddress:\n`;

return encodeURIComponent(message);

};


/*
EMPTY
*/

if(cart.length===0){

return(

<section className="min-h-screen bg-[#fffaf5]">

<Navbar/>

<div className="flex flex-col items-center justify-center py-32 text-center">

<h2 className="text-2xl font-semibold text-gray-800">
Your cart is empty 🛒
</h2>

<p className="text-gray-500 mt-2">
Add some beautiful gifts 🎁
</p>

<Link
href="/"
className="mt-6 bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-medium shadow"
>
Browse Products
</Link>

</div>

</section>

);

}


/*
MAIN
*/

return(

<section className="min-h-screen bg-white pb-32">

<Navbar/>


{/* HEADER */}

<div className="px-5 pt-6">

<h1 className="text-xl font-semibold text-gray-900">
Your Cart
</h1>

<p className="text-sm text-gray-500">
{totalItems} item{totalItems>1 && "s"}
</p>

</div>



{/* LIST */}

<div className="px-4 mt-4 space-y-4">

{cart.map(item=>(

<motion.div
key={item._id}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
className="flex gap-4 items-center bg-white/90 backdrop-blur border border-white rounded-[40px] p-3 shadow-md"
>


{/* IMAGE */}

<img
src={item.image}
className="w-20 h-20 rounded-xl object-cover"
/>


{/* DETAILS */}

<div className="flex-1">

<h3 className="text-sm font-medium text-gray-800 line-clamp-2">
{item.name}
</h3>

<p className="text-[var(--primary)] font-semibold text-sm mt-1">
₹ {item.sellingPrice}
</p>

<p className="text-xs text-gray-400">
Total ₹ {item.qty * item.sellingPrice}
</p>


{/* QTY */}

<div className="flex items-center gap-2 mt-2">

<button
onClick={()=>decreaseQty(item._id)}
className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
>
−
</button>

<span className="text-sm font-semibold">
{item.qty}
</span>

<button
onClick={()=>addToCart(item)}
className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center"
>
+
</button>

</div>

</div>


{/* DELETE */}

<button
onClick={()=>removeItem(item._id)}
className="text-red-500"
>
<Trash2 size={18}/>
</button>

</motion.div>

))}

</div>



{/* BOTTOM BAR */}

<AnimatePresence>

{/* BOTTOM BAR */}

<motion.div
initial={{y:100,opacity:0}}
animate={{y:0,opacity:1}}
className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-white px-4 py-4 flex items-center shadow-2xl"
>

<div className="flex-1">
  <p className="text-xs text-gray-400">Total</p>
  <p className="text-lg font-semibold text-[var(--primary)]">
    ₹ {subtotal}
  </p>
</div>

<Link
  href="/checkout"
  className="bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-semibold"
>
  Proceed
</Link>

</motion.div>

</AnimatePresence>

</section>

);
}