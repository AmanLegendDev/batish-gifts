import Link from "next/link";

export default function Footer(){

return(

<footer className="bg-white border-t border-gray-100 mt-12">

<div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

{/* BRAND */}
<div>
<h2 className="text-[var(--primary)] text-lg font-semibold">
Aarav Gift Gallery
</h2>

<p className="text-gray-500 mt-3 text-sm leading-relaxed">
aesthetic & meaningful gifts for every special moment.
Make your loved ones smile 💝
</p>
</div>


{/* LINKS */}
<div>
<h3 className="font-semibold mb-3 text-gray-900">Explore</h3>

<div className="flex flex-col gap-2 text-sm text-gray-500">

<Link href="/">Home</Link>
<Link href="#categories">Categories</Link>
<Link href="/category/all">Shop</Link>

<Link href="/custom-order">
Custom Order
</Link>

</div>
</div>


{/* INFO */}
<div>
<h3 className="font-semibold mb-3 text-gray-900">Store Info</h3>

<div className="flex flex-col gap-2 text-sm text-gray-500">

<p>🎁 Unique gift collections</p>
<p>💝 Custom gift options</p>
<p>📦 Easy ordering process</p>

</div>
</div>


{/* CONTACT */}
<div>
<h3 className="font-semibold mb-3 text-gray-900">Contact</h3>

<div className="flex flex-col gap-2 text-sm text-gray-500">

<p>Shimla</p>

<a
href="tel:9459365278"
className="hover:text-[var(--primary)] transition"
>
📞 +91 9459365278
</a>

<a
href="https://wa.me/919459365278"
target="_blank"
className="hover:text-[var(--primary)] transition"
>
💬 WhatsApp
</a>

</div>
</div>

</div>


{/* BOTTOM */}
<div className="text-center text-xs text-gray-400 pb-6">

© {new Date().getFullYear()} Aarav Gift Gallery  

<br/>

Built by <span className="text-[var(--primary)] font-medium">Aman Digital Solution</span>

</div>

</footer>

);
}