import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();

  const products = await Product.find()
    .populate("category", "name")
    .sort({ createdAt: -1 });

  return Response.json(products);
}