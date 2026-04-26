"use client";

import Link from "next/link";
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

const [open, setOpen] = useState(false);

const cart = useCartStore(
state => state.cart
);

const totalItems = cart.reduce(
(acc, item) => acc + item.qty,
0
);


return (

<nav className="sticky top-0 z-50 bg-secondary/80 backdrop-blur border-b border-neutral-200">

<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">


{/* LOGO */}

<Link
href="/"
className="flex items-center gap-2"
>

<img
src="/logo.png"
className="h-7"
/>

<span className="text-primary text-lg font-semibold tracking-wide">

HILAIREOFFICIAL

</span>

</Link>



{/* DESKTOP MENU */}

<div className="hidden md:flex gap-8 items-center text-sm font-medium">


<Link
href="/products"
className="flex items-center gap-1 hover:text-primary transition"
>
    <Package size={18} />

Products

</Link>


{/* ORDER HISTORY BUTTON */}

<Link
href="/orders"
className="flex items-center gap-1 hover:text-primary transition"
>

<ClipboardList size={18} />

Orders

</Link>



{/* CART */}

<Link
href="/cart"
className="relative hover:text-primary transition"
>

<ShoppingCart size={20} />

{totalItems > 0 && (

<span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1.5 rounded-full">

{totalItems}

</span>

)}

</Link>

</div>



{/* MOBILE BUTTON */}

<button
onClick={() => setOpen(!open)}
className="md:hidden"
>

{open ? <X size={22}/> : <Menu size={22}/>}

</button>


</div>



{/* MOBILE MENU */}

<AnimatePresence>

{open && (

<motion.div

initial={{ opacity: 0, y: -20 }}

animate={{ opacity: 1, y: 0 }}

exit={{ opacity: 0, y: -20 }}

transition={{ duration: 0.2 }}

className="md:hidden bg-white border-t"

>

<div className="flex flex-col px-6 py-4 gap-4">


<Link
href="/products"
onClick={() => setOpen(false)}
className="flex items-center gap-2 text-sm font-medium"
>
    <Package size={18} />

Products

</Link>


{/* MOBILE ORDER HISTORY */}

<Link
href="/orders"
onClick={() => setOpen(false)}
className="flex items-center gap-2 text-sm font-medium"
>

<ClipboardList size={18}/>

Orders

</Link>



<Link
href="/cart"
onClick={() => setOpen(false)}
className="flex items-center gap-2 text-sm font-medium"
>

<ShoppingCart size={18}/>

Cart

{totalItems > 0 && (

<span className="bg-primary text-white text-xs px-2 rounded-full">

{totalItems}

</span>

)}

</Link>


</div>

</motion.div>

)}

</AnimatePresence>

</nav>

);

}