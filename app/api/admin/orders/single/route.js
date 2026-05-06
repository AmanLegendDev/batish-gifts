import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req){

  await connectDB();

  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  if(!id){
    return Response.json(
      { error:"Order id missing" },
      { status:400 }
    );
  }

  const order = await Order.findById(id);

  if(!order){
    return Response.json(
      { error:"Order not found" },
      { status:404 }
    );
  }

  return Response.json(order);

}