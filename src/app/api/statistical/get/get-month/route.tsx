import excuteQuery from "@/app/db/db";
import moment from 'moment';
export async function GET(req: any) {
    const { searchParams } = new URL(req.url);
    const cache = searchParams.get("cache");

    try {

        const months = [];
        for (let i = 0; i < 7; i++) {
            const monthStart = moment().subtract(i, 'months').startOf('month').format('YYYY-MM-DD HH:mm:ss');
            const monthEnd = moment(monthStart).endOf('month').format('YYYY-MM-DD HH:mm:ss');
            months.push({ start: monthStart, end: monthEnd });
        }
        const monthCountsPromises = months.map(async (month) => {
            try {
                const result: any = await excuteQuery("SELECT COUNT(*) AS count FROM bantin WHERE CreateDate >= ? AND CreateDate <= ?", [month.start, month.end]);
                return result[0].count;
            } catch (error) {
                console.error("Error counting posts for day", month, error);
                return 0;
            }
        });
        const monthCounts = await Promise.all(monthCountsPromises);


        return new Response(JSON.stringify({
            month: monthCounts,
        }), { status: 200 });

    } catch (error) {
        console.log(error);
        // Nếu có lỗi xảy ra, trả về mã lỗi 500
        return new Response("Error", { status: 500 });
    }
}
