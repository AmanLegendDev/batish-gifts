"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

const DELIVERY_FEE = 30;

export default function CheckoutPage() {

const cart = useCartStore(state => state.cart);
const clearCart = useCartStore(state => state.clearCart);

const subtotal = cart.reduce(
(acc,item)=>acc + item.sellingPrice * item.qty,
0
);

const totalAmount = subtotal + DELIVERY_FEE;

const [loading,setLoading]=useState(false);

const [form,setForm] = useState({
customerName:"",
phone:"",
address:"",
note:""
});

const handleChange = e => {
setForm({...form,[e.target.name]:e.target.value});
};


/*
PLACE ORDER
*/

const placeOrder = async (type) => {

  if(!form.customerName || !form.phone || !form.address){
    alert("Please fill all required fields");
    return;
  }

  setLoading(true);

  const orderPayload = {
    customerName: form.customerName,
    phone: form.phone.replace(/^0/, ""),
    address: form.address,
    note: form.note,

    items: cart.map(item => ({
      title: item.name,
      price: item.sellingPrice,
      qty: item.qty
    })),

    totalAmount,

    orderType: type // 🔥 MAIN GAME
  };

  await fetch("/api/orders/create", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify(orderPayload)
  });

  /*
  LOCAL STORAGE (SUCCESS PAGE)
  */
  localStorage.setItem("lastOrder", JSON.stringify({
    ...orderPayload,
    paymentMethod: type.includes("whatsapp")
      ? "WhatsApp Order"
      : "Cash on Delivery"
  }));

  clearCart();

  /*
  WHATSAPP FLOW
  */
  if(type === "whatsapp"){

    let msg = `Hi, I want to order:\n\n`;

    cart.forEach(i=>{
      msg += `- ${i.name} x${i.qty}\n`;
    });

    msg += `\nTotal: ₹${totalAmount}`;
    msg += `\nName: ${form.customerName}`;
    msg += `\nAddress: ${form.address}`;

    const url = `https://wa.me/918219174058?text=${encodeURIComponent(msg)}`;

    window.open(url, "_blank");
  }

  window.location.href="/order-success";
};


return(

<section className="min-h-screen bg-white pb-28">

<Navbar/>

<div className="max-w-md mx-auto px-4 pt-6 space-y-6">


{/* HEADER */}

<div>
<h1 className="text-xl font-semibold text-gray-900">
Checkout
</h1>
<p className="text-sm text-gray-500">
Enter your delivery details
</p>
</div>


{/* FORM */}

<div className="space-y-3">

<input
name="customerName"
placeholder="Full Name"
className="input-style"
onChange={handleChange}
/>

<input
name="phone"
placeholder="Phone Number"
className="input-style"
onChange={handleChange}
/>

<input
name="address"
placeholder="Full Address"
className="input-style"
onChange={handleChange}
/>

<textarea
name="note"
placeholder="Extra note (optional)"
className="input-style"
onChange={handleChange}
/>

</div>


{/* SUMMARY */}

<div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">

{cart.map(item=>(
<div key={item._id} className="flex justify-between">
<span>{item.name} × {item.qty}</span>
<span>₹ {item.qty * item.sellingPrice}</span>
</div>
))}

<hr/>

<div className="flex justify-between">
<span>Subtotal</span>
<span>₹ {subtotal}</span>
</div>

<div className="flex justify-between">
<span>Delivery</span>
<span>₹ {DELIVERY_FEE}</span>
</div>

<div className="flex justify-between font-semibold text-[var(--primary)] text-base">
<span>Total</span>
<span>₹ {totalAmount}</span>
</div>

</div>


{/* PAYMENT INFO */}

<div className="text-sm text-gray-600 bg-green-50 border border-green-100 rounded-xl p-3">
💵 Payment Method: <b>Cash on Delivery</b><br/>
Pay when your order arrives.
</div>


{/* BUTTON */}

<div className="flex gap-3">

<motion.button
whileTap={{scale:.95}}
onClick={()=>placeOrder("cod")}
disabled={loading}
className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold"
>
{loading ? "Processing..." : "Order via COD"}
</motion.button>

<motion.button
whileTap={{scale:.95}}
onClick={()=>placeOrder("whatsapp")}
disabled={loading}
className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold"
>
WhatsApp Order
</motion.button>

</div>


</div>

</section>

);
}