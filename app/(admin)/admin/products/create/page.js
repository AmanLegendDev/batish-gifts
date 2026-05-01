"use client";

import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsPage() {

const emptyForm = {
name: "",
description: "",
actualPrice: "",
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
LIVE PROFIT CALCULATION
*/

const profitPreview =

form.actualPrice && form.sellingPrice

? form.sellingPrice - form.actualPrice

: 0;


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
SUBMIT PRODUCT
*/

const handleSubmit = async(e)=>{

e.preventDefault();

if(!form.name || !form.actualPrice || !form.sellingPrice || !form.category){

alert("Fill all required fields");

return;

}

await fetch("/api/products/create",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

...form,
image

})

});

setShowPopup(true);

setForm(emptyForm);

setImage("");

setTimeout(()=>{

setShowPopup(false);

},1500);

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

className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"

>

<div className="bg-neutral-900 text-white px-6 py-4 rounded-xl">

Product Added ✅

</div>

</motion.div>

)}

</AnimatePresence>


<h1 className="text-2xl font-semibold text-yellow-400">

Add Product

</h1>


<form

onSubmit={handleSubmit}

className="space-y-4 bg-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-xl"

>


<InputField

placeholder="Product Name"

value={form.name}

onChange={v=>setForm({...form,name:v})}

/>


<TextAreaField

placeholder="Short Description (optional)"

value={form.description}

onChange={v=>setForm({...form,description:v})}

/>


<InputField

placeholder="Actual Price"

type="number"

value={form.actualPrice}

onChange={v=>setForm({...form,actualPrice:Number(v)})}

/>


<InputField

placeholder="Selling Price"

type="number"

value={form.sellingPrice}

onChange={v=>setForm({...form,sellingPrice:Number(v)})}

/>


{/* PROFIT PREVIEW */}

<div className="text-sm text-yellow-400">

Profit per item:

₹ {profitPreview}

</div>


<select

value={form.category}

onChange={e=>setForm({...form,category:e.target.value})}

className="input-style"

>

<option value="">

Select Category

</option>

{categories.map(cat=>(

<option key={cat._id} value={cat._id}>

{cat.name}

</option>

))}

</select>


<label className="upload-box">

<Upload size={18}/>

Upload Image

<input

type="file"

hidden

onChange={handleUpload}

/>

</label>


{uploading &&(

<p className="text-sm text-neutral-400">

Uploading...

</p>

)}


{image &&(

<div className="relative w-24">

<img

src={image}

className="rounded-lg"

/>

<button

type="button"

onClick={removeImage}

className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full"

>

<X size={14}/>

</button>

</div>

)}


<label className="flex gap-2 text-neutral-300">

<input

type="checkbox"

checked={form.isFeatured}

onChange={e=>setForm({...form,isFeatured:e.target.checked})}

/>

Featured

</label>


<label className="flex gap-2 text-neutral-300">

<input

type="checkbox"

checked={form.isVisible}

onChange={e=>setForm({...form,isVisible:e.target.checked})}

/>

Visible

</label>


<button className="submit-btn">

Save Product

</button>


</form>

</div>

);

}


/*
INPUT FIELD
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
TEXTAREA FIELD
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