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
ACTION WITH ANIMATION
*/

const handleAction=async(type,id)=>{

setLoading(true);

/* API call */
await fetch(`/api/admin/orders/${type}`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({id})
});

/* 🔥 animate remove */
setOrders(prev => prev.filter(o => o._id !== id));

setPopup(null);

/* 🔥 smooth tab switch */
setTimeout(()=>{
if(type==="confirm") setTab("confirmed");
if(type==="deliver") setTab("delivered");
setLoading(false);
},350);

};


return(

<div className="space-y-6">


{/* HEADER */}

<h1 className="text-xl font-semibold">
Orders
</h1>


{/* TABS */}

<div className="flex gap-2">

<Tab title="New" active={tab==="new"} onClick={()=>setTab("new")} />
<Tab title="Confirmed" active={tab==="confirmed"} onClick={()=>setTab("confirmed")} />
<Tab title="Delivered" active={tab==="delivered"} onClick={()=>setTab("delivered")} />

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
className="card p-4 space-y-3"
>


{/* CUSTOMER */}

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
₹ {order.totalAmount}
</p>


{/* ACTIONS */}

<div className="flex gap-2">

{tab==="new" &&(
<button
onClick={()=>setPopup({type:"confirm",id:order._id})}
className="btn-primary text-sm px-3 py-1"
>
Confirm
</button>
)}

{tab==="confirmed" &&(
<button
onClick={()=>setPopup({type:"deliver",id:order._id})}
className="btn-primary text-sm px-3 py-1"
>
Delivered
</button>
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
Cancel
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