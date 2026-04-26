"use client";


import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/store/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function ProductsPage() {

const searchParams = useSearchParams();

const selectedCategory =
searchParams.get("category");

const [products, setProducts] = useState(null);

const [categories, setCategories] =
useState([]);

useEffect(() => {

const fetchData = async () => {

try {

const [productsRes, categoriesRes] = await Promise.all([
  fetch("/api/store/products"),
  fetch("/api/categories/dropdown"),
]);

const productsData = await productsRes.json();
const categoriesData = await categoriesRes.json();

setProducts(productsData);
setCategories(categoriesData);

} catch (err) {

console.error("Fetch failed", err);

}

};

fetchData();

}, []);


// FILTERED PRODUCTS MODE
if (!products)
return (
<div className="p-10 text-center">
Loading products...
</div>
);

const filteredProducts = selectedCategory && products
? products.filter(
p =>
p.category?._id?.toString() === selectedCategory
)
: [];





return (

<section className="bg-secondary min-h-screen">

<Navbar />

<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">


{/* PAGE HEADER */}

<div className="mb-8 text-center">

<h1 className="text-3xl md:text-4xl font-semibold text-primary">

Explore Our Collection

</h1>

<p className="text-neutral-500 mt-2 max-w-xl mx-auto">

Premium beauty essentials crafted for glowing skin,
healthy hair and confident everyday care.

</p>

</div>



{/* CATEGORY SLIDER */}

<div className="overflow-x-auto pb-4 mb-10">

<div className="flex gap-3 min-w-max">

<Link
href="/products" prefetch
className={`px-5 py-2 rounded-full border transition whitespace-nowrap

${!selectedCategory
? "bg-primary text-white"
: "bg-white text-primary border-primary hover:bg-primary hover:text-white"}
`}
>
All
</Link>


{categories?.map(cat => (

<Link
key={cat._id}
href={`/products?category=${cat._id}`} prefetch
className={`px-5 py-2 rounded-full border transition whitespace-nowrap

${selectedCategory === cat._id
? "bg-primary text-white"
: "bg-white text-primary border-primary hover:bg-primary hover:text-white"}
`}
>
{cat.name}
</Link>

))}

</div>

</div>



{/* CATEGORY FILTER MODE */}

{selectedCategory ? (

<div>

<h2 className="text-2xl font-semibold text-primary mb-6">

Selected Category Products

</h2>

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

{filteredProducts.length === 0 ? (

<div className="text-neutral-400">

No products found

</div>

) : (

filteredProducts.map(product => (

<ProductCard
key={product._id}
product={product}
/>

))

)}

</div>

</div>

) : (

/* ALL PRODUCTS GROUPED BY CATEGORY */

<div className="space-y-16">

{categories?.map(cat => {

const categoryProducts =
products.filter(
p =>
p.category?._id?.toString() ===
cat._id.toString()
);

if (categoryProducts.length === 0)
return null;

return (

<div key={cat._id}>

<div className="flex justify-between items-center mb-5">

<h2 className="text-2xl font-semibold text-primary">

{cat.name}

</h2>

<Link
href={`/products?category=${cat._id}`}
className="text-sm text-primary hover:underline"
>
View All
</Link>

</div>


<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

{categoryProducts?.map(product => (

<ProductCard
key={product._id}
product={product}
/>

))}

</div>

</div>

);

})}

</div>

)}

</div>

</section>

);

}