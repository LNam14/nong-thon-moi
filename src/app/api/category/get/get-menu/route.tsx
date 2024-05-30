import excuteQuery from "@/app/db/db";
import moment from "moment";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const cache = searchParams.get("cache");

  try {
    const categoryList: any = await excuteQuery(
      "SELECT ID, TenDanhMuc FROM danhmuc",
      []
    );
    const result: any = [];
    for (let i = 0; i < categoryList.length; i++) {
      const category: any = categoryList[i];
      category.sub = [];

      let newsList: any = await excuteQuery(
        "SELECT ID, TenDanhMuc FROM danhmucphu WHERE ID_DanhMuc = ?",
        [category.ID]
      );

      category.sub = newsList
      console.log("Ss", categoryList);

      result.push(category);

    }

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
