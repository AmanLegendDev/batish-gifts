"use client";

import { useEffect,useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion,AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function OrdersPage(){

const params = useSearchParams();
const initialTab = params.get("tab") || "new";

const [tab,setTab]=useState(initialTab);
const [orders,setOrders]=useState([]);
const [popup,setPopup]=useState(null);
const [loading,setLoading]=useState(false);


/*
FETCH ORDERS
*/

const fetchOrders=async()=>{
const res=await fetch(`/api/admin/orders/${tab}`);
const data=await res.json();
setOrders(data);
};

useEffect(()=>{
fetchOrders();
const i=setInterval(fetchOrders,4000);
return()=>clearInterval(i);
},[tab]);


/*
ACTION
*/

const handleAction=async(type,id)=>{

setLoading(true);

await fetch(`/api/admin/orders/${type}`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({id})
});

setOrders(prev => prev.filter(o => o._id !== id));

setPopup(null);

setTimeout(()=>{
if(type==="confirm") setTab("confirmed");
if(type==="deliver") setTab("delivered");
if(type==="cancel") setTab("cancelled");
setLoading(false);
},300);

};


return(

<div className="space-y-6">

<h1 className="text-xl font-semibold">
Orders
</h1>


{/* TABS */}
<div className="flex gap-2">

<Tab title="New" active={tab==="new"} onClick={()=>setTab("new")} />
<Tab title="Confirmed" active={tab==="confirmed"} onClick={()=>setTab("confirmed")} />
<Tab title="Delivered" active={tab==="delivered"} onClick={()=>setTab("delivered")} />
<Tab title="Cancelled" active={tab==="cancelled"} onClick={()=>setTab("cancelled")} />

</div>


{/* EMPTY */}
{orders.length===0 && !loading &&(
<div className="card p-6 text-center text-gray-400">
No orders here
</div>
)}


{/* LIST */}
<div className="space-y-3">

<AnimatePresence>

{orders.map(order=>(

<motion.div
key={order._id}
layout
initial={{opacity:0,y:12}}
animate={{opacity:1,y:0}}
exit={{opacity:0,scale:0.9}}
transition={{duration:0.25}}
className={`card p-4 space-y-3 ${
tab==="cancelled" ? "border border-red-300 bg-red-50" : ""
}`}
>


{/* CUSTOMER + TYPE */}
<div className="flex justify-between items-start">

<div>
<h3 className="font-medium">
{order.customerName}
</h3>
<p className="text-xs text-gray-500">
{order.phone}
</p>
<p className="text-xs text-gray-500">
{order.address}
</p>
</div>

<span className="text-[10px] px-2 py-1 rounded-full bg-gray-100">
{order.orderType}
</span>

</div>


{/* ITEMS */}
<div className="text-sm space-y-1">
{order.items.map(i=>(
<p key={i.title}>
{i.title} × {i.qty}
</p>
))}
</div>


{/* TOTAL */}
<p className="text-sm font-semibold text-[var(--primary)]">
{order.totalAmount === 0 ? "Price Pending" : `₹ ${order.totalAmount}`}
</p>


{/* ACTIONS */}
<div className="flex gap-2">

{/* NEW */}
{tab==="new" &&(
<>
<button
onClick={()=>setPopup({type:"confirm",id:order._id})}
className="btn-primary text-sm px-3 py-1"
>
Confirm
</button>

<button
onClick={()=>setPopup({type:"cancel",id:order._id})}
className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-lg"
>
Cancel
</button>
</>
)}


{/* CONFIRMED */}
{tab==="confirmed" &&(
<>
<button
onClick={()=>setPopup({type:"deliver",id:order._id})}
className="btn-primary text-sm px-3 py-1"
>
Delivered
</button>

<button
onClick={()=>setPopup({type:"cancel",id:order._id})}
className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-lg"
>
Cancel
</button>
</>
)}

</div>

</motion.div>

))}

</AnimatePresence>

</div>


{/* POPUP */}
<AnimatePresence>

{popup &&(

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
>

<motion.div
initial={{scale:0.9}}
animate={{scale:1}}
exit={{scale:0.9}}
className="bg-white p-5 rounded-xl space-y-4 w-[90%] max-w-sm shadow-lg"
>

<p className="text-center font-medium">

{popup.type==="confirm" && "Do you want to confirm this order?"}
{popup.type==="deliver" && "Mark this order as delivered?"}
{popup.type==="cancel" && "Do you want to cancel this order?"}

</p>

<div className="flex gap-3">

<button
onClick={()=>handleAction(popup.type,popup.id)}
className="flex-1 btn-primary flex items-center justify-center gap-1"
>
<CheckCircle size={16}/>
Yes
</button>

<button
onClick={()=>setPopup(null)}
className="flex-1 bg-gray-200 rounded-lg"
>
No
</button>

</div>

</motion.div>

</motion.div>

)}

</AnimatePresence>

</div>

);
}


/*
TAB
*/

function Tab({title,active,onClick}){

return(

<button
onClick={onClick}
className={`px-3 py-1 rounded-lg text-sm transition ${
active
? "bg-[var(--primary)] text-white shadow-sm"
: "bg-gray-100"
}`}
>
{title}
</button>

);
}