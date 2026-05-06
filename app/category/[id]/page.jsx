"use client";

import { useEffect,useState  } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import CategoryPills from "@/components/store/CategoryPills";
import ProductSection from "@/components/store/ProductSection";
import Footer from "@/components/layout/Footer";

export default function CategoryPage(){

 const paramsData = useParams();

const initialCategory = paramsData?.id || "all";


  const params = useSearchParams();
  const productId = params.get("product");
  const [activeCategory, setActiveCategory] = useState(initialCategory);

useEffect(() => {

  const searchData =
    sessionStorage.getItem("searchProduct");

  if (!searchData) return;

  const { categoryId, productId } =
    JSON.parse(searchData);

  setActiveCategory(categoryId);

  const timer = setTimeout(() => {

    window.dispatchEvent(
      new CustomEvent("scrollToProduct", {
        detail: productId
      })
    );

    sessionStorage.removeItem(
      "searchProduct"
    );

  }, 350);

  return () => clearTimeout(timer);

}, []);

  return(
    <section className="bg-[#fffaf5] min-h-screen">

      <Navbar/>

      {/* HEADER */}
<div className="relative overflow-hidden">

  {/* BG */}
  <div className="absolute inset-0">
    <img
      src="/category/banner.jpg"
      className="w-full h-full object-cover"
      alt="Gift Banner"
    />
  </div>

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-black/45" />

  {/* CONTENT */}
  <div className="relative z-10 px-5 py-7 text-center text-white">

    <h1 className="text-2xl font-semibold tracking-wide">
      Gifts That Make Moments Special 🎁
    </h1>

    <p className="mt-2 text-sm text-white/85">
      Find the perfect surprise for your loved ones ✨
    </p>

  </div>

</div>

      <CategoryPills
  active={activeCategory}
  onChange={setActiveCategory}
/>

      <ProductSection categoryId={activeCategory} />
      <Footer/>

      
    </section>
  );
}