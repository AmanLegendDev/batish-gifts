import Hero from "@/components/store/Hero";
import CategorySlider from "@/components/store/CategorySlider";
import ProductSection from "@/components/store/ProductSection";
import Navbar from "@/components/layout/Navbar";
import FreebieProgress from "@/components/store/FreebieProgress";
import CustomOrderSection from "@/components/store/CustomOrderSection";
import DeliveryPricing from "@/components/store/DeliveryPricing";
import TrustSection from "@/components/store/TrustSection";
import Footer from "@/components/layout/Footer";


export default function HomePage() {

return (

<div className=" h-screen ">
  <Navbar/>

<section className="">
<Hero />
</section>

<section id="categories" className="">
<CategorySlider />
</section>

<section className="">
<ProductSection />
</section>

<section className="">
<FreebieProgress />
</section>


<section className="">
<CustomOrderSection />
</section>


<section className="">
<DeliveryPricing />
</section>

<section className="">
<TrustSection />
</section>


<section className="">
<Footer />
</section>



</div>

);

}