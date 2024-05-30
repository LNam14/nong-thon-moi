import excuteQuery from "@/app/db/db";
import moment from "moment";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const cache = searchParams.get("cache");

  try {
    const categoryList: any = await excuteQuery(
      "SELECT TenDanhMuc FROM danhmuc",
      []
    );
    const result: any = [];
    for (let i = 0; i < categoryList.length; i++) {
      const category: any = categoryList[i];

      if (
        category.TenDanhMuc === "TIN ẢNH"
      ) {
        category.news = [];
        let newsList: any = await excuteQuery(
          "SELECT * FROM bantin WHERE IsDanhMuc = ? AND TrangThai = 'Đã xuất bản'",
          [category.TenDanhMuc]
        );

        category.news = newsList.sort((a: any, b: any) =>
          moment(b.createDate).diff(moment(a.createDate))
        );

        result.push(category);
      }
    }

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
