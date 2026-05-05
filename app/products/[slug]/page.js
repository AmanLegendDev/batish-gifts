import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

import AddToCartSection from "./AddToCartSection";
import Footer from "@/components/layout/Footer";

export default async function ProductPage({ params }) {

  await connectDB();

  const { slug } = await params;

  const product = await Product.findOne({ slug })
    .populate("category")
    .lean();

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const related = await Product.find({
    category: product.category._id,
    _id: { $ne: product._id },
    isVisible: true
  }).limit(6).lean();

  return (
    <section className="bg-white min-h-screen pb-20">

      <Navbar/>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* 🔙 BACK BUTTON */}
        <Link
          href="/category/all"
          className="inline-block mb-4 text-sm text-gray-600 hover:text-[var(--primary)]"
        >
          ← Back
        </Link>


        {/* IMAGE */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
          <Image
            id="main-product-image"
            src={product.image}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>


        {/* DETAILS */}
        <div className="mt-6 space-y-3">

          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            {product.name}
          </h1>

          <p className="text-[var(--primary)] text-lg font-bold">
            ₹ {product.sellingPrice}
          </p>

          <p className="text-sm text-gray-500">
            {product.description}
          </p>

        </div>


        {/* ADD TO CART */}
        <AddToCartSection product={JSON.parse(JSON.stringify(product))} />


        {/* RELATED */}
        <div className="mt-10">

          <h2 className="text-lg font-semibold mb-4">
            Related Gifts 🎁
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {related.map(item => (
              <Link
                key={item._id}
                href={`/products/${item.slug}`}
                className="group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >

                <div className="relative w-full h-36">
                  <Image
                    src={item.image}
                    fill
                    alt={item.name}
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-3">
                  <p className="text-sm font-medium line-clamp-2">
                    {item.name}
                  </p>

                  <p className="text-[var(--primary)] font-semibold text-sm mt-1">
                    ₹ {item.sellingPrice}
                  </p>
                </div>

              </Link>
              
            ))}
            

          </div>

        </div>

      </div>
      <Footer/>
    </section>
  );
}