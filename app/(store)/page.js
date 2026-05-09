import Hero from "@/components/store/Hero";
import CategorySlider from "@/components/store/CategorySlider";
import Navbar from "@/components/layout/Navbar";

import CustomOrderSection from "@/components/store/CustomOrderSection";
import TrustSection from "@/components/store/TrustSection";

import Footer from "@/components/layout/Footer";

import FeaturedProducts from "@/components/store/FeaturedProducts";

import FloatingCart from "@/components/store/FloatingCart";

export default function HomePage() {

return(

<div className="min-h-screen bg-[#fffaf5] overflow-x-hidden">


{/* NAVBAR */}

<Navbar/>


{/* HERO */}

<section className="relative">

<Hero/>

</section>


{/* CATEGORY STRIP */}

<section className="relative z-10 -mt-2 md:-mt-4">

<div className="max-w-7xl mx-auto px-4">

<div className="rounded-[32px] bg-white border border-orange-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden">

<CategorySlider/>

</div>

</div>

</section>


{/* FEATURED PRODUCTS */}

<section className="py-10 md:py-14">

<div className="max-w-7xl mx-auto px-4 space-y-8">


{/* SECTION HEADING */}

<div className="flex items-end justify-between gap-4">

<div className="space-y-2">

<p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-[#0f766e] uppercase">

Trending Collection

</p>

<h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">

Popular Gifts <br className="hidden sm:block"/>

& Shopping Picks

</h2>

<p className="max-w-xl text-sm md:text-base text-slate-500 leading-relaxed">

Discover curated gifts, toys, lifestyle accessories and premium shopping products for every special moment.

</p>

</div>


{/* MINI BADGE */}

<div className="hidden md:flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">

🔥 Fast Moving Products

</div>

</div>


{/* PRODUCTS */}

<div className="relative">

<FeaturedProducts/>

</div>

</div>

</section>


{/* OFFER / CUSTOM SECTION */}

<section className="py-4 md:py-8">

<div className="max-w-7xl mx-auto px-4">

<div className="rounded-[36px] overflow-hidden bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 shadow-[0_20px_60px_rgba(255,107,0,0.22)]">

<CustomOrderSection/>

</div>

</div>

</section>


{/* TRUST SECTION */}

<section className="py-10 md:py-14">

<div className="max-w-7xl mx-auto px-4">

<div className="space-y-3 mb-8 text-center">

<p className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-[#0f766e]">

Why Shop With Us

</p>

<h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">

Trusted Local Shopping Experience

</h2>

<p className="max-w-2xl mx-auto text-sm md:text-base text-slate-500 leading-relaxed">

From thoughtful gifts to lifestyle products, we bring premium shopping experience with fast support and trusted quality.

</p>

</div>

<TrustSection/>

</div>

</section>


{/* FOOTER */}

<Footer/>


{/* FLOATING CART */}

<FloatingCart/>

</div>

);

}