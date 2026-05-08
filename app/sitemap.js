import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

const BASE_URL =
  "https://www.aaravgiftgallery.com";

export default async function sitemap() {

  await connectDB();

  /*
    PRODUCTS
  */

  const products = await Product.find({
    isVisible: true
  })
    .select("slug updatedAt")
    .lean();

  /*
    CATEGORIES
  */

  const categories = await Category.find({})
    .select("_id updatedAt")
    .lean();

  /*
    STATIC PAGES
  */

  const staticPages = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },

    {
      url: `${BASE_URL}/category/all`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9
    },

    {
      url: `${BASE_URL}/custom-order`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    }
  ];

  /*
    PRODUCT URLS
  */

  const productPages = products.map(
    (product) => ({
      url:
        `${BASE_URL}/products/${product.slug}`,

      lastModified:
        product.updatedAt || new Date(),

      changeFrequency: "weekly",

      priority: 0.8
    })
  );

  /*
    CATEGORY URLS
  */

  const categoryPages = categories.map(
    (category) => ({
      url:
        `${BASE_URL}/category/${category._id}`,

      lastModified:
        category.updatedAt || new Date(),

      changeFrequency: "weekly",

      priority: 0.7
    })
  );

  return [
    ...staticPages,
    ...productPages,
    ...categoryPages
  ];
}