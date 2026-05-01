"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditProductPage() {

const { id } = useParams();

const [form,setForm]=useState({

name:"",
description:"",
actualPrice:"",
sellingPrice:"",
category:"",
isFeatured:false,
isVisible:true

});
const [categories,setCategories]=useState([]);
const [image,setImage]=useState("");
const [loading,setLoading]=useState(true);
const [showPopup,setShowPopup]=useState(false);


/*
FETCH PRODUCT DATA
*/

useEffect(()=>{

async function loadData(){

const productRes = await fetch(`/api/products/${id}`);
const product = await productRes.json();

setForm({

name: product.name || "",
description: product.description || "",
actualPrice: product.actualPrice || "",
sellingPrice: product.sellingPrice || "",
category: product.category?._id || "",
isFeatured: product.isFeatured || false,
isVisible: product.isVisible ?? true

});
setImage(product.image);

const catRes = await fetch("/api/categories/dropdown");
const catData = await catRes.json();

setCategories(catData);

setLoading(false);

}

loadData();

},[id]);


/*
LIVE PROFIT PREVIEW
*/

const profitPreview =

form?.actualPrice && form?.sellingPrice

? form.sellingPrice - form.actualPrice

: 0;


/*
UPLOAD IMAGE
*/

const handleUpload = async(e)=>{

const file = e.target.files[0];

if(!file) return;

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

};


/*
REMOVE IMAGE
*/

const removeImage = ()=>{

setImage("");

};


/*
UPDATE PRODUCT
*/

const handleUpdate = async(e)=>{

e.preventDefault();

await fetch("/api/products/update",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

id,
...form,
image

})

});

setShowPopup(true);

setTimeout(()=>{

setShowPopup(false);

},1500);

};


if(loading){

return <p className="text-center text-neutral-400">Loading...</p>;

}


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

Product Updated ✅

</div>

</motion.div>

)}

</AnimatePresence>


<h1 className="text-2xl font-semibold text-yellow-400">

Edit Product

</h1>


<form

onSubmit={handleUpdate}

className="space-y-4 bg-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-xl"

>


<InputField

placeholder="Product Name"

value={form.name}

onChange={v=>setForm({...form,name:v})}

/>


<TextAreaField

placeholder="Description"

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

<div className="text-yellow-400 text-sm">

Profit per item: ₹ {profitPreview}

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

Replace Image

<input

type="file"

hidden

onChange={handleUpload}

/>

</label>


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

Update Product

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