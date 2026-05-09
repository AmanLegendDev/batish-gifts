"use client";

import { useEffect,useState } from "react";
import Link from "next/link";
import {
Trash2,
Pencil,
Eye,
EyeOff,
Star,
StarOff,
Plus
} from "lucide-react";

export default function ProductsPage(){

const [products,setProducts]=useState([]);
const [categories,setCategories]=useState([]);
const [selectedCat,setSelectedCat]=useState("");
const [popup,setPopup]=useState(null);
const [actionPopup,setActionPopup]=useState(null);

/* FETCH */
const fetchData=async()=>{
const [prodRes,catRes]=await Promise.all([
fetch("/api/products/list?admin=true"),
fetch("/api/categories/dropdown")
]);

setProducts(await prodRes.json());
setCategories(await catRes.json());
};

useEffect(()=>{ fetchData(); },[]);

/* FILTER */
const filteredProducts = selectedCat
? products.filter(p=>p.category?._id===selectedCat)
: products;

/* DELETE */
const confirmDelete=async()=>{
await fetch("/api/products/delete",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ id:popup.id })
});
setPopup(null);
fetchData();
};

/* TOGGLE */
const toggleField=async()=>{

await fetch("/api/products/toggle",{
  method:"POST",
  headers:{ "Content-Type":"application/json" },
  body:JSON.stringify({
    id: actionPopup.id,
    field: actionPopup.field,
    value: actionPopup.value
  })
});

setActionPopup(null);

fetchData();

};

