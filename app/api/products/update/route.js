import { updateProduct } from "@/actions/productActions";

export async function POST(req){

const body = await req.json();

const { id, ...data } = body;

await updateProduct(id, data);

return Response.json({ success:true });

}