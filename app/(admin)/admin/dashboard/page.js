"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
Clock,
Truck,
CheckCircle
} from "lucide-react";

export default function Dashboard() {

const [stats,setStats]=useState({

newOrders:0,
processingOrders:0,
completedOrders:0

});


const fetchStats=async()=>{

const res=await fetch("/api/admin/stats");

const data=await res.json();

setStats(data);

};


/*
REALTIME POLLING
*/

useEffect(()=>{

fetchStats();

const interval=setInterval(fetchStats,4000);

return()=>clearInterval(interval);

},[]);


return(

<div className="space-y-8">


{/* HEADER */}

<div>

<h1 className="text-2xl font-semibold text-yellow-400">

Order Control Panel

</h1>

<p className="text-neutral-400">

Live campus delivery workflow

</p>

</div>


{/* MAIN ORDER CONTROL CARDS */}

<div className="grid md:grid-cols-3 gap-4">


<OrderCard
title="New Orders"
value={stats.newOrders}
icon={<Clock size={22}/>}
link="/admin/orders?tab=new"
/>


<OrderCard
title="Processing Orders"
value={stats.processingOrders}
icon={<Truck size={22}/>}
link="/admin/orders?tab=processing"
/>


<OrderCard
title="Completed Orders"
value={stats.completedOrders}
icon={<CheckCircle size={22}/>}
link="/admin/orders?tab=completed"
/>


</div>


{/* SECONDARY ANALYTICS (AUTO OPTIONAL) */}

<div className="grid md:grid-cols-2 gap-4">


<MiniCard
title="Quick Add Product"
link="/admin/products/create"
/>


<MiniCard
title="Manage Categories"
link="/admin/categories"
/>


</div>


</div>

);

}


/*
MAIN ORDER CARD
*/

function OrderCard({

title,
value,
icon,
link

}){

return(

<Link
href={link}
className="card p-6 flex justify-between items-center hover:border-yellow-400 transition"
>

<div>

<p className="text-sm text-neutral-400">

{title}

</p>

<h2 className="text-4xl font-semibold mt-1">

{value}

</h2>

</div>


<div className="text-yellow-400">

{icon}

</div>

</Link>

);

}


/*
SECONDARY CARD
*/

function MiniCard({

title,
link

}){

return(

<Link
href={link}
className="card p-4 hover:border-yellow-400 transition text-center"
>

{title}

</Link>

);

}