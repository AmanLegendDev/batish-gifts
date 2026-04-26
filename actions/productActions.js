"use server";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import slugify from "slugify";
import mongoose from "mongoose";
import Category from "@/models/Category";


// CREATE PRODUCT

export async function createProduct(data) {

try {

await connectDB();

const slug = slugify(data.title, {
lower: true
});

await Product.create({

title: data.title,

slug,

shortDescription: data.shortDescription,

description: data.description,

benefits: data.benefits,

ingredients: data.ingredients,

howToUse: data.howToUse,

size: data.size,

price: data.price,

images: data.images,

category: data.category,

stock: data.stock,

isFeatured: data.isFeatured,

isVisible: data.isVisible

});

return { success: true };

} catch (err) {

console.log(err);

return { error: "Server error" };

}

}


// GET FEATURED PRODUCTS (homepage ke liye)

export async function getFeaturedProducts() {

  await connectDB();

  return Product.find({
    isFeatured: true,
    isVisible: true,
  })
  .select("title price slug images")
  .limit(4)
  .lean();

}

export async function getProducts() {

  await connectDB();

  return Product.find()
    .select("title price slug shortDescription images category isVisible isFeatured stock")
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .lean();

}

export async function deleteProduct(id) {
  await connectDB();

  await Product.findByIdAndDelete(id);

  return { success: true };
}

export async function toggleProductField(
  id,
  field,
  value
) {
  await connectDB();

  await Product.findByIdAndUpdate(id, {
    [field]: value,
  });

  return { success: true };
}



export async function getSingleProduct(id) {

  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return Product.findById(id)
    .populate("category", "name")
    .lean();

}

export async function updateProduct(id, data) {
  await connectDB();

  await Product.findByIdAndUpdate(id, data, {
    new: true,
  });

  return { success: true };
}