import excuteQuery from "@/app/db/db";

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
      "INSERT INTO danhmucphu (TenDanhMuc, CreateBy, ID_DanhMuc) VALUES (?,?,?);",
      [body["TenDanhMuc"], body["CreateBy"], body["ID_DanhMuc"]]
    );

    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
