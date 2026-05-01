import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(){

await connectDB();

const orders = await Order.find({

paymentStatus:"pending",

orderStatus:{
$in:[
"confirmed",
"out_for_delivery",
"delivered"
]
}

}).sort({createdAt:-1});

return Response.json(orders);

}