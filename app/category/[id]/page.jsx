import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import CategoryPageClient from "./CategoryPageClient";

import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export async function generateMetadata({
  params
}) {

  await connectDB();

  const categoryId =
    (await params)?.id;

  if (categoryId === "all") {

    return {

      title:
        "All Gifts | Gift Shop Shimla",

      description:
        "Explore birthday gifts, perfumes, toys, handmade gifts and hampers from Aarav Gift Gallery Shimla."

    };

  }

  const category =
    await Category.findById(categoryId)
      .lean();

  if (!category) {

    return {
      title:
        "Gift Category | Aarav Gift Gallery"
    };

  }

  const categoryName =
    category.name;

  return {

    title:
      `${categoryName} in Shimla | Aarav Gift Gallery`,

    description:
      `Buy ${categoryName.toLowerCase()} in Shimla from Aarav Gift Gallery. Premium gifting products with easy ordering and fast support.`,

    keywords: [
      `${categoryName} shimla`,
      `${categoryName} gift shop`,
      "gift shop shimla",
      "birthday gifts shimla",
      "custom gifts shimla"
    ],

    alternates: {
      canonical:
        `https://www.aaravgiftgallery.com/category/${categoryId}`
    }

  };

}

export default function Page() {

  return <CategoryPageClient />;

}