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

/* FETCH */
const fetchData=async()=>{
const [prodRes,catRes]=await Promise.all([
fetch("/api/products/list"),
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
const toggleField=async(id,field,value)=>{
await fetch("/api/products/toggle",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ id,field,value })
});
fetchData();
};

return(

<div className="space-y-5">

{/* HEADER */}
<div className="flex items-center justify-between shrink-0">

<div>
<h1 className="text-lg font-semibold">Products</h1>
<p className="text-xs text-gray-500">Manage your items</p>
</div>

<Link
href="/admin/products/create"
className=" shrink-0 flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-[var(--primary)] text-white"
>
<Plus size={14}/>
Add
</Link>

</div>


{/* CATEGORY */}
<div className="flex gap-2 overflow-x-auto no-scrollbar">

<button
onClick={()=>setSelectedCat("")}
className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
selectedCat==="" ? "bg-[var(--primary)] text-white" : "bg-gray-100"
}`}
>
All
</button>

{categories.map(cat=>(
<button
key={cat._id}
onClick={()=>setSelectedCat(cat._id)}
className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
selectedCat===cat._id ? "bg-[var(--primary)] text-white" : "bg-gray-100"
}`}
>
{cat.name}
</button>
))}

</div>


{/* LIST */}
<div className="space-y-3">

{filteredProducts.map(product=>(

<div
key={product._id}
className="bg-white border rounded-xl p-3 flex items-center gap-3"
>

{/* IMAGE */}
<img
src={product.image || "/placeholder.png"}
className="w-12 h-12 rounded-lg object-cover"
/>

{/* INFO */}
<div className="flex-1 min-w-0">

<p className="text-sm font-medium truncate">
{product.name}
</p>

<p className="text-xs text-gray-500 truncate">
{product.category?.name}
</p>

<p className="text-sm font-semibold text-[var(--primary)]">
₹ {product.sellingPrice}
</p>

</div>


{/* ACTIONS RIGHT FIX */}
<div className="flex items-center gap-3">

<Link href={`/admin/products/edit/${product._id}`}>
<Pencil size={16}/>
</Link>

<button onClick={()=>setPopup({id:product._id})}>
<Trash2 size={16}/>
</button>

<button
onClick={()=>toggleField(
product._id,
"isVisible",
!product.isVisible
)}
className={product.isVisible ? "text-green-600":"text-gray-400"}
>
{product.isVisible ? <Eye size={16}/> : <EyeOff size={16}/>}
</button>

<button
onClick={()=>toggleField(
product._id,
"isFeatured",
!product.isFeatured
)}
className={product.isFeatured ? "text-yellow-500":"text-gray-400"}
>
{product.isFeatured ? <Star size={16}/> : <StarOff size={16}/>}
</button>

</div>

</div>

))}

</div>


{/* POPUP */}
{popup &&(
<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

<div className="bg-white p-5 rounded-xl space-y-4 w-full max-w-sm">

<p className="text-center text-sm">
Delete this product?
</p>

<div className="flex gap-2">

<button
onClick={confirmDelete}
className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm"
>
Delete
</button>

<button
onClick={()=>setPopup(null)}
className="flex-1 bg-gray-200 py-2 rounded-lg text-sm"
>
Cancel
</button>

</div>

</div>

</div>
)}

</div>

);
}