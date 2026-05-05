import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: String,
    phone: String,
    address: String,
    note: String,

    items: [
      {
        title: String,
        price: Number,
        qty: Number,
      },
    ],

    totalAmount: Number,

    status: {
      type: String,
      enum: ["new", "confirmed", "delivered","cancelled",],
      default: "new",
    },
    orderType: {
  type: String,
  enum: ["cod", "whatsapp","custom_cod", "custom_whatsapp"],
  default: "cod"
},
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);