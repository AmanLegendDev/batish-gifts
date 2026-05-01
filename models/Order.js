import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,

  title: String,

  sellingPrice: Number,

  actualPrice: Number,

  qty: Number,

  profit: Number,
});


const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    hostel: {
      type: String,
      required: true,
    },

    room: {
      type: String,
      required: true,
    },

    note: {
      type: String,
      default: "",
    },

    items: [orderItemSchema],

    subtotal: {
      type: Number,
      required: true,
    },

    deliveryCharge: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    productProfit: {
      type: Number,
      default: 0,
    },

    netProfit: {
      type: Number,
      default: 0,
    },

    campus: {
      type: String,
      default: "HPU",
      index: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: [
       "placed",
"confirmed",
"out_for_delivery",
"delivered",
        "cancelled",
      ],
      default: "placed",
      index: true,
    },

    estimatedDeliveryTime: {
      type: Number,
      default: 20,
    },

    whatsappAlertSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


/*
AUTO PROFIT CALCULATION MIDDLEWARE
*/

orderSchema.pre("save", function (next) {

  let productProfitTotal = 0;

  this.items.forEach((item) => {

    const itemProfit =
      (item.sellingPrice - item.actualPrice) *
      item.qty;

    item.profit = itemProfit;

    productProfitTotal += itemProfit;

  });


  this.productProfit = productProfitTotal;


  /*
  MIDNIGHT MART MODEL:
  DELIVERY CHARGE = EXTRA PROFIT
  */

  this.netProfit =
    this.productProfit + this.deliveryCharge;


  next();
});


export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);