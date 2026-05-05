"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
Menu,
X,
ShoppingCart,
ClipboardList,
Search
} from "lucide-react";

import SearchOverlay from "@/components/store/SearchOverlay";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {

const pathname = usePathname();

const showSearch =
  pathname === "/" || pathname.startsWith("/category");

const [open,setOpen]=useState(false);
const [searchOpen,setSearchOpen]=useState(false);

const cart = useCartStore(state=>state.cart);

const totalItems = cart.reduce((acc,item)=>acc+item.qty,0);

return (

<>

<nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">

<div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

{/* LOGO */}
<Link href="/" className="flex items-center gap-3">

<div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm">
<Image
src="/logo.jpg"
fill
alt="logo"
className="object-cover"
/>
</div>

<span className="text-sm font-semibold text-gray-800">
Aarav Gift Gallery
</span>

</Link>


{/* RIGHT */}
<div className="flex items-center gap-4">

{/* SEARCH */}
{showSearch && (
  <button
    onClick={() => setSearchOpen(true)}
    className="text-gray-700 hover:text-[var(--primary)] transition"
  >
    <Search size={20}/>
  </button>
)}

{/* CART */}
<Link href="/cart" className="relative">

<motion.div whileTap={{scale:0.9}}>
<ShoppingCart className="text-gray-700" size={20}/>
</motion.div>

{totalItems>0 &&(
<span className="absolute -top-2 -right-2 bg-[var(--primary)] text-white text-[10px] px-1.5 rounded-full font-semibold">
{totalItems}
</span>
)}

</Link>


{/* MENU */}
<button
onClick={()=>setOpen(!open)}
className="text-[var(--primary)]"
>
{open ? <X size={22}/> : <Menu size={22}/>}
</button>

</div>

</div>


{/* MOBILE MENU */}
<AnimatePresence>

{open &&(

<motion.div
initial={{opacity:0,y:-10}}
animate={{opacity:1,y:0}}
exit={{opacity:0,y:-10}}
className="bg-white border-t border-gray-200"
>

<div className="flex flex-col px-5 py-4 gap-4 text-gray-700">

<Link
href="/caregory"
onClick={()=>setOpen(false)}
className="flex items-center gap-3 hover:text-[var(--primary)]"
>
<ClipboardList size={18}/>
Explore
</Link>

<Link
href="/cart"
onClick={()=>setOpen(false)}
className="flex items-center gap-3 hover:text-[var(--primary)]"
>
<ShoppingCart size={18}/>
Cart ({totalItems})
</Link>
<Link
href="/custom-order"
onClick={()=>setOpen(false)}
className="flex items-center gap-3 hover:text-[var(--primary)]"
>
<ClipboardList size={18}/>
Custom Order
</Link>
</div>

</motion.div>

)}

</AnimatePresence>

</nav>


{/* 🔥 SEARCH OVERLAY */}
<SearchOverlay
open={searchOpen}
onClose={()=>setSearchOpen(false)}
/>

</>

);
}