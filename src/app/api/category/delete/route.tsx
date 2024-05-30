import excuteQuery from "@/app/db/db";
import API_KEY from "../../statistical/api_key";

export async function POST(req: any) {
  // const requestHeaders = new Headers(req.headers);
  // const apiKey = requestHeaders.get("x-api-key");

  // if (apiKey !== API_KEY) {
  //   return new Response("Not found", { status: 404 });
  // }

  try {
    const body = await req.json();

    if (!body) {
      return new Response("Invalid request body", { status: 400 });
    }

    const deleteResult: any = await excuteQuery(
      "DELETE FROM danhmuc WHERE ID = ?",
      [body["ID"]]
    );

    if (deleteResult.affectedRows > 0) {
      return new Response("Record deleted successfully", { status: 200 });
    } else {
      return new Response("Error deleting record", { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