return (

<div className="min-h-screen bg-[#fffaf5] px-4 py-6 pb-24">

<div className="max-w-5xl mx-auto space-y-6">


{/* HEADER */}

<div className="flex items-center justify-between gap-4">

<div className="space-y-1">

<div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold text-orange-600">

Products Dashboard

</div>

<h1 className="text-3xl font-bold tracking-tight text-slate-900">

Manage Products

</h1>

<p className="text-sm text-slate-500">

Manage your marketplace inventory and visibility.

</p>

</div>

<Link
href="/admin/products/create"
className="shrink-0 h-11 px-5 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-orange-200"
>

<Plus size={16} />

Add Product

</Link>

</div>


{/* CATEGORY FILTERS */}

<div className="overflow-x-auto no-scrollbar">

<div className="flex gap-3 min-w-max pb-1">

<button
onClick={()=>setSelectedCat("")}
className={`px-4 h-10 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${
selectedCat === ""
? "bg-orange-500 text-white shadow-md shadow-orange-200"
: "bg-white border border-slate-200 text-slate-600"
}`}
>
All Products
</button>

{categories.map((cat)=>(

<button
key={cat._id}
onClick={()=>setSelectedCat(cat._id)}
className={`px-4 h-10 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${
selectedCat === cat._id
? "bg-orange-500 text-white shadow-md shadow-orange-200"
: "bg-white border border-slate-200 text-slate-600"
}`}
>

{cat.name}

</button>

))}

</div>

</div>


{/* PRODUCTS */}

<div className="grid grid-cols-1 gap-4">

{filteredProducts.map((product)=>(

<div
key={product._id}
className={`rounded-[28px] border overflow-hidden transition-all ${
product.isVisible
? "border-orange-100 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
: "border-red-100 bg-red-50/60 opacity-80"
}`}
>

<div className="p-4 flex gap-4">


{/* IMAGE */}

<div className="relative shrink-0">

<img
src={product.image || "/placeholder.png"}
alt={product.name}
className="w-24 h-24 rounded-2xl object-cover border border-orange-100"
/>

{product.badgeText && (

<div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow">

{product.badgeText}

</div>

)}

</div>


{/* CONTENT */}

<div className="flex-1 min-w-0 space-y-3">


{/* TOP */}

<div className="flex items-start justify-between gap-4">

<div className="min-w-0 space-y-1">

<div className="flex items-center gap-2 flex-wrap">

<h2 className="text-base font-semibold text-slate-900 truncate">

{product.name}

</h2>

{!product.isVisible && (

<span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-red-100 text-red-600">

Hidden

</span>

)}

{product.isFeatured && (

<span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-yellow-100 text-yellow-700">

Featured

</span>

)}

</div>

<p className="text-sm text-slate-500">

{product.category?.name}

</p>

</div>


{/* PRICE */}

<div className="text-right shrink-0">

<p className="text-xl font-bold text-orange-500">

₹ {product.sellingPrice}

</p>

</div>

</div>


{/* DESCRIPTION */}

{product.description && (

<p className="text-sm text-slate-500 line-clamp-2">

{product.description}

</p>

)}


{/* COMMERCE INFO */}

<div className="flex flex-wrap items-center gap-2">

{product.offerText && (

<div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">

{product.offerText}

</div>

)}

{product.deliveryInfo && (

<div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">

{product.deliveryInfo}

</div>

)}

</div>


{/* ACTIONS */}

<div className="flex items-center gap-2 pt-1 flex-wrap">

<Link
href={`/admin/products/edit/${product._id}`}
className="h-10 px-4 rounded-xl border border-slate-200 flex items-center gap-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
>

<Pencil size={15} />

Edit

</Link>

<button
onClick={()=>setPopup({id:product._id})}
className="h-10 px-4 rounded-xl border border-red-200 text-red-600 flex items-center gap-2 text-sm font-medium hover:bg-red-50 transition-all"
>

<Trash2 size={15} />

Delete

</button>

<button
onClick={()=>
setActionPopup({
id: product._id,
field: "isVisible",
value: !product.isVisible,
text: product.isVisible
? "Hide this product?"
: "Show this product?"
})
}
className={`h-10 px-4 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
product.isVisible
? "bg-green-100 text-green-700"
: "bg-slate-100 text-slate-500"
}`}
>

{product.isVisible
? <Eye size={15}/>
: <EyeOff size={15}/>
}

{product.isVisible ? "Visible" : "Hidden"}

</button>

<button
onClick={()=>
setActionPopup({
id: product._id,
field: "isFeatured",
value: !product.isFeatured,
text: product.isFeatured
? "Remove from featured?"
: "Add to featured?"
})
}
className={`h-10 px-4 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
product.isFeatured
? "bg-yellow-100 text-yellow-700"
: "bg-slate-100 text-slate-500"
}`}
>

{product.isFeatured
? <Star size={15}/>
: <StarOff size={15}/>
}

{product.isFeatured ? "Featured" : "Feature"}

</button>

</div>

</div>

</div>

</div>

))}

</div>


{/* DELETE POPUP */}

{popup && (

<div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">

<div className="w-full max-w-sm rounded-[28px] bg-white p-6 space-y-5 shadow-2xl">

<div className="space-y-2 text-center">

<h2 className="text-lg font-semibold text-slate-900">

Delete Product

</h2>

<p className="text-sm text-slate-500">

This action cannot be undone.

</p>

</div>

<div className="flex gap-3">

<button
onClick={confirmDelete}
className="flex-1 h-11 rounded-2xl bg-red-500 hover:bg-red-600 transition-all text-white font-semibold"
>
Delete
</button>

<button
onClick={()=>setPopup(null)}
className="flex-1 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all text-slate-700 font-semibold"
>
Cancel
</button>

</div>

</div>

</div>

)}


{/* ACTION POPUP */}

{actionPopup && (

<div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">

<div className="w-full max-w-sm rounded-[28px] bg-white p-6 space-y-5 shadow-2xl">

<p className="text-center text-base font-semibold text-slate-800">

{actionPopup.text}

</p>

<div className="flex gap-3">

<button
onClick={toggleField}
className="flex-1 h-11 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all text-white font-semibold"
>
Yes
</button>

<button
onClick={()=>setActionPopup(null)}
className="flex-1 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all text-slate-700 font-semibold"
>
Cancel
</button>

</div>

</div>

</div>

)}

</div>

</div>

);
}