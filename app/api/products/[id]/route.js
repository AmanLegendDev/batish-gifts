import { getSingleProduct } from "@/actions/productActions";

export async function GET(
  request,
  context
) {

const { id } = await context.params;

const product = await getSingleProduct(id);

if (!product) {

return Response.json(
{ error: "Product not found" },
{ status: 404 }
);

}

return Response.json(product);

}