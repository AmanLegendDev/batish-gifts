import { deleteCategory } from "@/actions/categoryActions";

export async function POST(req){

const { id } = await req.json();

await deleteCategory(id);

return Response.json({ success:true });

}