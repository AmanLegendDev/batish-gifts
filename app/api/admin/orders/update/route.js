import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req){

  await connectDB();

  const body = await req.json();

  const {
    id,
    customerName,
    phone,
    address,
    note,
    items,
    totalAmount
  } = body;

  if(!id){
    return Response.json(
      { error:"Order id missing" },
      { status:400 }
    );
  }

  await Order.findByIdAndUpdate(id,{
    customerName,
    phone,
    address,
    note,
    items,
    totalAmount
  });

  return Response.json({
    success:true
  });

}