import moment from 'moment';
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

    // Check if the given "TenDanhMuc" already exists
    const checkResult: any = await excuteQuery(
      "SELECT * FROM danhmuc WHERE TenDanhMuc = ? AND ID != ?",
      [body["TenDanhMuc"], body["ID"]]
    );

    if (checkResult.length > 0) {
      return new Response("Tên danh mục đã tồn tại", { status: 400 });
    }

    // Perform the update only if the name doesn't exist
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const updateResult: any = await excuteQuery(
      "UPDATE danhmuc SET TenDanhMuc = ?, LastUpDate = ? WHERE ID = ?",
      [body["TenDanhMuc"], currentDate, body["ID"]]
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
