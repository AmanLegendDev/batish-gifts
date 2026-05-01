import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {

await connectDB();

/*
NEW ORDERS
*/

const newOrders = await Order.countDocuments({
orderStatus: "placed"
});

/*
PROCESSING ORDERS
*/

const processingOrders = await Order.countDocuments({
paymentStatus: "pending",
orderStatus: {
$in: [
"confirmed",
"out_for_delivery",
"delivered"
]
}
});

/*
COMPLETED ORDERS
*/

const completedOrders = await Order.countDocuments({
paymentStatus: "paid"
});


return Response.json({

newOrders,
processingOrders,
completedOrders

});

}