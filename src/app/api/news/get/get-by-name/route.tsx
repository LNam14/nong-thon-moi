import excuteQuery from "@/app/db/db";
import moment from "moment";

export async function POST(req: any) {
  try {
    let body = null;

    const requestBody = await req.json().then((requestBody: any) => {
      body = requestBody;
    });

    if (body && body["IsDanhMuc"] && body["TenDanhMuc"]) {
      let query = "";
      let queryParams = [];

      if (body["IsDanhMuc"] === body["TenDanhMuc"]) {
        query = "SELECT * FROM bantin WHERE IsDanhMuc = ? ORDER BY createDate DESC";
        queryParams = [body["IsDanhMuc"]];
      } else {
        query = "SELECT * FROM bantin WHERE TenDanhMuc = ? ORDER BY createDate DESC";
        queryParams = [body["TenDanhMuc"]];
      }

      console.log([body["TenDanhMuc"]], [body["IsDanhMuc"]]); // Log cái này để kiểm tra dữ liệu thực tế bạn nhận được

      const result: any = await excuteQuery(query, queryParams);

      const formattedResult = result.map((item: any) => ({
        ID: item.ID,
        TenDanhMuc: item.TenDanhMuc,
        IsDanhMuc: item.IsDanhMuc,
        createBy: item.createBy,
        TieuDeChinh: item.TieuDeChinh,
        TieuDePhu: item.TieuDePhu,
        NoiDung: item.NoiDung,
        TrangThai: item.TrangThai,
        LuotXem: item.LuotXem,
        TacGia: item.TacGia,
        HinhAnh: item.HinhAnh,
        createDate: moment(item.createDate).format("DD-MM-YYYY"),
      }));

      return new Response(JSON.stringify(formattedResult), { status: 200 });
    } else {
      return new Response("IsDanhMuc and TenDanhMuc are required", { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
