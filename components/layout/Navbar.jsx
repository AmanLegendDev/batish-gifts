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
Search,
Gift,
Sparkles,
ChevronRight
} from "lucide-react";

import SearchOverlay from "@/components/store/SearchOverlay";

import {
motion,
AnimatePresence
} from "framer-motion";

import { useCartStore } from "@/store/cartStore";

export default function Navbar() {

const pathname = usePathname();

const showSearch =
pathname === "/" ||
pathname.startsWith("/category");

const [open,setOpen]=useState(false);

const [searchOpen,setSearchOpen]=useState(false);

const cart = useCartStore((state)=>state.cart);

const totalItems = cart.reduce(
(acc,item)=>acc+item.qty,
0
);

return(

<>

<nav className="sticky top-0 z-50 border-b border-orange-100 bg-[#fffaf5]/95 backdrop-blur-xl">

<div className="max-w-7xl mx-auto px-4">

<div className="h-[74px] flex items-center justify-between gap-3">


{/* LEFT */}

<div className="flex items-center gap-3 min-w-0">

<Link
href="/"
className="flex items-center gap-3 min-w-0"
>

{/* LOGO */}

<div className="relative w-12 h-12 shrink-0 rounded-2xl overflow-hidden bg-white border border-orange-100 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">

<Image
src="/logo.jpg"
width={100}
height={100}
alt="Batish Gifts"
className="object-contain w-full h-full p-1.5"
/>

</div>


{/* BRAND */}

<div className="min-w-0 hidden xs:block">

<h2 className="text-sm font-bold tracking-wide text-slate-900 truncate">

BATISH GIFTS

</h2>

<p className="text-[11px] text-slate-500 truncate">

Gifts • Toys • Lifestyle

</p>

</div>

</Link>

</div>


{/* DESKTOP NAV */}

<div className="hidden lg:flex items-center gap-2">

<Link
href="/category/all"
className="px-4 h-10 rounded-2xl flex items-center gap-2 text-sm font-medium text-slate-700 hover:bg-orange-50 transition-all"
>

<ClipboardList size={16}/>

Shop

</Link>

<Link
href="/custom-order"
className="px-4 h-10 rounded-2xl flex items-center gap-2 text-sm font-medium text-slate-700 hover:bg-orange-50 transition-all"
>

<Gift size={16}/>

Custom Gifts

</Link>

</div>


{/* RIGHT */}

<div className="flex items-center gap-2 shrink-0">


{/* SEARCH */}

{showSearch &&(

<button
onClick={()=>setSearchOpen(true)}
className="w-11 h-11 rounded-2xl bg-white border border-orange-100 flex items-center justify-center text-slate-700 hover:bg-orange-50 transition-all shadow-sm"
>

<Search size={19}/>

</button>

)}


{/* CART */}

<Link
href="/cart"
className="relative"
>

<motion.div
whileTap={{scale:0.92}}
className="w-11 h-11 rounded-2xl bg-white border border-orange-100 flex items-center justify-center text-slate-700 hover:bg-orange-50 transition-all shadow-sm"
>

<ShoppingCart size={19}/>

</motion.div>

{totalItems > 0 &&(

<div className="absolute -top-1 -right-1 min-w-[20px] h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center px-1.5 shadow-lg shadow-orange-200">

{totalItems}

</div>

)}

</Link>


{/* MENU */}

<button
onClick={()=>setOpen(!open)}
className="w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-200"
>

{open
? <X size={21}/>
: <Menu size={21}/>
}

</button>

</div>

</div>

</div>


{/* MOBILE MENU */}

<AnimatePresence>

{open &&(

<>

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
onClick={()=>setOpen(false)}
/>

<motion.div
initial={{x:"100%"}}
animate={{x:0}}
exit={{x:"100%"}}
transition={{
type:"spring",
damping:24,
stiffness:240
}}
className="fixed top-0 right-0 h-screen w-[86%] max-w-sm bg-[#fffaf5] z-50 shadow-[0_0_40px_rgba(0,0,0,0.12)] border-l border-orange-100 flex flex-col overflow-hidden" >

{/* TOP */}

<div className="p-5 border-b border-orange-100 bg-[#fffaf5]">

<div className="flex items-start justify-between gap-4">

<div className="flex items-center gap-3 min-w-0">

<div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-orange-100 bg-white shadow-sm">

<Image
src="/logo.jpg"
width={100}
height={100}
alt="Batish Gifts"
className="object-contain w-full h-full p-1.5"
/>

</div>

<div className="min-w-0">

<h2 className="text-lg font-bold text-slate-900 truncate">

BATISH GIFTS

</h2>

<p className="text-xs text-slate-500">

Premium shopping experience

</p>

</div>

</div>

<button
onClick={()=>setOpen(false)}
className="w-10 h-10 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-slate-700"
>

<X size={20}/>

</button>

</div>

</div>


{/* LINKS */}

<div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">


<Link
href="/category/all"
onClick={()=>setOpen(false)}
className="flex items-center justify-between rounded-2xl border border-orange-100 bg-orange-50/50 px-4 py-4 hover:bg-orange-50 transition-all"
>

<div className="flex items-center gap-3">

<div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-orange-100">

<ClipboardList
size={20}
className="text-orange-500"
/>

</div>

<div>

<p className="font-semibold text-slate-900">

Explore Products

</p>

<p className="text-xs text-slate-500">

Browse all shopping items

</p>

</div>

</div>

<ChevronRight
size={18}
className="text-slate-400"
/>

</Link>


<Link
href="/cart"
onClick={()=>setOpen(false)}
className="flex items-center justify-between rounded-2xl border border-orange-100 bg-white px-4 py-4 hover:bg-orange-50 transition-all"
>

<div className="flex items-center gap-3">

<div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100">

<ShoppingCart
size={20}
className="text-orange-500"
/>

</div>

<div>

<p className="font-semibold text-slate-900">

Your Cart

</p>

<p className="text-xs text-slate-500">

{totalItems} items added

</p>

</div>

</div>

<div className="min-w-[24px] h-6 px-2 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">

{totalItems}

</div>

</Link>


<Link
href="/custom-order"
onClick={()=>setOpen(false)}
className="flex items-center justify-between rounded-2xl border border-orange-100 bg-white px-4 py-4 hover:bg-orange-50 transition-all"
>

<div className="flex items-center gap-3">

<div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100">

<Gift
size={20}
className="text-orange-500"
/>

</div>

<div>

<p className="font-semibold text-slate-900">

Custom Order

</p>

<p className="text-xs text-slate-500">

Personalized gifting requests

</p>

</div>

</div>

<ChevronRight
size={18}
className="text-slate-400"
/>

</Link>

</div>


{/* BOTTOM */}

<div className="mt-auto p-5 border-t border-orange-100 bg-[#fffaf5] space-y-4">

<div className="rounded-3xl bg-orange-500 p-5 text-white shadow-xl shadow-orange-200">

<div className="flex items-center gap-2 mb-2">

<Sparkles size={18}/>

<p className="font-semibold">

Shop Better Gifts

</p>

</div>

<p className="text-sm text-orange-50 leading-relaxed">

Discover unique gifts, toys and lifestyle products curated for every occasion.

</p>

</div>

</div>

</motion.div>

</>

)}

</AnimatePresence>

</nav>


{/* SEARCH */}

<SearchOverlay
open={searchOpen}
onClose={()=>setSearchOpen(false)}
/>

</>

);

}