"use client";

import { useEffect, useState } from "react";
import { Grid, Tab, Tabs, Box, Button, TableContainer, Table, TableHead, TableRow, TableCell, Typography, TableBody, Pagination } from "@mui/material";
import BaseCard from "@/app/admin/components/shared/BaseCard";
import { IconEye, IconPlus } from "@tabler/icons-react";
import CreateNews from "@/app/admin/components/form/CreateNews";
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import { getNewsList, getNewsPublishing, getNewsWait } from "@/app/redux-store/news/slice";
import FormPublishing from "@/app/admin/components/form/FormPublishing";
import FormWFA from "@/app/admin/components/form/FormWFA";
interface newsItem {
    ID: number;
    TenDanhMuc: string;
    createBy: string;
    createDate: string;
    TieuDeChinh: string;
    TieuDePhu: string;
    TrangThai: string;
    NoiDung: string;
    LuotXem: number;
}
interface LooseObject {
    [key: string]: any;
}
const PendingApproval = () => {
    const dispatch = useAppDispatch();
    const newsList: newsItem[] = useAppSelector(getNewsList);
    const [newsListState, setNewsListState] = useState<newsItem[]>([]);
    const [selectedNews, setSelectedNews] = useState<newsItem | null>(null);
    const [data, setData] = useState<LooseObject>({
        TenDanhMuc: "",
        ID: 0,
    });
    useEffect(() => {
        const asyncCall = async () => {
            await dispatch(getNewsWait());
        };
        asyncCall();
    }, []);
    useEffect(() => {
        if (newsList) {
            setNewsListState(newsList);
        }
    }, [newsList]);

    const [isOpen, setIsOpen] = useState(false);

    const openForm = (news: newsItem) => {
        setSelectedNews(news);
        setIsOpen(true);
    };
    const closeForm = () => {
        setIsOpen(false);
    };
    const truncateText = (text: any, maxLength: any) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const newsListArray = Array.isArray(newsListState) ? newsListState : [];
    const totalPageCount = Math.ceil(newsListArray.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNewsList = newsListArray.slice(startIndex, endIndex);

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        setCurrentPage(page);
    };
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
                <BaseCard title="Chờ phê duyệt">
                    <TableContainer
                        sx={{
                            width: {
                                xs: "500px",
                                sm: "100%",
                                backgroundColor: "white",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                borderRadius: 5,
                                paddingBottom: 30,
                            },
                            maxHeight: "500px",
                            overflowY: "auto",
                        }}
                    >
                        <Table
                            aria-label="simple table"
                            sx={{
                                whiteSpace: "nowrap",
                                mt: 3,
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography
                                            color="textSecondary"
                                            variant="h6"
                                            fontWeight={"bold"}
                                        >
                                            ID
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography
                                            color="textSecondary"
                                            variant="h6"
                                            fontWeight={"bold"}
                                        >
                                            Tiêu đề chính
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            color="textSecondary"
                                            variant="h6"
                                            fontWeight={"bold"}
                                        >
                                            Tiêu đề phụ
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            color="textSecondary"
                                            variant="h6"
                                            fontWeight={"bold"}
                                        >
                                            Tác giả
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography
                                            color="textSecondary"
                                            variant="h6"
                                            fontWeight={"bold"}
                                        >
                                            Ngày tạo
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            color="textSecondary"
                                            variant="h6"
                                            fontWeight={"bold"}
                                        >
                                            Lượt xem
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            color="textSecondary"
                                            variant="h6"
                                            fontWeight={"bold"}
                                        >
                                            Trạng thái
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            color="textSecondary"
                                            variant="h6"
                                            fontWeight={"bold"}
                                        >
                                            Hành động
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {Array.isArray(currentNewsList) && currentNewsList.length > 0 ? (
                                <TableBody>
                                    {currentNewsList.map((news: newsItem, i: number) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {news.ID}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {truncateText(news.TieuDeChinh, 13)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {truncateText(news.TieuDePhu, 13)}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {news.createBy}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {news.createDate}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {news.LuotXem}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {news.TrangThai}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        size="small"
                                                        aria-label="edit"
                                                        title="Xem"
                                                        onClick={() => {
                                                            openForm(news);
                                                        }}
                                                    >
                                                        Xem <IconEye style={{ marginLeft: 5 }} />
                                                    </Button>
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : null}
                        </Table>
                        <Box display="flex" justifyContent="center" mt={3}>
                            <Pagination
                                count={totalPageCount}
                                shape="rounded"
                                variant="outlined"
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </Box>
                        <FormWFA open={isOpen} closeForm={closeForm} news={selectedNews} />
                    </TableContainer>
                </BaseCard>
            </Grid>
        </Grid>
    );
};

export default PendingApproval;
