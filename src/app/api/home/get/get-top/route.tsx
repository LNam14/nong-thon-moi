import excuteQuery from "@/app/db/db";
import moment from "moment";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const cache = searchParams.get("cache");

  try {
    let result: any = await excuteQuery(
      "SELECT * FROM bantin WHERE TrangThai = 'Đã xuất bản' ORDER BY createDate DESC LIMIT 5",
      []
    );

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
