
export const runtime = "nodejs";
export const revalidate = 0;
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Image from "next/image";
import Link from "next/link";

import AddToCartSection from "./AddToCartSection";



export async function generateMetadata({
  params
}) {

  await connectDB();

  const slug = String(
    (await params)?.slug || ""
  );

  const product = await Product.findOne({
    slug,
    isVisible: true
  })
    .populate("category")
    .lean();

  if (!product) {

    return {
      title: "Product Not Found",
    };

  }

  const productName =
    product.name || "Gift Product";

  const categoryName =
    product.category?.name || "Gift";

  const description =
    product.description?.slice(0, 160) ||
    `Buy ${productName} from Aarav Gift Gallery Shimla. Premium ${categoryName.toLowerCase()} gifts available with easy ordering.`;

  const productUrl =
    `https://www.aaravgiftgallery.com/products/${product.slug}`;

  return {

   title:
`${productName} | Gift Shop Shimla`,

    description,

    keywords: [
      productName,
      `${categoryName} shimla`,
      "gift shop shimla",
      "custom gifts shimla",
      "birthday gifts shimla",
      "gift hampers shimla",
      "aarav gift gallery"
    ],

    alternates: {
      canonical: productUrl
    },

    openGraph: {

      title:
        `${productName} | Aarav Gift Gallery`,

      description,

      url: productUrl,

      siteName:
        "Aarav Gift Gallery",

      images: [
        {
          url:
            product.image ||
            "/og.jpg",

          width: 1200,
          height: 630,

          alt: productName
        }
      ],

      locale: "en_IN",

      type: "website"
    },

    twitter: {

      card: "summary_large_image",

      title:
        `${productName} | Aarav Gift Gallery`,

      description,

      images: [
        product.image ||
        "/og.jpg"
      ]
    }

  };

}




export default async function ProductPage({ params }) {

  await connectDB();

  const slug = String(
  (await params)?.slug || ""
);

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf5]">
        Invalid product
      </div>
    );
  }

const productRaw = await Product.findOne({
  slug,
  isVisible: true
}).lean();

  if (!productRaw) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf5]">
        Product not found
      </div>
    );
  }

  // ✅ SAFE SERIALIZATION
const product = {
  _id: productRaw._id.toString(),
  name: productRaw.name || "",
  slug: productRaw.slug || "",
  description: productRaw.description || "",
  sellingPrice: productRaw.sellingPrice || 0,
  image: productRaw.image || "/placeholder.png",
  isVisible: productRaw.isVisible || false,

category: null
};

  const relatedRaw = await Product.find({
    category: productRaw.category,
    _id: { $ne: productRaw._id },
    isVisible: true
  })
    .limit(4)
    .lean();

 const related = relatedRaw.map((item) => ({
  _id: item._id.toString(),
  name: item.name || "",
  slug: item.slug || "",
  image: item.image || "/placeholder.png",
  sellingPrice: item.sellingPrice || 0
}));




const productSchema = {
  "@context": "https://schema.org",

  "@type": "Product",

  name: product.name,

  image: [product.image],

  description: product.description,

  brand: {
    "@type": "Brand",
    name: "Aarav Gift Gallery"
  },

  offers: {

    "@type": "Offer",

    priceCurrency: "INR",

    price: product.sellingPrice,

    availability:
      "https://schema.org/InStock",

    url:
      `https://www.aaravgiftgallery.com/products/${product.slug}`

  }

};



  return (

    <><script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(productSchema)
  }}
/>

    <section className="bg-[#fffaf5] min-h-screen pb-20">

      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-5">

        {/* BACK */}
        <Link
          href="/category/all"
          className="inline-flex items-center gap-2 mb-5 text-sm text-gray-600 hover:text-[var(--primary)] transition"
        >
          ← Back
        </Link>


        {/* PRODUCT CARD */}
        <div className="bg-white rounded-[30px] overflow-hidden shadow-sm border border-gray-100">

          {/* IMAGE */}
          <div className="relative w-full h-[320px] md:h-[500px] overflow-hidden">

            <Image
              id="main-product-image"
              src={product.image || "/placeholder.png"}
              fill
              priority
              alt={product.name}
              sizes="100vw"
              className="object-cover"
            />

            {/* LOGO WATERMARK */}
{/* LOGO */}
<div className="absolute bottom-2 right-2 z-20  ">
  <Image
    src="/logo.jpg"
    alt="logo"
    width={28}
    height={28}
    className="object-contain rounded-full"
  />
</div>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

          </div>


          {/* DETAILS */}
          <div className="p-5 md:p-7">

            {/* CATEGORY */}
            <div className="inline-flex px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium mb-4">
              Gift Collection
            </div>


            {/* TITLE */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>


            {/* PRICE */}
            <p className="mt-3 text-2xl font-bold text-[var(--primary)]">
              ₹ {product.sellingPrice}
            </p>


            {/* DESCRIPTION */}
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              {product.description}
            </p>


            {/* ADD TO CART */}
            <AddToCartSection product={product} />

          </div>

        </div>


        {/* RELATED */}
        {related.length > 0 && (

          <div className="mt-12">

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-xl font-semibold text-gray-900">
                Related Gifts 🎁
              </h2>

              <Link
                href="/category/all"
                className="text-sm text-[var(--primary)] font-medium"
              >
                View More →
              </Link>

            </div>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

              {related.map((item) => (

                <Link
                  key={item._id}
                  href={`/products/${item.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition duration-300"
                >

                  {/* IMAGE */}
                  <div className="relative h-40 overflow-hidden">

                    <Image
                      src={item.image || "/placeholder.png"}
                      fill
                      alt={item.name}
                      sizes="(max-width:768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />

                    


                  </div>


                  {/* CONTENT */}
                  <div className="p-3">

                    <p className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
                      {item.name}
                    </p>

                    <div className="mt-2 flex items-center justify-between">

                      <p className="text-[var(--primary)] font-bold text-sm">
                        ₹ {item.sellingPrice}
                      </p>

                      <div className="text-[10px] px-2 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                        Gift
                      </div>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        )}

      </div>

      <Footer />

    </section>
    </>
  );
}