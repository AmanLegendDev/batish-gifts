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

<div className="space-y-6">

{/* HEADER */}
<div>
<h1 className="text-xl md:text-2xl text-[var(--primary)] font-semibold">
Categories Manager
</h1>
<p className="text-gray-500 text-sm">
Homepage slider categories
</p>
</div>


{/* CREATE */}
<div className="card p-4 space-y-4">

<input
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Category name"
className="input-style"
/>

<label className="upload-box">
<Upload size={18}/>
Upload Image
<input type="file" hidden onChange={uploadImage}/>
</label>

{uploading && <p className="text-sm text-gray-400">Uploading...</p>}

{image &&(
<div className="relative w-24">
<img src={image} className="rounded-lg"/>
<button
onClick={()=>setImage("")}
className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full"
>
<X size={14}/>
</button>
</div>
)}

<button
onClick={createCategory}
className="bg-[var(--primary)] text-white py-2 rounded-xl font-semibold flex items-center justify-center gap-2"
>
<Plus size={16}/>
Create Category
</button>

</div>


{/* LIST */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

{categories.map((cat,index)=>(

<motion.div
key={cat._id}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
transition={{delay:index*0.05}}
className="card flex items-center justify-between p-3"
>

<div className="flex items-center gap-2 min-w-0">

{cat.image &&(
<img src={cat.image} className="w-10 h-10 rounded-full object-cover"/>
)}

<span className="truncate text-sm">
{cat.name}
</span>

</div>

<div className="flex gap-2">

<button onClick={()=>startEdit(cat)} className="text-[var(--primary)]">
<Edit size={18}/>
</button>

<button onClick={()=>deleteCategory(cat._id)} className="text-red-500">
<Trash2 size={18}/>
</button>

</div>

</motion.div>

))}

</div>


{/* DELETE POPUP */}
<AnimatePresence>
{popup && popup.type==="delete" &&(

<motion.div
className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 px-4"
>

<div className="card p-5 space-y-4 w-full max-w-sm">

<h2 className="text-base font-semibold">
Delete category permanently?
</h2>

<div className="flex gap-3">
<button onClick={confirmDelete} className="flex-1 bg-red-500 text-white py-2 rounded-lg">
Delete
</button>

<button onClick={()=>setPopup(null)} className="flex-1 bg-gray-200 py-2 rounded-lg">
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
className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 px-4"
>

<div className="card p-5 space-y-4 w-full max-w-sm">

<h2 className="text-lg font-semibold text-[var(--primary)]">
Edit Category
</h2>

<input
value={editName}
onChange={(e)=>setEditName(e.target.value)}
className="input-style"
/>

<label className="upload-box">
<Upload size={18}/>
Change Image
<input type="file" hidden onChange={uploadEditImage}/>
</label>

{editUploading && <p className="text-sm text-gray-400">Uploading...</p>}

{editImage &&(
<div className="relative w-24">
<img src={editImage} className="rounded-lg"/>
<button
onClick={()=>setEditImage("")}
className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full"
>
<X size={14}/>
</button>
</div>
)}

<div className="flex gap-3">
<button onClick={updateCategory} className="flex-1 bg-[var(--primary)] text-white py-2 rounded-lg">
Update
</button>

<button onClick={()=>setEditing(null)} className="flex-1 bg-gray-200 py-2 rounded-lg">
Cancel
</button>
</div>

</div>

</motion.div>

)}
</AnimatePresence>

</div>

);
}