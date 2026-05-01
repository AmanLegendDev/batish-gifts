"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const backgrounds = [
"/hero/hero-bg-1.jpg",
"/hero/hero-bg-2.jpg",
"/hero/hero-bg-3.jpg"
];

export default function Hero() {

const [index,setIndex]=useState(0);

/*
AUTO BACKGROUND SLIDESHOW
*/

useEffect(()=>{

const interval=setInterval(()=>{

setIndex(prev=>(prev+1)%backgrounds.length);

},5000);

return ()=>clearInterval(interval);

},[]);



return (

<section
className="relative min-h-screen flex items-center justify-center overflow-hidden"
>


{/* BACKGROUND SLIDESHOW */}

<AnimatePresence mode="wait">

<motion.div
key={backgrounds[index]}
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
transition={{duration:1.6}}
className="absolute inset-0"
>

<Image
src={backgrounds[index]}
fill
priority
alt="HPU campus night delivery background"
className="object-cover"
/>

</motion.div>

</AnimatePresence>



{/* DARK GLASS OVERLAY */}

<div className="absolute inset-0 bg-[#020617]/75 backdrop-blur-[2px]" />



{/* GLOW PARTICLE */}

<div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-yellow-400/10 blur-[160px] rounded-full animate-pulse" />



{/* HERO CONTENT */}

<div className="relative z-10 max-w-3xl px-6 text-center space-y-6">


{/* HEADLINE */}

<motion.h1
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:.7}}
className="mt-6text-4xl md:text-6xl font-semibold text-white leading-tight drop-shadow-[0_4px_40px_rgba(255,215,0,0.25)]"
>

HPU campus me late night

<span className="text-yellow-400">

&nbsp;ab sab milta hai room tak ⚡

</span>

</motion.h1>



{/* SUBTEXT */}

<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:.3}}
className="text-neutral-300 text-sm md:text-lg max-w-xl mx-auto"
>

Maggi, cold drinks, snacks ya emergency items —  
ab hostel se hi order karo aur 10-20 minutes me gate par delivery pao.

</motion.p>



{/* CTA BUTTONS */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:.5}}
className="flex gap-4 justify-center flex-wrap"
>


<Link
href="#categories"
className="bg-yellow-400 text-black px-7 py-3 rounded-xl font-semibold shadow-xl hover:scale-[1.07] transition"
>

Start Ordering Now

</Link>


<Link
href="/custom-order"
className="border border-yellow-400 text-yellow-400 px-7 py-3 rounded-xl hover:bg-yellow-400 hover:text-black transition"
>

Request Item Not Listed

</Link>


</motion.div>



{/* TRUST STRIP */}

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:.8}}
className="flex gap-6 justify-center text-xs text-neutral-400"
>

<span>⚡ 10-20 min campus delivery</span>

<span>🏫 Only for HPU students</span>

<span>🌙 Late night active service</span>

</motion.div>



{/* PHONE MOCKUP */}

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{delay:1}}
className="pt-6"
>



</motion.div>


</div>


{/* SCROLL INDICATOR */}

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:1.4}}
className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neutral-400 text-xs"
>

↓ Scroll to browse items

</motion.div>


</section>

);

}