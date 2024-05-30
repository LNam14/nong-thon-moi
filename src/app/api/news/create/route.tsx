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

    const result = await excuteQuery(
      "INSERT INTO bantin (CreateBy, TacGia, TieuDeChinh, TieuDePhu, TenDanhMuc, IsDanhMuc, NoiDung, HinhAnh) VALUES (?,?,?,?,?,?,?,?);",
      [
        body["CreateBy"],
        body["TacGia"],
        body["TieuDeChinh"],
        body["TieuDePhu"],
        body["TenDanhMuc"],
        body["IsDanhMuc"],
        body["NoiDung"],
        body["HinhAnh"],
      ]
    );

    console.log("result", result);

    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
