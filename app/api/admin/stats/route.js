import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import CustomOrder from "@/models/CustomOrder";

export async function GET(){

  await connectDB();

  /*
  TODAY RANGE (12AM → 12AM)
  */
  const start = new Date();
  start.setHours(0,0,0,0);

  const end = new Date();
  end.setHours(23,59,59,999);


  /*
  STATUS COUNTS (🔥 FIXED)
  */
const newOrders = await Order.countDocuments({
  status: "new"
});

const processingOrders = await Order.countDocuments({
  status: "confirmed"
});

const completedOrders = await Order.countDocuments({
  status: "delivered"
});


  /*
  CUSTOM ORDERS
  */
const customOrders = await CustomOrder.countDocuments({
  status: "new"
});


  /*
  TODAY ORDERS
  */
  const todayOrders = await Order.find({
    createdAt:{
      $gte:start,
      $lte:end
    }
  });


  /*
  ALL ORDERS
  */
  const allOrders = await Order.find();


  /*
  CALCULATIONS
  */
  const todayRevenue = todayOrders.reduce(
    (acc,o)=>acc + (o.totalAmount || 0),
    0
  );

  const totalRevenue = allOrders.reduce(
    (acc,o)=>acc + (o.totalAmount || 0),
    0
  );


  return Response.json({

  newOrders,
  confirmedOrders: processingOrders,
  deliveredOrders: completedOrders,
  customOrders,

  todayOrders: todayOrders.length,

  todayRevenue,
  totalRevenue,

  totalOrders: allOrders.length

  });

}