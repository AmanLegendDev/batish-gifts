"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
Menu,
X,
Package,
ClipboardList
} from "lucide-react";

export default function AdminLayout({ children }) {

const [open,setOpen]=useState(false);

return (

<div className="flex min-h-screen bg-[#020617] text-white">


{/* OVERLAY */}

{open && (

<div
className="fixed inset-0 bg-black/50 z-40 md:hidden"
onClick={()=>setOpen(false)}
/>

)}



{/* SIDEBAR */}

<aside
className={`
fixed md:static top-0 left-0 h-full w-64
bg-[#020617]
border-r border-gray-800
p-6
z-50
transition-transform duration-300

${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
`}
>


{/* SIDEBAR LOGO */}

<div className="flex items-center gap-3 mb-10">

<div className="w-12 h-12 rounded-full border-2 border-yellow-400 overflow-hidden">

<Image
src="/logo.png"
alt="logo"
width={48}
height={48}
/>

</div>

<span className="text-yellow-400 font-semibold">

Midnight Admin

</span>

</div>



{/* NAV LINKS */}

<nav className="flex flex-col gap-4 text-sm">


<Link href="/admin/products">

<div className="flex items-center gap-3 hover:text-yellow-400">

<Package size={18}/>

Products

</div>

</Link>


<Link href="/admin/orders">

<div className="flex items-center gap-3 hover:text-yellow-400">

<ClipboardList size={18}/>

Orders

</div>

</Link>

<Link href="/admin/categories">

<div className="flex items-center gap-3 hover:text-yellow-400">

<Package size={18}/>

Categories

</div>

</Link>


</nav>

</aside>



{/* MAIN SECTION */}

<div className="flex-1 flex flex-col">


{/* NAVBAR */}

<header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-gray-800">


{/* LEFT SIDE LOGO */}

<div className="flex items-center gap-3">

<div className="w-9 h-9 rounded-full border border-yellow-400 overflow-hidden">

<Image
src="/logo.png"
alt="logo"
width={36}
height={36}
/>

</div>

<span className="text-yellow-400 font-semibold text-sm md:text-base">

Midnight Mart

</span>

</div>



{/* RIGHT SIDE BUTTON */}

<button
onClick={()=>setOpen(!open)}
className="md:hidden"
>

{open ? <X size={22}/> : <Menu size={22}/>}

</button>


</header>



{/* PAGE CONTENT */}

<main className="p-4 md:p-6">

{children}

</main>


</div>

</div>

);

}