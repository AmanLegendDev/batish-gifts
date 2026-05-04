import mongoose from "mongoose";

const customOrderSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    address: String,
    item: String,
    note: String,

    status: {
      type: String,
      enum: ["new", "completed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.models.CustomOrder ||
  mongoose.model("CustomOrder", customOrderSchema);