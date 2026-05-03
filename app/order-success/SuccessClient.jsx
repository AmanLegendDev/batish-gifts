"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {

const [order,setOrder] = useState(null);

const params = useSearchParams();

const type = params.get("type");


/*
LOAD ORDER FROM LOCAL STORAGE
NORMAL ORDER ONLY
*/

useEffect(()=>{

if(type === "custom") return;

const storedOrder = localStorage.getItem("lastOrder");

if(storedOrder){

setOrder(JSON.parse(storedOrder));

}

},[type]);


/*
CUSTOM ORDER MODE
NO LOCAL STORAGE REQUIRED
*/

if(type === "custom"){

return(

<section className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center px-6 text-center">


{/* SPINNING LOGO */}

<motion.div
animate={{rotate:360}}
transition={{
repeat:Infinity,
duration:6,
ease:"linear"
}}
className="w-20 h-20 rounded-full border border-yellow-400 overflow-hidden shadow-lg"
>

<Image
src="/logo.png"
alt="logo"
width={80}
height={80}
/>

</motion.div>



{/* HEADLINE */}

<h1 className="text-3xl font-semibold text-yellow-400 mt-6">

Custom Request Sent 🚀

</h1>


<p className="text-neutral-400 mt-3 max-w-md">

We received your custom item request successfully.

Our team will contact you shortly on WhatsApp with availability and pricing.

</p>



{/* STATUS BADGE */}

<div className="mt-4 bg-yellow-400/10 border border-yellow-400 text-yellow-400 px-4 py-2 rounded-full text-sm">

Response expected within 5–10 minutes

</div>



{/* SUPPORT TEXT */}

<p className="text-neutral-500 text-xs mt-6 max-w-sm">

If urgent, feel free to contact us directly on WhatsApp anytime.

</p>



{/* BACK HOME BUTTON */}

<Link
href="/"
className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold shadow-lg"
>

Browse More Items

</Link>


</section>

);

}


/*
NORMAL ORDER LOADING STATE
*/

if(!order){

return(

<section className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

Preparing your order confirmation...

</section>

);

}


/*
NORMAL ORDER SUCCESS UI
*/

return(

<section className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center px-6 text-center">


{/* SPINNING LOGO */}

<motion.div
animate={{rotate:360}}
transition={{
repeat:Infinity,
duration:6,
ease:"linear"
}}
className="w-20 h-20 rounded-full border border-yellow-400 overflow-hidden shadow-lg"
>

<Image
src="/logo.png"
alt="logo"
width={80}
height={80}
/>

</motion.div>



{/* HEADLINE */}

<motion.h1
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:.2}}
className="text-3xl font-semibold text-yellow-400 mt-6"
>

Order Confirmed 🎉

</motion.h1>


<p className="text-neutral-400 mt-2 max-w-md">

Your order has been received successfully.

Our delivery partner is preparing your items now.

</p>



{/* ETA BADGE */}

<div className="mt-4 bg-yellow-400/10 border border-yellow-400 text-yellow-400 px-4 py-2 rounded-full text-sm">

Estimated delivery: 10–20 minutes 🚀

</div>



{/* ORDER SUMMARY */}

<div className="mt-6 bg-[#020617] border border-white/10 rounded-xl p-5 text-left max-w-md w-full space-y-3">


<p>

<span className="text-neutral-400">

Customer:

</span>

&nbsp;

{order.customerName}

</p>


<p>

<span className="text-neutral-400">

Hostel:

</span>

&nbsp;

{order.hostel}

</p>


<p>

<span className="text-neutral-400">

Room:

</span>

&nbsp;

{order.room}

</p>


<p className="text-yellow-400 font-semibold">

Total Paid: ₹ {order.totalAmount}

</p>


</div>



{/* TRACK BUTTON */}

<Link
href="/orders"
className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold shadow-lg"
>

Track Order

</Link>



{/* SUPPORT TEXT */}

<p className="text-neutral-500 text-xs mt-6 max-w-sm">

If your order is delayed, our delivery team will contact you shortly.

</p>



{/* BACK HOME BUTTON */}

<Link
href="/"
className="mt-4 border border-yellow-400 text-yellow-400 px-5 py-2 rounded-xl hover:bg-yellow-400 hover:text-black transition"
>

Back to Home

</Link>


</section>

);

}