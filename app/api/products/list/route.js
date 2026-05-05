import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req){

  await connectDB();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  let filter = { isVisible: true };

  if(category && category !== "all"){
    filter.category = category;
  }

  const products = await Product.find(filter)
    .populate("category")
    .sort({ createdAt: -1 });

  return Response.json(products);
}