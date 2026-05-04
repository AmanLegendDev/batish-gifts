"use server";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import slugify from "slugify";
import mongoose from "mongoose";

/*
CREATE PRODUCT
*/

export async function createProduct(data) {
  try {
    await connectDB();

    if (!data.name) return { error: "Name required" };
    if (!data.image) return { error: "Image required" };
    if (!data.category) return { error: "Category required" };
    if (!data.sellingPrice) return { error: "Price required" };

    const slug =
      slugify(data.name, { lower: true }) +
      "-" +
      Date.now();

    await Product.create({
      name: data.name,
      slug,
      description: data.description || "",
      sellingPrice: Number(data.sellingPrice),
      image: data.image,
      category: data.category,
      isFeatured: data.isFeatured ?? false,
      isVisible: data.isVisible ?? true,
    });

    return { success: true };
  } catch (err) {
    console.log("CREATE PRODUCT ERROR:", err);
    return { error: "Server error" };
  }
}

/*
GET ALL PRODUCTS
*/

export async function getProducts() {
  await connectDB();

  return Product.find({ isVisible: true })
    .select("name description sellingPrice image category isFeatured slug")
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .lean();
}

/*
ADMIN GET (ALL including hidden)
*/

export async function getAllProductsAdmin() {
  await connectDB();

  return Product.find()
    .select("name sellingPrice image category isVisible isFeatured slug")
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .lean();
}

/*
DELETE PRODUCT (SOFT DELETE)
*/

export async function deleteProduct(id) {
  await connectDB();

  await Product.findByIdAndUpdate(id, {
    isVisible: false,
  });

  return { success: true };
}

/*
TOGGLE FEATURED / VISIBILITY
*/

export async function toggleProductField(id, field, value) {
  await connectDB();

  if (!["isFeatured", "isVisible"].includes(field)) {
    return { error: "Invalid field" };
  }

  await Product.findByIdAndUpdate(id, {
    [field]: value,
  });

  return { success: true };
}

/*
GET SINGLE PRODUCT
*/

export async function getSingleProduct(id) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  return Product.findById(id)
    .populate("category", "name")
    .lean();
}

/*
UPDATE PRODUCT
*/

export async function updateProduct(id, data) {
  await connectDB();

  await Product.findByIdAndUpdate(
    id,
    {
      name: data.name,
      description: data.description,
      sellingPrice: Number(data.sellingPrice),
      image: data.image,
      category: data.category,
      isFeatured: data.isFeatured,
      isVisible: data.isVisible,
    },
    { new: true }
  );

  return { success: true };
}

/*
FEATURED PRODUCTS (HOME)
*/

export async function getFeaturedProducts() {

  await connectDB();

  const products = await Product.find({
    isFeatured: true,
    isVisible: true
  })
  .select("name sellingPrice image slug")
  .limit(6)
  .lean();

  // ✅ IMPORTANT FIX
  return products.map(p => ({
    ...p,
    _id: p._id.toString()
  }));

}