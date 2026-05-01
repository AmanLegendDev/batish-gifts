import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "@/actions/productActions";

import Link from "next/link";

export default async function FeaturedProducts() {

const products = await getFeaturedProducts();

if (!products.length) return null;

return (

<section className="bg-secondary">

<div className="max-w-7xl mx-auto px-6 py-20">


{/* HEADER */}

<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">


<div>

<p className="text-sm tracking-wide text-accent uppercase">

Our Picks

</p>

<h2 className="text-3xl md:text-4xl font-semibold text-primary">

Featured Products

</h2>

</div>


<Link
href="/products"
className="border border-primary text-primary px-5 py-2 rounded-xl hover:bg-primary hover:text-white transition"
>

View All Products

</Link>


</div>



{/* PRODUCT GRID */}

<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{products.map((product) => (

<div
key={product._id}
className="group relative"
>


{/* FEATURED BADGE */}

<div className="absolute top-3 left-3 z-10 bg-white text-primary text-xs px-3 py-1 rounded-full shadow-soft">

Featured

</div>


{/* CARD */}

<div className="transform group-hover:-translate-y-1 transition duration-300">

<ProductCard product={product} />

</div>


</div>

))}

</div>



{/* BOTTOM CTA */}

<div className="mt-14 text-center">

<Link
href="/products"
className="bg-primary text-white px-8 py-3 rounded-xl shadow-soft hover:scale-[1.03] transition"
>

Explore Full Collection

</Link>

</div>


</div>

</section>

);

}