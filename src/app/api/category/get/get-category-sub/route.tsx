import excuteQuery from "@/app/db/db";

export async function POST(req: any) {
  const { searchParams } = new URL(req.url);
  const cache = searchParams.get("cache");

  try { 
    const body = await req.json();

    if (!body) {
      return new Response("Invalid request body", { status: 400 });
    }
    const result: any = await excuteQuery("SELECT * FROM danhmucphu WHERE ID_DanhMuc = ?", 
      [body["ID"]]);

    // Format the CreateDate property in each result item
    const formattedResult = result.map((item: any) => ({
      ID: item.ID,
      TenDanhMuc: item.TenDanhMuc,
      CreateBy: item.CreateBy,
      CreateDate: new Date(item.CreateDate).toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      }),
    }));

    return new Response(JSON.stringify(formattedResult), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
