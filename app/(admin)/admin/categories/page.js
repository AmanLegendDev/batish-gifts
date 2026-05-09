"use client";

import { useEffect,useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { Trash2,Plus,X,Upload,Edit } from "lucide-react";

export default function CategoriesPage(){

const [name,setName]=useState("");
const [image,setImage]=useState("");
const [uploading,setUploading]=useState(false);

const [editing,setEditing]=useState(null);
const [editName,setEditName]=useState("");
const [editImage,setEditImage]=useState("");
const [editUploading,setEditUploading]=useState(false);

const [categories,setCategories]=useState([]);
const [popup,setPopup]=useState(null);

/*
FETCH
*/
const fetchCategories=async()=>{
const res=await fetch("/api/categories/dropdown");
const data=await res.json();
setCategories(data);
};

useEffect(()=>{
fetchCategories();
},[]);

/*
UPLOAD
*/
const uploadImage=async(e)=>{
const file=e.target.files[0];
if(!file)return;
setUploading(true);

const fd=new FormData();
fd.append("file",file);

const res=await fetch("/api/upload",{ method:"POST", body:fd });
const data=await res.json();

if(data?.url) setImage(data.url);

setUploading(false);
};

const uploadEditImage=async(e)=>{
const file=e.target.files[0];
if(!file)return;
setEditUploading(true);

const fd=new FormData();
fd.append("file",file);

const res=await fetch("/api/upload",{ method:"POST", body:fd });
const data=await res.json();

if(data?.url) setEditImage(data.url);

setEditUploading(false);
};

/*
CRUD
*/
const createCategory=async()=>{
if(!name.trim())return;

await fetch("/api/categories/create",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ name,image })
});

setName("");
setImage("");
fetchCategories();
};

const deleteCategory=(id)=>{
setPopup({ type:"delete", id });
};

const confirmDelete=async()=>{
await fetch("/api/categories/delete",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ id:popup.id })
});
setPopup(null);
fetchCategories();
};

const startEdit=(cat)=>{
setEditing(cat);
setEditName(cat.name);
setEditImage(cat.image || "");
};

const updateCategory=async()=>{
if(!editName.trim())return;

await fetch("/api/categories/update",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
id:editing._id,
name:editName,
image:editImage
})
});

setEditing(null);
fetchCategories();
};

return(

<div className="min-h-screen bg-[#fffaf5] px-4 py-6 pb-24">

<div className="max-w-5xl mx-auto space-y-6">


{/* HEADER */}

<div className="space-y-2">

<div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold text-orange-600">

BASTA GIFTS ADMIN

</div>

<h1 className="text-3xl font-bold tracking-tight text-slate-900">

Categories Manager

</h1>

<p className="text-sm text-slate-500">

Manage storefront shopping categories.

</p>

</div>


{/* CREATE */}

<div className="rounded-[28px] border border-orange-100 bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.05)] space-y-5">

<div className="space-y-1">

<h2 className="text-lg font-semibold text-slate-900">

Create Category

</h2>

<p className="text-sm text-slate-500">

Add categories for homepage shopping sections.

</p>

</div>


{/* INPUT */}

<input
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Category name"
className="w-full h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
/>


{/* UPLOAD */}

<label className="border-2 border-dashed border-orange-200 rounded-3xl bg-orange-50/40 p-8 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:bg-orange-50 transition-all">

<div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm">

<Upload
size={22}
className="text-orange-500"
/>

</div>

<div>

<p className="font-medium text-slate-700">

Upload Category Image

</p>

<p className="text-sm text-slate-500">

PNG, JPG or WEBP

</p>

</div>

<input
type="file"
hidden
onChange={uploadImage}
/>

</label>


{/* LOADING */}

{uploading && (

<p className="text-sm font-medium text-orange-500">

Uploading image...

</p>

)}


{/* PREVIEW */}

{image && (

<div className="relative w-28">

<img
src={image}
className="w-28 h-28 rounded-2xl object-cover border border-orange-100"
/>

<button
onClick={()=>setImage("")}
className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg"
>

<X size={14}/>

</button>

</div>

)}


{/* BUTTON */}

<button
onClick={createCategory}
className="w-full h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all text-white font-semibold shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
>

<Plus size={18}/>

Create Category

</button>

</div>


{/* CATEGORY LIST */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

{categories.map((cat,index)=>(

<motion.div
key={cat._id}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.05}}
className="rounded-[28px] border border-orange-100 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
>

<div className="flex items-center justify-between gap-3">

<div className="flex items-center gap-3 min-w-0">

{cat.image ? (

<img
src={cat.image}
className="w-14 h-14 rounded-2xl object-cover border border-orange-100 shrink-0"
/>

) : (

<div className="w-14 h-14 rounded-2xl bg-orange-100 shrink-0"/>

)}

<div className="min-w-0">

<p className="font-semibold text-slate-900 truncate">

{cat.name}

</p>

<p className="text-xs text-slate-500">

Shopping Category

</p>

</div>

</div>


{/* ACTIONS */}

<div className="flex items-center gap-2 shrink-0">

<button
onClick={()=>startEdit(cat)}
className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all"
>

<Edit size={16}/>

</button>

<button
onClick={()=>deleteCategory(cat._id)}
className="w-9 h-9 rounded-xl border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-50 transition-all"
>

<Trash2 size={16}/>

</button>

</div>

</div>

</motion.div>

))}

