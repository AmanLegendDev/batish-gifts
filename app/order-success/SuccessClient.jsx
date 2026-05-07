"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {

const [order,setOrder] = useState(null);
const params = useSearchParams();
const type = params.get("type");

/*
LOAD ORDER
*/
useEffect(()=>{
if(type==="custom") return;
const stored = localStorage.getItem("lastOrder");
if(stored) setOrder(JSON.parse(stored));
},[type]);

/*
CUSTOM ORDER
*/
if(type==="custom"){
return(
<section className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">

<motion.div
initial={{scale:0.7,opacity:0}}
animate={{scale:1,opacity:1}}
className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shadow"
>
<CheckCircle2 size={40} className="text-green-500"/>
</motion.div>

<h1 className="text-2xl font-semibold mt-6 text-gray-900">
Custom Order Received 🎁
</h1>

<p className="text-gray-500 mt-2 max-w-sm">
We’ve received your request successfully.  
Our team will contact you shortly with availability & pricing.
</p>

<div className="mt-4 text-sm bg-yellow-50 text-yellow-600 px-4 py-2 rounded-full">
Response time: 5–15 minutes ⚡
</div>

<Link
href="/"
className="mt-6 bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-semibold shadow"
>
Continue Shopping
</Link>

</section>
);
}

/*
LOADING
*/
if(!order){
return(
<section className="min-h-screen flex items-center justify-center bg-[#fffaf5] text-gray-500">
Loading your order...
</section>
);
}

/*
NORMAL SUCCESS
*/
return(

<section className="min-h-screen bg-[#fffaf5] flex flex-col items-center justify-center px-6 text-center">


{/* ICON */}

<motion.div
initial={{scale:0.6,opacity:0}}
animate={{scale:1,opacity:1}}
transition={{duration:.4}}
className="mb-4"
>
<CheckCircle2 size={64} className="text-green-500"/>
</motion.div>


{/* HEADLINE */}

<h1 className="text-2xl font-semibold text-gray-900">
Order Placed Successfully 🎉
</h1>

<p className="text-gray-500 mt-2 max-w-sm">
Your order has been received. We’ll contact you shortly for confirmation.
</p>


{/* PAYMENT BADGE */}

<div className="mt-4 text-sm bg-green-50 text-green-600 px-4 py-2 rounded-full">
💵 Cash on Delivery — Pay when it arrives
</div>

<div className="mt-3 text-xs bg-yellow-50 border border-yellow-100 text-yellow-700 px-4 py-3 rounded-2xl max-w-sm text-center">
✨ Prepaid orders may get special discounts or free gifts from the owner.
</div>


{/* SUMMARY CARD */}

<div className="mt-6 bg-white rounded-[28px] border border-white p-5 w-full max-w-sm text-left space-y-3 shadow-xl">

<p><span className="text-gray-400 text-sm">Name:</span><br/>{order.customerName}</p>

<p><span className="text-gray-400 text-sm">Phone:</span><br/>{order.phone}</p>

<p><span className="text-gray-400 text-sm">Address:</span><br/>{order.address}</p>


<div className="pt-1">

<p className="text-sm font-semibold text-gray-800 mb-3">
Ordered Items
</p>

<div className="space-y-2">

{order.items?.map((item,index)=>(

<div
  key={index}
  className="flex items-center justify-between bg-[#fffaf5] rounded-2xl px-3 py-2"
>

  <div>

    <p className="text-sm font-medium text-gray-800">
      {item.title}
    </p>

    <p className="text-xs text-gray-500">
      Qty: {item.qty}
    </p>

  </div>

  <p className="text-sm font-semibold text-[var(--primary)]">
    ₹ {item.price * item.qty}
  </p>

</div>

))}

</div>

</div>
<hr/>

<p className="flex justify-between font-medium">
<span>Total</span>
<span className="text-[var(--primary)]">₹ {order.totalAmount}</span>
</p>

</div>


{/* ACTION BUTTONS */}

<div className="mt-6 flex gap-3">

<Link
href="/"
className="bg-[var(--primary)] text-white px-5 py-3 rounded-xl font-semibold"
>
Shop More
</Link>

</div>


{/* FOOTER TEXT */}

<p className="text-xs text-gray-400 mt-6 max-w-xs">
Need help? Our team will contact you soon or you can reach us anytime.
</p>


</section>

);
}