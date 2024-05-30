import excuteQuery from "@/app/db/db";

export async function POST(req: any) {
  try {
    let body = null;

    const requestBody = await req.json().then((requestBody: any) => {
      body = requestBody;
    });
    if (body) {
      const result: any = await excuteQuery(
        "SELECT * FROM danhmuc WHERE TenDanhMuc = ?",
        [body["TenDanhMuc"]]
      );
      console.log("body", body["TenDanhMuc"]);

      const formattedResult = result.map((item: any) => ({
        ID: item.ID,
        TenDanhMuc: item.TenDanhMuc,
        CreateDate: new Date(item.CreateDate).toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        }),
      }));

      return new Response(JSON.stringify(formattedResult), { status: 200 });
    } else {
      return new Response("Missing body data", { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
