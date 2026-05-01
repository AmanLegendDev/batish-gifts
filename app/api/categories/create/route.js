import { createCategory } from "@/actions/categoryActions";

export async function POST(req) {

  try {

    const body = await req.json();

    console.log("CATEGORY DATA:", body);

    const result = await createCategory(
      body.name,
      body.image
    );

    return Response.json(result);

  } catch (err) {

    console.log(err);

    return Response.json({
      error: "Server error"
    });

  }

}