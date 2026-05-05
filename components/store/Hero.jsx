"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {

return (

<section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-5">


{/* BACKGROUND */}

<div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-white to-white" />


{/* FLOATING IMAGES (VISIBLE NOW) */}

{/* LEFT TOP */}
<motion.div
initial={{opacity:0, y:-20}}
animate={{opacity:1, y:0}}
transition={{delay:0.2}}
className="absolute top-16 left-4 w-20 rotate-[-8deg] shadow-lg rounded-xl overflow-hidden"
>
<Image src="/hero/gift-1.jpg" width={100} height={100} alt="gift"/>
</motion.div>

{/* RIGHT TOP */}
<motion.div
initial={{opacity:0, y:-20}}
animate={{opacity:1, y:0}}
transition={{delay:0.3}}
className="absolute top-24 right-6 w-24 rotate-[10deg] shadow-lg rounded-xl overflow-hidden"
>
<Image src="/hero/gift-2.jpg" width={120} height={120} alt="gift"/>
</motion.div>

{/* LEFT BOTTOM */}
<motion.div
initial={{opacity:0, y:20}}
animate={{opacity:1, y:0}}
transition={{delay:0.4}}
className="absolute bottom-20 left-6 w-24 rotate-[6deg] shadow-lg rounded-xl overflow-hidden"
>
<Image src="/hero/gift-3.jpg" width={120} height={120} alt="gift"/>
</motion.div>

{/* RIGHT BOTTOM */}
<motion.div
initial={{opacity:0, y:20}}
animate={{opacity:1, y:0}}
transition={{delay:0.5}}
className="absolute bottom-16 right-4 w-20 rotate-[-6deg] shadow-lg rounded-xl overflow-hidden"
>
<Image src="/hero/gift-4.jpg" width={100} height={100} alt="gift"/>
</motion.div>


{/* MAIN CONTENT */}

<div className="relative z-10 max-w-lg text-center space-y-6">


{/* BADGE */}

<motion.div
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
className="inline-block text-xs px-4 py-1 rounded-full bg-[var(--primary-soft)] text-[var(--primary)]"
>
Perfect Gifts 🎁
</motion.div>


{/* HEADLINE */}

<motion.h1
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:.5}}
className="text-3xl md:text-4xl font-semibold leading-tight text-gray-900"
>

Find the Perfect Gift

<span className="block text-[var(--primary)]">

for Someone Special

</span>

</motion.h1>


{/* SUBTEXT */}

<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:.2}}
className="text-gray-500 text-sm"
>

Toys • Combos • Cute Gifts • Stationery

Order instantly on WhatsApp 💬

</motion.p>


{/* CTA */}

<motion.div
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{delay:.3}}
className="flex gap-3 justify-center"
>

<Link
href="category/all"
className="bg-[var(--primary)] text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow hover:scale-[1.04] transition"
>
Explore
</Link>



</motion.div>


{/* TRUST */}

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:.4}}
className="flex justify-center gap-4 text-xs text-gray-400"
>
<span>✨ Unique</span>
<span>⚡ Fast</span>
<span>💝 Easy</span>
</motion.div>


</div>

</section>

);
}