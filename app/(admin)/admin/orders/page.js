"use client";

import { useEffect,useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import {
CheckCircle,
Truck,
Wallet,
XCircle,
Clock
} from "lucide-react";

export default function OrdersPage(){

const [tab,setTab]=useState("new");

const [orders,setOrders]=useState([]);

const [popup,setPopup]=useState(null);


/*
FETCH ORDERS BASED ON TAB
*/

const fetchOrders=async()=>{

const res=await fetch(`/api/admin/orders/${tab}`);

const data=await res.json();

setOrders(data);

};


/*
REALTIME POLLING
*/

useEffect(()=>{

fetchOrders();

const interval=setInterval(fetchOrders,4000);

return()=>clearInterval(interval);

},[tab]);


/*
OPEN POPUP ACTION
*/

const openPopup=(type,id)=>{

setPopup({type,id});

};


/*
EXECUTE ACTION
*/

const executeAction=async()=>{

const {type,id}=popup;

await fetch(`/api/admin/orders/${type}`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({id})

});

setPopup(null);

fetchOrders();

};


return(

<div className="space-y-6">


{/* HEADER */}

<h1 className="text-2xl font-semibold text-yellow-400">

Orders Control Panel

</h1>



{/* TABS */}

<div className="flex gap-3 overflow-x-auto">

<TabBtn
title="New"
active={tab==="new"}
onClick={()=>setTab("new")}
/>

<TabBtn
title="Processing"
active={tab==="processing"}
onClick={()=>setTab("processing")}
/>

<TabBtn
title="Completed"
active={tab==="completed"}
onClick={()=>setTab("completed")}
/>

</div>



{/* EMPTY STATE */}

{orders.length===0 &&(

<div className="card p-6 text-center text-neutral-400">

No orders here

</div>

)}



{/* ORDER LIST */}

<div className="space-y-4">

{orders.map(order=>(

<OrderCard
key={order._id}
order={order}
tab={tab}
openPopup={openPopup}
/>

))}

</div>



{/* POPUP */}

<AnimatePresence>

{popup &&(

<motion.div

initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}

className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"

>

<motion.div

initial={{scale:0.8}}
animate={{scale:1}}
exit={{scale:0.8}}

className="card p-6 space-y-4 w-[90%] max-w-sm"

>

<h2 className="text-lg font-semibold">

{popup.type==="confirm" && "Confirm this order?"}

{popup.type==="cancel" && "Cancel & delete this order permanently?"}

{popup.type==="dispatch" && "Mark order as out for delivery?"}

{popup.type==="delivered" && "Mark order delivered?"}

{popup.type==="pay" && "Confirm payment received?"}

</h2>


<div className="flex gap-3">

<button

onClick={executeAction}

className="flex-1 bg-yellow-400 text-black py-2 rounded-lg font-semibold"

>

OK

</button>


<button

onClick={()=>setPopup(null)}

className="flex-1 bg-neutral-700 py-2 rounded-lg"

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
TAB BUTTON
*/

function TabBtn({title,active,onClick}){

return(

<button

onClick={onClick}

className={`

px-4 py-2 rounded-xl transition whitespace-nowrap

${active
?"bg-yellow-400 text-black"
:"bg-neutral-900 text-neutral-400"}

`}

>

{title}

</button>

);

}



/*
ORDER CARD
*/

function OrderCard({order,tab,openPopup}){

return(

<motion.div

initial={{opacity:0,y:15}}
animate={{opacity:1,y:0}}

className="card p-5 space-y-4"

>


{/* CUSTOMER */}

<div>

<h2 className="font-semibold">

{order.customerName}

</h2>

<p className="text-sm text-neutral-400">

{order.phone}

</p>

<p className="text-sm text-neutral-400">

{order.hostel} • Room {order.room}

</p>

</div>



{/* ITEMS */}

<div className="space-y-1 text-sm">

{order.items.map(item=>(

<p key={item._id}>

{item.title} × {item.qty}

</p>

))}

</div>



{/* BUTTONS */}

<div className="flex gap-3 flex-wrap">


{/* NEW ORDERS */}

{tab==="new" &&(

<>

<ActionBtn
text="Confirm"
icon={<CheckCircle size={16}/>}
onClick={()=>openPopup("confirm",order._id)}
color="yellow"
/>

<ActionBtn
text="Cancel"
icon={<XCircle size={16}/>}
onClick={()=>openPopup("cancel",order._id)}
color="red"
/>

</>

)}



{/* PROCESSING ORDERS */}

{tab==="processing" &&(

<>

{order.orderStatus==="confirmed" &&(

<ActionBtn
text="Dispatch"
icon={<Truck size={16}/>}
onClick={()=>openPopup("dispatch",order._id)}
color="yellow"
/>

)}


{order.orderStatus==="out_for_delivery" &&(

<ActionBtn
text="Delivered"
icon={<Clock size={16}/>}
onClick={()=>openPopup("delivered",order._id)}
color="yellow"
/>

)}


{order.orderStatus==="delivered" &&
order.paymentStatus==="pending" &&(

<ActionBtn
text="Payment Received"
icon={<Wallet size={16}/>}
onClick={()=>openPopup("pay",order._id)}
color="green"
/>

)}


<ActionBtn
text="Cancel"
icon={<XCircle size={16}/>}
onClick={()=>openPopup("cancel",order._id)}
color="red"
/>

</>

)}

</div>

</motion.div>

);

}



/*
ACTION BUTTON
*/

function ActionBtn({text,icon,onClick,color}){

const colors={

yellow:"bg-yellow-400 text-black",

green:"bg-green-500 text-white",

red:"bg-red-500 text-white"

};

return(

<button

onClick={onClick}

className={`

flex items-center gap-2 px-4 py-2 rounded-xl font-semibold

${colors[color]}

`}

>

{icon}

{text}

</button>

);

}