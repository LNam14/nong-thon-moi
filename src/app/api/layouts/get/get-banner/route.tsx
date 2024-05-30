import excuteQuery from "@/app/db/db";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const cache = searchParams.get("cache");

  try {
    const logoResult: any = await excuteQuery("SELECT * FROM banner", []);
    return new Response(JSON.stringify(logoResult), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
