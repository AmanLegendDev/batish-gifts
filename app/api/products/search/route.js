import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req){

  await connectDB();

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if(!q) return Response.json([]);

  const products = await Product.find({
    name: { $regex: q, $options: "i" },
    isVisible: true // ✅ OLD DATA FIX
  })
  .select("name image slug category sellingPrice")
  .populate("category")
  .limit(8) // ✅ FAST RESPONSE
  .lean();

  return Response.json(products);
}