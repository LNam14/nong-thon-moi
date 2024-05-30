import excuteQuery from "../../db/db";
import API_KEY from "../statistical/api_key";
import jwt from "jsonwebtoken";

export async function POST(req: any) {
  const requestHeaders = new Headers(req.headers);
  // const apiKey = requestHeaders.get("x-api-key");

  // if (apiKey !== API_KEY) {
  //   return new Response("Not found", { status: 404 });
  // }

  const { searchParams } = new URL(req.url);

  try {
    let body = null;
    const requestBody = await req.json().then((requestBody: any) => {
      body = requestBody;
    });

    if (body) {
      // Kiểm tra xem tài khoản có tồn tại hay không
      const user: unknown = await excuteQuery(
        "SELECT ID, UserName, PasswordHash FROM users WHERE UserName = ?",
        [body["UserName"]]
      );

      if (!user || (user as any).length === 0) {
        return new Response("Tài khoản không tồn tại", {
          status: 401,
        });
      }

      // Kiểm tra mật khẩu
      const userObj: { [key: string]: any } = (user as any)[0];
      if (body["PasswordHash"] !== userObj["PasswordHash"]) {
        return new Response("Sai mật khẩu", {
          status: 401,
        });
      }

      // Đăng nhập thành công, tạo JWT và trả về trong response
      const userId = userObj["ID"];
      const token = jwt.sign(
        { userId },
        "ADWADSDSAXSFAWASDAWDAFWHFSDFDFHFHHAA",
        {
          expiresIn: "1h",
        }
      );

      return new Response(JSON.stringify({ token }), { status: 200 });
    } else {
      return new Response("Error", { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
