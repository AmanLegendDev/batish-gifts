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
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    actualPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    profitPerItem: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    isVisible: {
      type: Boolean,
      default: true,
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    campus: {
      type: String,
      default: "HPU",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);


/*
AUTO PROFIT CALCULATION
sellingPrice - actualPrice
*/

productSchema.pre("save", function () {
  this.profitPerItem =
    this.sellingPrice - this.actualPrice;
});


/*
AUTO PROFIT UPDATE ON EDIT
*/

productSchema.pre("findOneAndUpdate", function () {

const update = this.getUpdate();

if (
update.actualPrice !== undefined ||
update.sellingPrice !== undefined
) {

const actual =
update.actualPrice ??
this._update.actualPrice;

const selling =
update.sellingPrice ??
this._update.sellingPrice;

if (actual !== undefined && selling !== undefined) {

update.profitPerItem =
selling - actual;

}

}

});


export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);