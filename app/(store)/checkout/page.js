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

const handlePlaceOrder = async () => {

if(!form.customerName || !form.phone || !form.address){
alert("Please fill all required fields");
return;
}

setLoading(true);

const res = await fetch("/api/orders/create", {
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
...form,
items: cart.map(item => ({
productId: item._id,
title: item.name,
sellingPrice: item.sellingPrice,
actualPrice: item.actualPrice,
qty: item.qty
})),
subtotal,
deliveryCharge: DELIVERY_FEE,
totalAmount,
paymentMethod: "COD"
})
});

const data = await res.json();

/*
SAVE FOR SUCCESS PAGE
*/

localStorage.setItem("lastOrder", JSON.stringify({
...form,
items: cart,
subtotal,
deliveryCharge: DELIVERY_FEE,
totalAmount,
paymentMethod: "Cash on Delivery"
}));

clearCart();

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

<motion.button
whileTap={{scale:.95}}
onClick={handlePlaceOrder}
disabled={loading}
className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold shadow-lg"
>

{loading ? "Placing Order..." : "Place Order"}

</motion.button>


</div>

</section>

);
}