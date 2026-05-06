"use client";

import { useEffect,useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion,AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRef } from "react";

export default function OrdersPage(){
const toastTimer = useRef(null);
const params = useSearchParams();
const initialTab = params.get("tab") || "new";

const [tab,setTab]=useState(initialTab);
const [orders,setOrders]=useState([]);
const [popup,setPopup]=useState(null);
const [tabPopup,setTabPopup]=useState(null);
const [loading,setLoading]=useState(false);
const [toast,setToast]=useState(null);
const [fetching,setFetching]=useState(true);


/*
FETCH ORDERS
*/

const fetchOrders=async()=>{

setFetching(true);

const res=await fetch(`/api/admin/orders/${tab}`);
const data=await res.json();

setOrders(data);

setFetching(false);

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

if(type==="confirm"){
  setToast("Order moved to Confirmed");
}

if(type==="deliver"){
  setToast("Order marked as Delivered");
}

if(type==="cancel"){
  setToast("Order Cancelled");
}

clearTimeout(toastTimer.current);

toastTimer.current = setTimeout(()=>{
  setToast(null);
},2000);
setLoading(false);

};

useEffect(() => {
  return () => clearTimeout(toastTimer.current);
}, []);


return(

<div className="space-y-6">

<h1 className="text-xl font-semibold">
Orders
</h1>


{/* TABS */}
<div className="w-full overflow-x-auto no-scrollbar">

  <div className="flex gap-2 min-w-max pb-1">

<Tab
title="New"
active={tab==="new"}
onClick={()=>{
if(tab!=="new"){
setTabPopup("new");
}
}}
/>

<Tab
title="Confirmed"
active={tab==="confirmed"}
onClick={()=>{
if(tab!=="confirmed"){
setTabPopup("confirmed");
}
}}
/>

<Tab
title="Delivered"
active={tab==="delivered"}
onClick={()=>{
if(tab!=="delivered"){
setTabPopup("delivered");
}
}}
/>

<Tab
title="Cancelled"
active={tab==="cancelled"}
onClick={()=>{
if(tab!=="cancelled"){
setTabPopup("cancelled");
}
}}
/>
</div>
</div>


{/* EMPTY */}
{orders.length===0 && !loading && !fetching &&(
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
<div className="flex items-center gap-1 mt-1">

<span className="w-1.5 h-1.5 rounded-full bg-green-500"/>

<p className="text-[11px] text-gray-400">
{
new Date(order.createdAt).toLocaleString("en-IN",{
day:"numeric",
month:"short",
hour:"numeric",
minute:"2-digit",
hour12:true
})
}
</p>

</div>
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
<div className="flex gap-2 flex-wrap">

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



{/* CUSTOM ORDER EDIT */}
{(
(order.orderType === "custom_cod" ||
order.orderType === "custom_whatsapp")
&&
tab !== "cancelled"
&&
order.totalAmount === 0
) && (

<button
onClick={()=>{
window.location.href =
`/admin/orders/edit/${order._id}`;
}}
className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-lg"
>
Edit Price
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

<AnimatePresence>

{toast &&(

<motion.div
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
exit={{opacity:0,y:30}}
className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white px-4 py-2 rounded-xl shadow-lg z-[100] text-sm"
>

{toast}

</motion.div>

)}

</AnimatePresence>



<AnimatePresence>

{tabPopup &&(

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
Switch to {tabPopup.charAt(0).toUpperCase() + tabPopup.slice(1)} orders?
</p>

<div className="flex gap-3">

<button
onClick={()=>{
setTab(tabPopup);
setTabPopup(null);
}}
className="flex-1 btn-primary"
>
Yes
</button>

<button
onClick={()=>setTabPopup(null)}
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