</div>


{/* DELETE POPUP */}

<AnimatePresence>

{popup && popup.type==="delete" &&(

<motion.div
className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4"
>

<div className="w-full max-w-sm rounded-[28px] bg-white p-6 space-y-5 shadow-2xl">

<div className="space-y-2 text-center">

<h2 className="text-lg font-semibold text-slate-900">

Delete Category

</h2>

<p className="text-sm text-slate-500">

This category will be removed permanently.

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

</motion.div>

)}

</AnimatePresence>


{/* EDIT POPUP */}

<AnimatePresence>

{editing &&(

<motion.div
className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4"
>

<div className="w-full max-w-md rounded-[28px] bg-white p-6 space-y-5 shadow-2xl">

<div className="space-y-1">

<h2 className="text-2xl font-bold text-slate-900">

Edit Category

</h2>

<p className="text-sm text-slate-500">

Update storefront category details.

</p>

</div>


{/* INPUT */}

<input
value={editName}
onChange={(e)=>setEditName(e.target.value)}
placeholder="Category name"
className="w-full h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
/>


{/* UPLOAD */}

<label className="border-2 border-dashed border-orange-200 rounded-3xl bg-orange-50/40 p-8 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:bg-orange-50 transition-all">

<div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm">

<Upload
size={22}
className="text-orange-500"
/>

</div>

<div>

<p className="font-medium text-slate-700">

Change Category Image

</p>

<p className="text-sm text-slate-500">

Upload updated category image

</p>

</div>

<input
type="file"
hidden
onChange={uploadEditImage}
/>

</label>


{/* LOADING */}

{editUploading && (

<p className="text-sm font-medium text-orange-500">

Uploading image...

</p>

)}


{/* PREVIEW */}

{editImage && (

<div className="relative w-28">

<img
src={editImage}
className="w-28 h-28 rounded-2xl object-cover border border-orange-100"
/>

<button
onClick={()=>setEditImage("")}
className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg"
>

<X size={14}/>

</button>

</div>

)}


{/* BUTTONS */}

<div className="flex flex-col sm:flex-row gap-3">

<button
onClick={updateCategory}
className="flex-1 h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all text-white font-semibold"
>

Update

</button>

<button
onClick={()=>setEditing(null)}
className="flex-1 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all text-slate-700 font-semibold"
>

Cancel

</button>

</div>

</div>

</motion.div>

)}

</AnimatePresence>

</div>

</div>

);
}