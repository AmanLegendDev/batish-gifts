"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
Menu,
X,
LayoutDashboard,
Package,
ClipboardList,
Tags,
PlusCircle,
LogOut,
Sparkles,
ChevronRight
} from "lucide-react";

export default function AdminLayout({ children }) {

const [open,setOpen]=useState(false);

const closeSidebar=()=>setOpen(false);

const navItems=[
{
href:"/admin/dashboard",
label:"Dashboard",
icon:<LayoutDashboard size={18}/>
},
{
href:"/admin/products",
label:"Manage Products",
icon:<Package size={18}/>
},
{
href:"/admin/products/create",
label:"Add Product",
icon:<PlusCircle size={18}/>
},
{
href:"/admin/orders",
label:"Orders",
icon:<ClipboardList size={18}/>
},
{
href:"/admin/categories",
label:"Categories",
icon:<Tags size={18}/>
},
];

return(

<div className="min-h-screen bg-[#fffaf5] flex overflow-hidden">


{/* OVERLAY */}

{open &&(

<div
onClick={closeSidebar}
className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
/>

)}


{/* SIDEBAR */}

<aside
className={`
fixed md:static top-0 left-0 z-50
w-[86%] max-w-[320px] md:w-[290px]
h-screen
bg-white
border-r border-orange-100
shadow-[0_0_40px_rgba(0,0,0,0.08)]
flex flex-col
transition-all duration-300
${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
`}
>


{/* TOP */}

<div className="p-5 border-b border-orange-100 bg-[#fffaf5]">

<div className="flex items-center justify-between gap-3">

<div className="flex items-center gap-3 min-w-0">

<div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-white border border-orange-100 shadow-sm shrink-0">

<Image
src="/logo.jpg"
alt="Batish Gifts"
width={100}
height={100}
className="object-contain w-full h-full p-1.5"
/>

</div>

<div className="min-w-0">

<h2 className="text-base font-bold text-slate-900 truncate">

BATISH GIFTS

</h2>

<p className="text-xs text-slate-500">

Admin Commerce Panel

</p>

</div>

</div>

<button
onClick={closeSidebar}
className="md:hidden w-10 h-10 rounded-xl border border-orange-100 bg-white flex items-center justify-center"
>

<X size={20}/>

</button>

</div>

</div>


{/* NAV */}

<div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">

{navItems.map((item,index)=>(

<Link
key={index}
href={item.href}
onClick={closeSidebar}
className="group"
>

<div className="flex items-center justify-between rounded-2xl border border-transparent hover:border-orange-100 hover:bg-orange-50/70 px-4 py-3 transition-all">

<div className="flex items-center gap-3">

<div className="w-10 h-10 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-orange-500 shadow-sm">

{item.icon}

</div>

<div>

<p className="font-semibold text-slate-800 text-sm">

{item.label}

</p>

</div>

</div>

<ChevronRight
size={16}
className="text-slate-400 opacity-0 group-hover:opacity-100 transition-all"
/>

</div>

</Link>

))}

</div>


{/* BOTTOM */}

<div className="p-5 border-t border-orange-100 bg-[#fffaf5] space-y-4">

<div className="rounded-[28px] bg-orange-500 p-5 text-white shadow-xl shadow-orange-200">

<div className="flex items-center gap-2 mb-2">

<Sparkles size={18}/>

<p className="font-semibold">

Commerce Ready

</p>

</div>

<p className="text-[13px] leading-6 text-orange-50">

Manage products, categories and orders with a premium admin experience.

</p>

</div>

<button
onClick={()=>{
closeSidebar();
window.location.href="/";
}}
className="w-full h-12 rounded-2xl border border-red-200 bg-red-50 text-red-500 font-semibold hover:bg-red-100 transition-all flex items-center justify-center gap-2"
>

<LogOut size={18}/>

Logout

</button>

<p className="text-[11px] text-center text-slate-400">

Designed & Developed by Aman Digital Solutions

</p>

</div>

</aside>


{/* MAIN */}

<div className="flex-1 flex flex-col min-w-0">


{/* TOPBAR */}

<header className="sticky top-0 z-30 h-[74px] border-b border-orange-100 bg-[#fffaf5]/95 backdrop-blur-xl flex items-center justify-between px-4 md:px-6">

<div className="flex items-center gap-3 min-w-0">

<div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-white border border-orange-100 shadow-sm shrink-0">

<Image
src="/logo.jpg"
alt="Batish Gifts"
width={100}
height={100}
className="object-contain w-full h-full p-1.5"
/>

</div>

<div className="min-w-0">

<h1 className="font-bold text-slate-900 text-sm md:text-base truncate">

BATISH GIFTS ADMIN

</h1>

<p className="text-[11px] text-slate-500 hidden sm:block">

Premium commerce management panel

</p>

</div>

</div>

<button
onClick={()=>setOpen(!open)}
className="md:hidden w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-200"
>

{open
? <X size={22}/>
: <Menu size={22}/>
}

</button>

</header>


{/* CONTENT */}

<main className="flex-1 p-4 md:p-6 overflow-x-hidden">

<div className="max-w-7xl mx-auto w-full">

{children}

</div>

</main>

</div>

</div>

);

}