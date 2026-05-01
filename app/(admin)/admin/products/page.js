"use client";

import { useEffect,useState } from "react";
import Link from "next/link";
import { motion,AnimatePresence } from "framer-motion";
import {
Trash2,
Pencil,
Eye,
EyeOff,
Star,
StarOff
} from "lucide-react";


export default function ProductsPage(){

const [products,setProducts]=useState([]);
const [popup,setPopup]=useState(null);


/*
FETCH PRODUCTS
*/

const fetchProducts=async()=>{

const res=await fetch("/api/products/list");

const data=await res.json();

setProducts(data);

};


useEffect(()=>{

fetchProducts();

},[]);


/*
DELETE PRODUCT
*/

const deleteProduct=(id)=>{

setPopup({

type:"delete",
id

});

};


/*
CONFIRM DELETE
*/

const confirmDelete=async()=>{

await fetch("/api/products/delete",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
id:popup.id
})

});

setPopup(null);

fetchProducts();

};


/*
TOGGLE FEATURED / VISIBILITY
*/

const toggleField=async(id,field,value)=>{

await fetch("/api/products/toggle",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

id,
field,
value

})

});

fetchProducts();

};


return(

<div className="space-y-6">


{/* HEADER */}

<div className="flex justify-between items-center">

<div>

<h1 className="text-2xl text-yellow-400 font-semibold">

Products Inventory

</h1>

<p className="text-neutral-400 text-sm">

Manage store items quickly

</p>

</div>


<Link

href="/admin/products/create"

className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold"

>

+ Add

</Link>

</div>



{/* EMPTY STATE */}

{products.length===0 &&(

<div className="card p-6 text-center text-neutral-400">

No products yet

</div>

)}



{/* PRODUCT LIST */}

<div className="space-y-3">


{products.map((product,index)=>(

<motion.div

key={product._id}

initial={{opacity:0,y:12}}

animate={{opacity:1,y:0}}

transition={{delay:index*0.04}}

className="card p-4 flex flex-col gap-3"

>


{/* TOP ROW */}

<div className="flex gap-3 items-center">


<img

src={product.image || "/placeholder.png"}

className="w-14 h-14 rounded-lg object-cover"

/>


<div className="flex-1">


<h3 className="font-semibold">

{product.name}

</h3>


<p className="text-xs text-neutral-400">

{product.category?.name}

</p>


<div className="text-sm flex gap-2">

<span className="text-yellow-400">

₹ {product.sellingPrice}

</span>

<span className="line-through text-neutral-500">

₹ {product.actualPrice}

</span>

</div>


<p className="text-xs text-green-400">

Profit ₹ {product.profitPerItem}

</p>


</div>


<Link

href={`/admin/products/edit/${product._id}`}

className="text-blue-400"

>

<Pencil size={18}/>

</Link>


<button

onClick={()=>deleteProduct(product._id)}

className="text-red-400"

>

<Trash2 size={18}/>

</button>


</div>



{/* ACTION ROW */}

<div className="flex gap-3">


<ToggleBtn

active={product.isVisible}

onClick={()=>toggleField(

product._id,

"isVisible",

!product.isVisible

)}

iconOn={<Eye size={16}/>}

iconOff={<EyeOff size={16}/>}

label="Visible"

/>


<ToggleBtn

active={product.isFeatured}

onClick={()=>toggleField(

product._id,

"isFeatured",

!product.isFeatured

)}

iconOn={<Star size={16}/>}

iconOff={<StarOff size={16}/>}

label="Featured"

/>


</div>


</motion.div>

))}


</div>



{/* DELETE POPUP */}

<AnimatePresence>

{popup &&(

<motion.div

initial={{opacity:0}}

animate={{opacity:1}}

exit={{opacity:0}}

className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"

>

<motion.div

initial={{scale:0.85}}

animate={{scale:1}}

exit={{scale:0.85}}

className="card p-6 space-y-4 max-w-sm"

>


<h2 className="text-lg font-semibold">

Delete this product permanently?

</h2>


<div className="flex gap-3">


<button

onClick={confirmDelete}

className="flex-1 bg-red-500 py-2 rounded-lg font-semibold"

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


</motion.div>

</motion.div>

)}

</AnimatePresence>


</div>

);

}



/*
TOGGLE BUTTON COMPONENT
*/

function ToggleBtn({

active,
onClick,
iconOn,
iconOff,
label

}){

return(

<button

onClick={onClick}

className={`

flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition

${active
?"bg-yellow-400 text-black"
:"bg-neutral-800 text-neutral-400"}

`}

>

{active?iconOn:iconOff}

{label}

</button>

);

};