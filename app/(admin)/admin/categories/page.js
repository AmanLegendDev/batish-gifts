"use client";

import { useEffect,useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { Trash2,Plus,X,Upload } from "lucide-react";

export default function CategoriesPage(){

const [name,setName]=useState("");
const [image,setImage]=useState("");
const [uploading,setUploading]=useState(false);

const [categories,setCategories]=useState([]);
const [popup,setPopup]=useState(null);


/*
FETCH CATEGORIES
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
UPLOAD IMAGE
*/

const uploadImage=async(e)=>{

const file=e.target.files[0];

if(!file)return;

setUploading(true);

const fd=new FormData();

fd.append("file",file);

const res=await fetch("/api/upload",{

method:"POST",
body:fd

});

const data=await res.json();

if(data?.url){

setImage(data.url);

}

setUploading(false);

};


/*
REMOVE IMAGE
*/

const removeImage=()=>{

setImage("");

};


/*
CREATE CATEGORY
*/

const createCategory=async()=>{

if(!name.trim())return;

const res=await fetch("/api/categories/create",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name,
image

})

});

const data=await res.json();

if(data.error){

setPopup({
type:"error",
message:data.error
});

return;

}

setName("");
setImage("");

fetchCategories();

};


/*
DELETE CATEGORY
*/

const deleteCategory=(id)=>{

setPopup({
type:"delete",
id
});

};


const confirmDelete=async()=>{

await fetch("/api/categories/delete",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

id:popup.id

})

});

setPopup(null);

fetchCategories();

};


return(

<div className="space-y-6">


{/* HEADER */}

<div>

<h1 className="text-2xl text-yellow-400 font-semibold">

Categories Manager

</h1>

<p className="text-neutral-400">

Homepage slider categories

</p>

</div>


{/* CREATE CATEGORY */}

<div className="card p-4 space-y-4">


<input

value={name}

onChange={(e)=>setName(e.target.value)}

placeholder="Category name"

className="input-style"

/>


{/* IMAGE UPLOAD */}

<label className="upload-box">

<Upload size={18}/>

Upload Category Image

<input

type="file"

hidden

onChange={uploadImage}

/>

</label>


{uploading &&(

<p className="text-sm text-neutral-400">

Uploading...

</p>

)}


{/* IMAGE PREVIEW */}

{image &&(

<div className="relative w-24">

<img

src={image}

className="rounded-lg"

/>

<button

onClick={removeImage}

className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full"

>

<X size={14}/>

</button>

</div>

)}


<button

onClick={createCategory}

className="bg-yellow-400 text-black py-2 rounded-xl font-semibold flex items-center justify-center gap-2"

>

<Plus size={16}/>

Create Category

</button>

</div>


{/* CATEGORY LIST */}

<div className="grid grid-cols-2 gap-3">


{categories.map((cat,index)=>(

<motion.div

key={cat._id}

initial={{opacity:0,y:10}}

animate={{opacity:1,y:0}}

transition={{delay:index*0.05}}

className="card flex items-center justify-between p-3"

>


<div className="flex items-center gap-2">


{cat.image &&(

<img

src={cat.image}

className="w-10 h-10 rounded-full object-cover"

/>

)}


<span>

{cat.name}

</span>

</div>


<button

onClick={()=>deleteCategory(cat._id)}

className="text-red-400"

>

<Trash2 size={18}/>

</button>

</motion.div>

))}


</div>


{/* POPUP */}

<AnimatePresence>

{popup &&(

<motion.div

initial={{opacity:0}}

animate={{opacity:1}}

exit={{opacity:0}}

className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"

>

<motion.div

initial={{scale:0.8}}

animate={{scale:1}}

exit={{scale:0.8}}

className="card p-6 space-y-4 max-w-sm"

>


{popup.type==="delete" &&(

<>

<h2 className="text-lg font-semibold">

Delete category permanently?

</h2>


<div className="flex gap-3">

<button

onClick={confirmDelete}

className="flex-1 bg-red-500 py-2 rounded-lg"

>

Delete

</button>


<button

onClick={()=>setPopup(null)}

className="flex-1 bg-neutral-700 py-2 rounded-lg"

>

Cancel

</button>

</div>

</>

)}


{popup.type==="error" &&(

<>

<h2 className="text-lg font-semibold">

{popup.message}

</h2>


<button

onClick={()=>setPopup(null)}

className="w-full bg-yellow-400 py-2 rounded-lg text-black"

>

OK

</button>

</>

)}


</motion.div>

</motion.div>

)}

</AnimatePresence>


</div>

);

}