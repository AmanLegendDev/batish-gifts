export const dynamic = "force-dynamic";
import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "@/actions/productActions";
import Link from "next/link";

export default async function FeaturedProducts() {

  const products = await getFeaturedProducts();

  if (!products.length) return null;

  return (

    <section className="relative bg-gradient-to-b from-white to-[#fffaf8] overflow-hidden">
{/* SOFT GLOW */}
<div className="absolute top-0 right-0 w-72 h-72 bg-[var(--primary)]/5 blur-3xl rounded-full" />
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* 🔥 HEADER */}
        <div className="flex items-end justify-between mb-8">

          <div>
<p className="text-[11px] tracking-[4px] text-[var(--primary)] uppercase font-medium">
  Handpicked Collection
</p>

<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
  Featured Gifts ✨
</h2>

<p className="text-sm text-gray-500 mt-2">
  Most loved gifts from Aarav Gift Gallery
</p>
          </div>

          

        </div>


        {/* 🔥 PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">

          {products.map((product) => (

            <div
              key={product._id}
              className="relative group"
            >

              {/* BADGE */}
              <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold shadow-md text-[var(--primary)]">
                ✨ Bestseller
              </div>

              <ProductCard product={product} />

            </div>

          ))}

        </div>


        {/* 🔥 CTA */}
        <div className="mt-10 text-center">

          <Link
            href="/category/all"
               className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-7 py-3 rounded-2xl text-sm font-semibold shadow-xl hover:scale-[1.03] transition"          >
            Explore Full Collection ✨
          </Link>

        </div>

      </div>

    </section>

  );
}