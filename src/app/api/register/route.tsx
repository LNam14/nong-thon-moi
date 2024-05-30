import excuteQuery from "../../db/db";
import API_KEY from "../statistical/api_key";
import jwt from "jsonwebtoken";

export async function POST(req: any) {
  const requestHeaders = new Headers(req.headers);
  const apiKey = requestHeaders.get("x-api-key");

  if (apiKey !== API_KEY) {
    return new Response("Not found", { status: 404 });
  }

  const { searchParams } = new URL(req.url);

  try {
    let body = null;
    const requestBody = await req.json().then((requestBody: any) => {
      body = requestBody;
    });

    if (body) {
      // Kiểm tra xem tài khoản đã tồn tại hay chưa
      const existingUser: unknown = await excuteQuery(
        "SELECT ID FROM users WHERE UserName = ? OR Email = ?",
        [body["UserName"], body["Email"]]
      );

      if (existingUser && (existingUser as any).length > 0) {
        return new Response("Tài khoản đã tồn tại", {
          status: 401,
        });
      }

      // Tạo thông tin người dùng trong bảng users
      const result: any = await excuteQuery(
        "INSERT INTO users (UserName, Email, PasswordHash, FirstName, LastName, DateOfBirth) VALUES (?, ?, ?, ?, ?, ?);",
        [
          body["UserName"],
          body["Email"],
          body["PasswordHash"],
          body["FirstName"],
          body["LastName"],
          body["DateOfBirth"],
        ]
      );

      // Tạo JWT và trả về trong response
      const userId = result.insertId;
      const token = jwt.sign(
        { userId },
        "ADWADSDSAXSFAWASDAWDAFWHFSDFDFHFHHAA",
        {
          expiresIn: "1h", // Thời gian hết hạn của token
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
