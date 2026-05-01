import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req){

await connectDB();

const { id } = await req.json();

await Order.findByIdAndUpdate(id,{

orderStatus:"out_for_delivery"

});

return Response.json({success:true});

}