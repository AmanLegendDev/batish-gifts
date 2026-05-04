"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function CustomOrderPage(){

const [form,setForm]=useState({
name:"",
phone:"",
item:"",
note:""
});

const [loading,setLoading]=useState(false);

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit=async()=>{

if(!form.name || !form.phone || !form.item){
alert("Fill required fields");
return;
}

setLoading(true);

await fetch("/api/custom-orders/create",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(form)
});

setLoading(false);

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

<motion.button
whileTap={{scale:.95}}
onClick={handleSubmit}
disabled={loading}
className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold shadow"
>
{loading?"Sending Request...":"Submit Request"}
</motion.button>

</div>

</div>

</section>

);
}