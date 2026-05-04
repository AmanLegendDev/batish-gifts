"use client";

import { useEffect, useState } from "react";
import { X, Upload, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsPage() {

const emptyForm = {
  name: "",
  description: "",
  sellingPrice: "",
  category: "",
  isFeatured: false,
  isVisible: true
};

const [form,setForm]=useState(emptyForm);
const [categories,setCategories]=useState([]);
const [image,setImage]=useState("");
const [uploading,setUploading]=useState(false);
const [showPopup,setShowPopup]=useState(false);


/*
FETCH CATEGORIES
*/

useEffect(()=>{
  fetch("/api/categories/dropdown")
  .then(res=>res.json())
  .then(setCategories);
},[]);


/*
UPLOAD IMAGE
*/

const handleUpload = async(e)=>{

  const file = e.target.files[0];
  if(!file) return;

  setUploading(true);

  const fd = new FormData();
  fd.append("file",file);

  const res = await fetch("/api/upload",{
    method:"POST",
    body:fd
  });

  const data = await res.json();

  if(data?.url){
    setImage(data.url);
  }

  setUploading(false);
};


/*
REMOVE IMAGE
*/

const removeImage = ()=>{
  setImage("");
};


/*
SUBMIT
*/

const handleSubmit = async(e)=>{
  e.preventDefault();

  if(!form.name || !form.sellingPrice || !form.category){
    alert("Fill all required fields");
    return;
  }

  await fetch("/api/products/create",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      ...form,
      image
    })
  });

  setShowPopup(true);
  setForm(emptyForm);
  setImage("");

  setTimeout(()=>setShowPopup(false),1500);
  console.log("created product")
};


return(

<div className="max-w-md mx-auto space-y-6 pb-20">


{/* SUCCESS POPUP */}

<AnimatePresence>
{showPopup &&(
<motion.div
initial={{opacity:0,scale:0.9}}
animate={{opacity:1,scale:1}}
exit={{opacity:0,scale:0.9}}
className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
>
<div className="bg-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-2 text-green-600 font-medium">
<CheckCircle2 size={18}/>
Product Added
</div>
</motion.div>
)}
</AnimatePresence>


{/* TITLE */}

<h1 className="text-xl font-semibold">
Add Product
</h1>


{/* FORM */}

<form
onSubmit={handleSubmit}
className="space-y-4 bg-white p-5 rounded-xl border border-[var(--border)] shadow-sm"
>


{/* NAME */}

<InputField
placeholder="Product Name"
value={form.name}
onChange={v=>setForm({...form,name:v})}
/>


{/* DESCRIPTION */}

<TextAreaField
placeholder="Short Description (optional)"
value={form.description}
onChange={v=>setForm({...form,description:v})}
/>


{/* PRICE */}

<InputField
placeholder="Price (₹)"
type="number"
value={form.sellingPrice}
onChange={v=>setForm({...form,sellingPrice:Number(v)})}
/>


{/* CATEGORY */}

<select
value={form.category}
onChange={e=>setForm({...form,category:e.target.value})}
className="input-style"
>
<option value="">Select Category</option>

{categories.map(cat=>(
<option key={cat._id} value={cat._id}>
{cat.name}
</option>
))}

</select>


{/* IMAGE */}

<label className="upload-box">
<Upload size={18}/>
Upload Product Image
<input type="file" hidden onChange={handleUpload}/>
</label>

{uploading &&(
<p className="text-sm text-gray-500">Uploading...</p>
)}

{image &&(
<div className="relative w-24">
<img src={image} className="rounded-lg"/>
<button
type="button"
onClick={removeImage}
className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full text-white"
>
<X size={14}/>
</button>
</div>
)}


{/* TOGGLES */}

<div className="flex gap-4 text-sm">

<label className="flex items-center gap-2">
<input
type="checkbox"
checked={form.isFeatured}
onChange={e=>setForm({...form,isFeatured:e.target.checked})}
/>
Featured
</label>

<label className="flex items-center gap-2">
<input
type="checkbox"
checked={form.isVisible}
onChange={e=>setForm({...form,isVisible:e.target.checked})}
/>
Visible
</label>

</div>


{/* BUTTON */}

<button className="btn-primary">
Save Product
</button>


</form>

</div>

);
}


/*
INPUT
*/

function InputField({placeholder,value,onChange,type="text"}){
return(
<input
type={type}
placeholder={placeholder}
value={value}
onChange={e=>onChange(e.target.value)}
className="input-style"
/>
);
}


/*
TEXTAREA
*/

function TextAreaField({placeholder,value,onChange}){
return(
<textarea
placeholder={placeholder}
value={value}
onChange={e=>onChange(e.target.value)}
className="input-style"
/>
);
}