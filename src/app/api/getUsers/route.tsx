import excuteQuery from "../../db/db";
import API_KEY from "../statistical/api_key";

export async function GET(req: any) {
  const requestHeaders = new Headers(req.headers);
  // const apiKey = requestHeaders.get("x-api-key");

  // if (apiKey !== API_KEY) {
  //   return new Response("Not found", { status: 404 });
  // }
  const { searchParams } = new URL(req.url);
  const cache = searchParams.get("cache");

  try {
    const result = await excuteQuery("SELECT * FROM users", []);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
