"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {

return (

<section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-2 pb-10">

{/* BACKGROUND IMAGE */}

<Image
src="/hero/hero-bg-1.jpg"
fill
priority
alt="MidnightMartHPU campus delivery"
className="object-cover"
/>


{/* DARK GLASS OVERLAY */}

<div className="absolute inset-0 bg-[#020617]/75 backdrop-blur-[2px]" />


{/* CONTENT */}

<div className="relative z-10 max-w-3xl px-6 text-center space-y-5">


{/* CAMPUS BADGE */}

<motion.div
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
className="inline-block text-xs px-4 py-1 rounded-full bg-yellow-400/10 border border-yellow-400 text-yellow-400"
>

Inside HPU Summerhill Campus 🚀

</motion.div>


{/* HEADLINE */}

<motion.h1
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{duration:.6}}
className="text-3xl md:text-5xl font-semibold text-white leading-snug"
>

Late Night Bhook Lagi?

<span className="text-yellow-400">

&nbsp;MidnightMartHPU Deliver Karega.

</span>

</motion.h1>


{/* SUBTEXT */}

<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:.2}}
className="text-neutral-300 text-sm md:text-lg max-w-xl mx-auto"
>

Maggi • Cold Drinks • Snacks • Coffee • Essentials

Hostel gate tak delivery in 10–15 minutes.

</motion.p>


{/* CTA BUTTONS */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:.4}}
className="flex gap-3 justify-center flex-wrap"
>

<Link
href="#categories"
className="bg-yellow-400 text-black px-7 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.05] transition"
>

Start Ordering ⚡

</Link>


<Link
href="/custom-order"
className="border border-yellow-400 text-yellow-400 px-7 py-3 rounded-xl hover:bg-yellow-400 hover:text-black transition"
>
Custom Order
</Link>

</motion.div>


{/* TRUST STRIP */}

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:.6}}
className="flex gap-5 justify-center text-xs text-neutral-400"
>

<span>⚡ 10–15 min delivery</span>

<span>🏫 All HPU hostels covered</span>

<span>🌙 Late night active</span>

</motion.div>


</div>

</section>

);

}