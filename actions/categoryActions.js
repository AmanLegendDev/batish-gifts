"use server";

import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import slugify from "slugify";

export async function createCategory(name, image) {
  try {
    await connectDB();

    if (!name) {
      return { error: "Name required" };
    }

    const slug = slugify(name, { lower: true });

    const exists = await Category.findOne({ slug });

    if (exists) {
      return { error: "Category already exists" };
    }

    await Category.create({
      name,
      slug,
      image: image || "",
    });

    return { success: true };
  } catch (err) {
    console.log("CATEGORY CREATE ERROR:", err);
    return { error: "Server error" };
  }
}

export async function getCategories() {
  await connectDB();

  return Category.find({ isActive: true })
    .select("name image slug")
    .sort({ createdAt: -1 })
    .lean();
}

export async function updateCategory(id, name, image) {
  await connectDB();

  if (!name) return { error: "Name required" };

  const slug = slugify(name, { lower: true });

  await Category.findByIdAndUpdate(id, {
    name,
    slug,
    image: image || "",
  });

  return { success: true };
}

export async function deleteCategory(id) {
  await connectDB();

  // hard delete नहीं — future safe (soft delete)
  await Category.findByIdAndUpdate(id, {
    isActive: false,
  });

  return { success: true };
}