export const dynamic = "force-dynamic";
import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "@/actions/productActions";
import Link from "next/link";

export default async function FeaturedProducts() {

  const products = await getFeaturedProducts();

  if (!products.length) return null;

  return (

    <section className="bg-white">

      <div className="max-w-7xl mx-auto px-4 py-14">

        {/* 🔥 HEADER */}
        <div className="flex items-end justify-between mb-8">

          <div>
            <p className="text-xs tracking-[3px] text-[var(--primary)] uppercase">
              Handpicked
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-1">
              Featured Gifts 🎁
            </h2>
          </div>

          <Link
            href="/category/all"
            className="text-sm text-[var(--primary)] font-medium"
          >
            View All →
          </Link>

        </div>


        {/* 🔥 PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {products.map((product) => (

            <div
              key={product._id}
              className="relative group"
            >

              {/* BADGE */}
              <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-medium shadow">
                ⭐ Featured
              </div>

              <ProductCard product={product} />

            </div>

          ))}

        </div>


        {/* 🔥 CTA */}
        <div className="mt-10 text-center">

          <Link
            href="/category/all"
            className="inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-medium shadow-md hover:scale-[1.04] transition"
          >
            Explore Full Collection
          </Link>

        </div>

      </div>

    </section>

  );
}