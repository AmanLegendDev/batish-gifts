"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
Menu,
X,
ShoppingCart,
Package,
ClipboardList
} from "lucide-react";

import {
motion,
AnimatePresence
} from "framer-motion";

import {
useCartStore
} from "@/store/cartStore";

export default function Navbar() {

const [open,setOpen]=useState(false);

const cart = useCartStore(
state=>state.cart
);

const totalItems = cart.reduce(
(acc,item)=>acc+item.qty,
0
);


return (

<nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#020617]/90 border-b border-white/10 shadow-lg">


<div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">


{/* LEFT SIDE LOGO */}

<Link
href="/"
className="flex items-center gap-3 group"
>

<motion.div
whileHover={{scale:1.05}}
className="relative w-12 h-12 rounded-full   overflow-hidden shadow-md"
>

<Image
src="/logo.png"
fill
alt="logo"
className="object-cover"
/>

</motion.div>


<motion.span
whileHover={{x:2}}
className="text-yellow-400 text-lg font-semibold tracking-wide"
>

Midnight Mart

</motion.span>

</Link>



{/* DESKTOP MENU */}

<div className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">


<NavItem
href="/products"
icon={<Package size={18}/>}
label="Products"
/>


<NavItem
href="/orders"
icon={<ClipboardList size={18}/>}
label="Orders"
/>



{/* CART */}

<Link
href="/cart"
className="relative group"
>

<motion.div
whileHover={{scale:1.1}}
className="text-neutral-300 group-hover:text-yellow-400 transition"
>

<ShoppingCart size={20}/>

</motion.div>


{totalItems>0 &&(

<motion.span
initial={{scale:0}}
animate={{scale:1}}
className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] px-1.5 rounded-full font-semibold"
>

{totalItems}

</motion.span>

)}

</Link>


</div>



{/* MOBILE BUTTON */}

<button
onClick={()=>setOpen(!open)}
className="md:hidden text-yellow-400"
>

{open ? <X size={24}/> : <Menu size={24}/>}

</button>


</div>



{/* MOBILE MENU */}

<AnimatePresence>

{open &&(

<motion.div

initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
exit={{opacity:0,y:-20}}

transition={{duration:0.25}}

className="md:hidden bg-[#020617] border-t border-white/10 backdrop-blur-xl"
>

<div className="flex flex-col px-6 py-5 gap-5 text-neutral-300">


<MobileNavItem
href="/products"
icon={<Package size={18}/>}
label="Products"
close={()=>setOpen(false)}
/>


<MobileNavItem
href="/orders"
icon={<ClipboardList size={18}/>}
label="Orders"
close={()=>setOpen(false)}
/>


<MobileNavItem
href="/cart"
icon={<ShoppingCart size={18}/>}
label={`Cart (${totalItems})`}
close={()=>setOpen(false)}
/>


</div>

</motion.div>

)}

</AnimatePresence>

</nav>

);

}



/*
DESKTOP NAV ITEM
*/

function NavItem({href,icon,label}){

return(

<Link
href={href}
className="flex items-center gap-2 hover:text-yellow-400 transition relative group"
>

{icon}

<span>{label}</span>


<motion.div

layoutId="navUnderline"

className="absolute left-0 -bottom-1 h-[2px] w-0 bg-yellow-400 group-hover:w-full transition-all"

/>

</Link>

);

}



/*
MOBILE NAV ITEM
*/

function MobileNavItem({href,icon,label,close}){

return(

<Link
href={href}

onClick={close}

className="flex items-center gap-3 text-sm hover:text-yellow-400 transition"

>

{icon}

{label}

</Link>

);

}