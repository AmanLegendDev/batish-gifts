"use client";

export const dynamic = "force-dynamic";

import { useEffect,useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle,Phone,Clock } from "lucide-react";

export default function CustomOrdersAdmin(){

const [orders,setOrders]=useState([]);

const fetchOrders=()=>{
fetch("/api/custom-orders/list")
.then(res=>res.json())
.then(setOrders);
};

useEffect(()=>{
fetchOrders();
},[]);


/*
MARK AS DELIVERED
*/
const markDelivered=async(id)=>{
await fetch("/api/custom-orders/update-status",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ id })
});
fetchOrders();
};


/*
FILTER
*/
const newOrders=orders.filter(o=>o.status==="new");
const oldOrders=orders.filter(o=>o.status==="delivered");


return(

<div className="space-y-10">

{/* HEADER */}
<div>
<h1 className="text-2xl font-semibold text-gray-900">
Custom Orders
</h1>
<p className="text-gray-500 text-sm">
Manage special gift requests from customers
</p>
</div>


{/* NEW REQUESTS */}
<section>

<div className="flex items-center justify-between mb-4">
<h2 className="text-lg font-semibold text-gray-900">
New Requests
</h2>

<span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
{newOrders.length} pending
</span>
</div>


{newOrders.length===0 &&(
<div className="bg-gray-50 p-6 rounded-xl text-center text-gray-400">
No new requests
</div>
)}


<div className="space-y-4">

{newOrders.map(o=>(

<motion.div
key={o._id}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-4"
>

{/* TOP */}
<div className="flex justify-between items-start">

<div>
<p className="font-semibold text-gray-900">
{o.name}
</p>

<p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
<Clock size={12}/>
{new Date(o.createdAt).toLocaleString()}
</p>
</div>

<span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
New
</span>

</div>


{/* DETAILS */}
<div className="text-sm text-gray-600 space-y-1">
<p>📞 {o.phone}</p>
</div>


{/* ITEM */}
<div className="bg-gray-50 border rounded-xl p-3 text-sm text-gray-800">
{o.item}
</div>


{/* NOTE */}
{o.note &&(
<p className="text-xs text-gray-400">
Note: {o.note}
</p>
)}


{/* ACTIONS */}
<div className="flex justify-between items-center pt-2">

<a
href={`tel:${o.phone}`}
className="flex items-center gap-1 text-xs text-[var(--primary)]"
>
<Phone size={14}/>
Call
</a>

<button
onClick={()=>markDelivered(o._id)}
className="flex items-center gap-1 text-xs bg-[var(--primary)] text-white px-3 py-1 rounded-full"
>
<CheckCircle size={14}/>
Mark Done
</button>

</div>

</motion.div>

))}

</div>

</section>


{/* COMPLETED */}
<section>

<div className="flex items-center justify-between mb-4">
<h2 className="text-lg font-semibold text-gray-900">
Completed
</h2>

<span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
{oldOrders.length} done
</span>
</div>


{oldOrders.length===0 &&(
<div className="bg-gray-50 p-6 rounded-xl text-center text-gray-400">
No completed requests
</div>
)}


<div className="space-y-4">

{oldOrders.map(o=>(

<div
key={o._id}
className="bg-gray-50 border rounded-2xl p-5 space-y-2 opacity-70"
>

<div className="flex justify-between">

<p className="font-medium text-gray-800">
{o.name}
</p>

<p className="text-xs text-gray-400">
{new Date(o.createdAt).toLocaleString()}
</p>

</div>

<p className="text-sm text-gray-600">
📞 {o.phone}
</p>

<div className="text-sm text-gray-700">
{o.item}
</div>

</div>

))}

</div>

</section>

</div>

);
}