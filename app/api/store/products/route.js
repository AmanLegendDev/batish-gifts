import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {

  await connectDB();

  const products = await Product.find({
    isVisible: true
  })
  .select("title price slug shortDescription images category")
  .populate("category", "name")
  .sort({ createdAt: -1 })
  .lean();

  return Response.json(products);

}