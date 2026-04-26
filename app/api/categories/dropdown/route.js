import { getCategories } from "@/actions/categoryActions";

export async function GET() {

  const categories = await getCategories();

  return Response.json(categories);

}