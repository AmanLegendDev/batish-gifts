"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import {
Search,
ArrowRight,
Sparkles,
Star,
ShieldCheck,
Truck,
Gift,
ChevronRight
} from "lucide-react";

export default function Hero() {

const quickCategories = [
{
name:"Gifts",
image:"/hero/cat-gifts.jpg",
bg:"bg-orange-100"
},
{
name:"Toys",
image:"/hero/cat-toys.jpg",
bg:"bg-pink-100"
},
{
name:"Decor",
image:"/hero/cat-decor.jpg",
bg:"bg-amber-100"
},
{
name:"Shawls",
image:"/hero/cat-shawls.jpg",
bg:"bg-cyan-100"
},
];

return(

<section className="relative overflow-hidden bg-[#fffaf5]">


<div className="absolute -top-24 -left-20 w-[240px] h-[240px] rounded-full bg-orange-200 blur-3xl opacity-40"/>

<div className="absolute top-1/3 right-0 w-[220px] h-[220px] rounded-full bg-orange-100 blur-3xl opacity-50"/>


<div className="relative z-10 max-w-7xl mx-auto px-4 pt-4 pb-7 md:pt-6">






{/* SEARCH */}

<motion.div
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{delay:0.2}}
className="mt-5"
>

<div className="mx-auto flex h-14 max-w-2xl items-center gap-3 rounded-2xl border border-orange-200 bg-white px-4 shadow-[0_12px_35px_rgba(0,0,0,0.06)]">

<Search
size={20}
className="text-slate-400 shrink-0"
/>

<input
type="text"
placeholder="Search gifts, toys, decor, accessories..."
className="w-full bg-transparent text-[14px] text-slate-700 outline-none placeholder:text-slate-400"
/>

<button className="hidden sm:flex h-10 items-center justify-center rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white">

Search

</button>

</div>

</motion.div>


{/* QUICK CATEGORIES */}

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.25}}
className="mt-5 overflow-x-auto scrollbar-hide"
>

<div className="flex min-w-max gap-3 px-1">

{quickCategories.map((item,index)=>(

<Link
key={index}
href="/category/all"
className="group"
>

<div className="flex w-[86px] flex-col items-center">

<div className={`relative w-[74px] h-[74px] rounded-[24px] overflow-hidden border border-white shadow-md ${item.bg}`}>

<Image
src={item.image}
alt={item.name}
fill
className="object-cover group-hover:scale-110 transition-all duration-300"
/>

</div>

<p className="mt-2 text-[12px] font-semibold text-slate-700">

{item.name}

</p>

</div>

</Link>

))}

</div>

</motion.div>


{/* MAIN BANNERS */}

<motion.div
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{delay:0.3}}
className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_0.8fr]"
>


{/* BIG BANNER */}

<div className="relative overflow-hidden rounded-[32px] border border-orange-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">


<div className="relative aspect-[4/4.2] sm:aspect-[16/9]">

<Image
src="/hero/main-banner.jpg"
alt="banner"
fill
priority
className="object-cover"
/>

<div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"/>

</div>


<div className="absolute inset-0 flex flex-col justify-between p-5 md:p-7">


{/* OFFER */}

<div className="flex items-start justify-between gap-3">

<div className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-500 backdrop-blur">

🔥 Trending Collection

</div>

<div className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur">

LIMITED OFFER

</div>

</div>


{/* CONTENT */}

<div className="max-w-[260px] md:max-w-[420px]">

<h2 className="text-[28px] leading-[0.95] font-black tracking-[-0.05em] text-white md:text-[54px]">

Premium Gifts

<span className="block text-orange-300">

Starting ₹299

</span>

</h2>

<p className="mt-3 text-[12px] leading-relaxed text-white/90 md:text-sm">

Explore toys, hampers, decor and trending lifestyle gifts for every celebration.

</p>


<Link
href="/category/all"
className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-600"
>

Shop Collection

<ArrowRight size={16}/>

</Link>

</div>

</div>

</div>


{/* SIDE PROMOS */}

<div className="grid gap-4">


{/* CARD 1 */}

<div className="relative overflow-hidden rounded-[28px] border border-orange-100 bg-[#101828] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">

<div className="absolute right-0 top-0 h-full w-[45%]">

<Image
src="/hero/banner-2.jpg"
alt="promo"
fill
className="object-cover opacity-90"
/>

</div>

<div className="relative z-10 max-w-[55%]">

<div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur">

🎁 Best Sellers

</div>

<h3 className="mt-3 text-[24px] leading-[1] font-black tracking-[-0.04em] text-white">

Up To

<span className="block text-orange-400">

40% OFF

</span>

</h3>

<p className="mt-2 text-[11px] leading-relaxed text-white/70">

Cute toys and gift hampers now available.

</p>

</div>

</div>


{/* CARD 2 */}

<div className="relative overflow-hidden rounded-[28px] border border-orange-100 bg-orange-500 p-4 shadow-[0_16px_40px_rgba(255,115,0,0.20)]">


<div className="absolute right-0 bottom-0 h-full w-[48%]">

<Image
src="/hero/banner-3.jpg"
alt="promo"
fill
className="object-cover opacity-95"
/>

</div>


<div className="relative z-10 max-w-[55%]">

<div className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur">

✨ New Arrival

</div>

<h3 className="mt-3 text-[24px] leading-[1] font-black tracking-[-0.04em] text-white">

Luxury Decor

<span className="block text-orange-100">

Collection

</span>

</h3>

<p className="mt-2 text-[11px] leading-relaxed text-white/80">

Elegant accessories and premium decor gifts.

</p>

</div>

</div>

</div>

</motion.div>


{/* BOTTOM STRIP */}

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.35}}
className="mt-5 flex flex-wrap items-center justify-center gap-2"
>

<div className="flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 shadow-sm">

<ShieldCheck
size={14}
className="text-green-600"
/>

<p className="text-[11px] font-semibold text-slate-700">

Trusted Products

</p>

</div>

<div className="flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 shadow-sm">

<Truck
size={14}
className="text-orange-500"
/>

<p className="text-[11px] font-semibold text-slate-700">

Fast Support

</p>

</div>

<div className="flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 shadow-sm">

<Gift
size={14}
className="text-pink-500"
/>

<p className="text-[11px] font-semibold text-slate-700">

500+ Gift Items

</p>

</div>

<div className="flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 shadow-sm">

<Star
size={14}
className="text-yellow-500"
/>

<p className="text-[11px] font-semibold text-slate-700">

4.9 Customer Rating

</p>

</div>

</motion.div>


{/* MINI CTA */}

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.4}}
className="mt-5 flex justify-center"
>

<Link
href="/category/all"
className="group inline-flex items-center gap-2 text-sm font-bold text-orange-500"
>

Browse Full Marketplace

<ChevronRight
size={16}
className="transition-all group-hover:translate-x-1"
/>

</Link>

</motion.div>

</div>

</section>

);

}