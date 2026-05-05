"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function CustomOrderPage(){

const [form,setForm]=useState({
  name:"",
  phone:"",
  address:"",
  item:"",
  note:""
});

const [loading,setLoading]=useState(false);

const handleChange=(e)=>{
  setForm({...form,[e.target.name]:e.target.value});
};

/*
🔥 MAIN FUNCTION
*/

const handleSubmit = async (type) => {

  if(!form.name || !form.phone || !form.address || !form.item){
    alert("Fill required fields");
    return;
  }

  setLoading(true);

  const payload = {
    customerName: form.name,
    phone: form.phone.replace(/^0/, ""),
    address: form.address, // ✅ REAL ADDRESS
    note: form.note,

    items: [
      {
        title: `Custom: ${form.item}`,
        price: 0,
        qty: 1
      }
    ],

    totalAmount: 0,

    orderType: type
  };

  await fetch("/api/orders/create", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify(payload)
  });

  setLoading(false);

  /*
  🔥 WHATSAPP FLOW
  */

  if(type === "custom_whatsapp"){

    const msg = `Hi, I want a custom order:

Item: ${form.item}

Name: ${form.name}
Phone: ${form.phone}
Address: ${form.address}`;

    window.open(
      `https://wa.me/918219174058?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  window.location.href="/order-success?type=custom";
};


return(

<section className="bg-white min-h-screen pb-24">

<Navbar/>

<div className="max-w-xl mx-auto px-5 pt-10">

{/* HEADER */}
<h1 className="text-2xl font-semibold text-gray-900">
Custom Order 🎁
</h1>

<p className="text-gray-500 mt-1 text-sm">
Tell us what you need — we’ll arrange it for you
</p>


{/* FORM */}
<div className="mt-6 space-y-4">

<input
name="name"
placeholder="Your Name"
className="input-style"
onChange={handleChange}
/>

<input
name="phone"
placeholder="Phone Number"
className="input-style"
onChange={handleChange}
/>

<input
name="address"
placeholder="Full Address"
className="input-style"
onChange={handleChange}
/>

<textarea
name="item"
placeholder="What do you want? (Be specific)"
className="input-style min-h-[100px]"
onChange={handleChange}
/>

<textarea
name="note"
placeholder="Extra note (optional)"
className="input-style"
onChange={handleChange}
/>

<p className="text-xs text-gray-400">
Price will be confirmed by owner after request
</p>


{/* 🔥 BUTTONS */}
<div className="flex gap-3 pt-2">

<motion.button
whileTap={{scale:.95}}
onClick={()=>handleSubmit("custom_cod")}
disabled={loading}
className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold"
>
{loading?"Processing...":"Custom COD"}
</motion.button>

<motion.button
whileTap={{scale:.95}}
onClick={()=>handleSubmit("custom_whatsapp")}
disabled={loading}
className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold"
>
WhatsApp Request
</motion.button>

</div>

</div>

</div>

</section>

);
}