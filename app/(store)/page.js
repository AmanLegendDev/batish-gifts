import Hero from "@/components/store/Hero";
import CategorySlider from "@/components/store/CategorySlider";
import ProductSection from "@/components/store/ProductSection";
import Navbar from "@/components/layout/Navbar";
import FreebieProgress from "@/components/store/FreebieProgress";
import CustomOrderSection from "@/components/store/CustomOrderSection";
import DeliveryPricing from "@/components/store/DeliveryPricing";
import TrustSection from "@/components/store/TrustSection";
import Footer from "@/components/layout/Footer";
import FeaturedProducts from "@/components/store/FeaturedProducts";
import FloatingCart from "@/components/store/FloatingCart";


export default function HomePage() {

return (

<div className="min-h-screen">
    <Navbar/>

<Hero/>

<CategorySlider/>

<FeaturedProducts/>

{/* 🔥 MINI CTA */}
<CustomOrderSection/>

<TrustSection/>

<Footer/>

<FloatingCart />

</div>

);

}