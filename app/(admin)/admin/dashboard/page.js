"use client";
export const dynamic = "force-dynamic";

import { useEffect,useState } from "react";
import Link from "next/link";
import {
Clock,
CheckCircle,
Package,
Plus
} from "lucide-react";

export default function Dashboard(){

const [stats,setStats]=useState({});

const fetchStats=async()=>{
const res=await fetch("/api/admin/stats");
const data=await res.json();
setStats(data);
};

useEffect(()=>{
fetchStats();
const i=setInterval(fetchStats,5000);
return()=>clearInterval(i);
},[]);

return(

<div className="space-y-6">


{/* HEADER */}

<div>
<h1 className="text-xl font-semibold">
Dashboard
</h1>
<p className="text-sm text-gray-500">
Manage your shop easily
</p>
</div>


{/* ORDER STATUS */}

<div className="grid grid-cols-2 gap-3">

<Link href="/admin/orders?tab=new">

<Card
title="New Orders"
value={stats.newOrders}
icon={<Clock size={18}/>}
/>

</Link>

<Link href="/admin/orders?tab=confirmed">
<Card
title="Confirmed"
value={stats.confirmedOrders}
icon={<Package size={18}/>}
/>
</Link>

<Link href="/admin/orders?tab=delivered">
<Card
title="Delivered"
value={stats.deliveredOrders}
icon={<CheckCircle size={18}/>}
/>

</Link>

<Link href="/admin/custom-orders">
<Card
title="Custom Order"
value={stats.customOrders}
icon={<CheckCircle size={18}/>}
/>

</Link>


</div>


{/* TODAY */}

<div className="grid grid-cols-2 gap-3">

<Card
title="Today's Orders"
value={stats.todayOrders}
/>

<Card
title="Revenue"
value={`₹ ${stats.todayRevenue || 0}`}
/>

</div>


{/* QUICK */}

<div className="grid grid-cols-2 gap-3">

<Link href="/admin/products/create" className="card p-4 text-center">
➕ Add Product
</Link>

<Link href="/admin/orders" className="card p-4 text-center">
📦 View Orders
</Link>

</div>


</div>

);
}


/*
CARD
*/

function Card({title,value,icon}){

return(

<div className="card p-4 flex justify-between items-center">

<div>
<p className="text-xs text-gray-500">{title}</p>
<h2 className="text-xl font-semibold mt-1">
{value || 0}
</h2>
</div>

<div className="text-[var(--primary)]">
{icon}
</div>

</div>

);
}