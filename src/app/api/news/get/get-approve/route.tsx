import excuteQuery from "@/app/db/db";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const cache = searchParams.get("cache");

  try {
    const result: any = await excuteQuery(
      "SELECT * FROM bantin WHERE TrangThai = 'Đã phê duyệt' ORDER BY createDate DESC",
      []
    );
    const formattedResult = result.map((item: any) => ({
      ID: item.ID,
      TenDanhMuc: item.TenDanhMuc,
      createBy: item.createBy,
      TieuDeChinh: item.TieuDeChinh,
      TieuDePhu: item.TieuDePhu,
      NoiDung: item.NoiDung,
      TrangThai: item.TrangThai,
      LuotXem: item.LuotXem,
      TacGia: item.TacGia,
      createDate: new Date(item.createDate).toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      }),
    }));

    return new Response(JSON.stringify(formattedResult), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
