"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {

return (

<section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">


{/* STATIC BACKGROUND IMAGE */}

<Image
src="/hero/hero-bg-1.jpg"
fill
priority
alt="hero background"
className="object-cover"
/>


{/* DARK OVERLAY */}

<div className="absolute inset-0 bg-[#020617]/70 backdrop-blur-[2px]" />


{/* CONTENT */}

<div className="relative z-10 max-w-3xl px-6 text-center space-y-6">


<motion.h1
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:.7}}
className="text-4xl md:text-6xl font-semibold text-white leading-tight"
>

Late night cravings?

<span className="text-yellow-400">

&nbsp;Solved inside campus.

</span>

</motion.h1>


<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:.3}}
className="text-neutral-300 text-sm md:text-lg max-w-xl mx-auto"
>

Snacks. Drinks. Essentials.

Delivered directly to your hostel room in minutes.

</motion.p>


<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:.5}}
className="flex gap-4 justify-center flex-wrap"
>


<Link
href="#categories"
className="bg-yellow-400 text-black px-7 py-3 rounded-xl font-semibold shadow-xl hover:scale-[1.06] transition"
>

Browse Items

</Link>


<Link
href="/custom-order"
className="border border-yellow-400 text-yellow-400 px-7 py-3 rounded-xl hover:bg-yellow-400 hover:text-black transition"
>

Custom Order

</Link>


</motion.div>


<div className="flex gap-6 justify-center text-xs text-neutral-400">

<span>⚡ 10–20 min delivery</span>

<span>🏫 HPU campus only</span>

<span>🌙 Midnight active</span>

</div>


</div>

</section>

);

}