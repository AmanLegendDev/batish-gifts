import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Navbar from "@/components/layout/Navbar";

export default async function ProductPage({ params }) {

  await connectDB();

  const { slug } = await params;

  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    return <div>Not found</div>;
  }

  const safeProduct = JSON.parse(JSON.stringify(product));

  return (
    <div className="p-10">
      <Navbar/>
      <h1>{safeProduct.name}</h1>
      <p>₹ {safeProduct.sellingPrice}</p>
      <img src={safeProduct.image} width="200" />
    </div>
  );
}