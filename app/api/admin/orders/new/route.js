import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(){
  await connectDB();

  const orders = await Order.find({ status:"new" })
    .sort({ createdAt:-1 });

  return Response.json(orders);
}