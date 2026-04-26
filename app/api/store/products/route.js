import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET() {

  await connectDB();

  const products = await Product.find({
    isVisible: true
  })
    .populate("category")
    .sort({ createdAt: -1 })
    .lean();

  return Response.json(products);

}