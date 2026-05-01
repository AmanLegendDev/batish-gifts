import Hero from "@/components/store/Hero";
import CategorySlider from "@/components/store/CategorySlider";
import ProductSection from "@/components/store/ProductSection";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {

return (

<div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
  <Navbar/>

<section className="snap-start">
<Hero />
</section>

<section id="categories" className="snap-start">
<CategorySlider />
</section>

<section className="snap-start">
<ProductSection />
</section>

</div>

);

}