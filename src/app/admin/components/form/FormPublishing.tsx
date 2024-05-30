import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useAppDispatch } from "@/app/redux-store/hook";
import { getCategory, updateCategory } from "@/app/redux-store/category/slice";
import QuillEditor from "./QuillEditor";
import {
  getNewsApprove,
  getNewsPublishing,
  getNewsRefuse,
  getNewsWait,
  updateNews,
} from "@/app/redux-store/news/slice";
import "./wfa.css"
interface LooseObject {
  [key: string]: any;
}

const FormWFA = ({
  open,
  closeForm,
  news,
}: {
  open: boolean;
  closeForm: any;
  news: any;
}) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<LooseObject>({
    TenDanhMuc: "",
    ID: 0,
    TieuDeChinh: "",
    TieuDePhu: "",
    NoiDung: "",
    createDate: "",
    createBy: "",
    LuotXem: 0,
  });
  useEffect(() => {
    if (news) {
      setData({
        TenDanhMuc: news.TenDanhMuc || "",
        ID: news.ID || 0,
        TieuDeChinh: news.TieuDeChinh || "",
        TieuDePhu: news.TieuDePhu || "",
        NoiDung: news.NoiDung || "",
        createDate: news.createDate || "",
        createBy: news.createBy || "",
        LuotXem: news.LuotXem || 0,
      });
    }
  }, [news]);

  console.log(news, "news");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAction = async (status: string) => {
    const updatedData = { ...data, TrangThai: status };
    await dispatch(updateNews(updatedData));
    status === "Đã phê duyệt"
      ? await dispatch(getNewsPublishing())
      : await dispatch(getNewsPublishing());
    closeForm();
  };

  return (
    <Modal open={open} onClose={closeForm}>
      <Box className="box-container">
        <Typography className="title">
          {data.TenDanhMuc.toUpperCase()}
        </Typography>
        <Typography className="main-heading">
          {data.TieuDeChinh}
        </Typography>
        <Box display={"flex"} padding={1}>
          <Typography className="date-info">
            {data.createDate} | {data.createBy}
          </Typography>
        </Box>
        <Typography className="additional-title">
          {data.TieuDePhu}
        </Typography>
        <Typography
          className="content ql-align-center"
          dangerouslySetInnerHTML={{ __html: data.NoiDung }}
        />
        <Typography className="footer">
          {data.createBy}
        </Typography>
        <Typography className="viewers">
          Lượt người xem: {data.LuotXem}
        </Typography>
        <Box className="button-container">
          <Box>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleAction("Đã gỡ")}
              className="button"
            >
              Gỡ bài
            </Button>
          </Box>
          <Button
            variant="contained"
            color="success"
            onClick={closeForm}
            className="button"
          >
            Đóng
          </Button>
        </Box>
      </Box>

    </Modal>
  );
};

export default FormWFA;
