import excuteQuery from "@/app/db/db";

export async function POST(req: any) {
  try {
    const body = await req.json();

    if (!body) {
      return new Response("Invalid request body", { status: 400 });
    }

    const updateResult: any = await excuteQuery(
      "UPDATE logo SET image = ? WHERE ID = ?",
      [body["image"], body["ID"]]
    );

    if (updateResult.affectedRows > 0) {
      return new Response("Update success!!", { status: 200 });
    } else {
      return new Response("Error updating", { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
