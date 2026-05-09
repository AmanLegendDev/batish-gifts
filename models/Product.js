import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    sellingPrice: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    isVisible: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    /*
    NEW OPTIONAL COMMERCE FIELDS
    */

    badgeText: {
      type: String,
      default: "",
    },

    offerText: {
      type: String,
      default: "",
    },

    stockStatus: {
      type: String,
      enum: ["in_stock", "low_stock", "out_of_stock"],
      default: "in_stock",
    },

    deliveryInfo: {
      type: String,
      default: "",
    },

    sizes: [
      {
        type: String,
      },
    ],

    weights: [
      {
        type: String,
      },
    ],

    shortHighlights: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);