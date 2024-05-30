import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Typography, FormLabel, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import { getCategory, updateCategory } from "@/app/redux-store/category/slice";
import { createCategorySub, deleteCategorySub, getCategorySub, getCategorySubList } from "@/app/redux-store/category-sub/slice";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { getCookie } from "cookies-next";

interface LooseObject {
  [key: string]: any;
}
interface CategoryItem {
  ID: number;
  TenDanhMuc: string;
  CreateBy: string;
  CreateDate: string;
}
const UpdateCategory = ({
  open,
  closeForm,
  category,
}: {
  open: boolean;
  closeForm: any;
  category: any;
}) => {
  const dispatch = useAppDispatch();
  const categoryList: CategoryItem[] = useAppSelector(getCategorySubList);
  const [categoryListState, setCategoryListState] = useState<CategoryItem[]>(
    []
  );
  const [data, setData] = useState<LooseObject>({
    TenDanhMuc: "",
    ID: 0,
  });

  useEffect(() => {
    if (category) {
      setData({
        TenDanhMuc: category.TenDanhMuc,
        ID: category.ID,
      });
      setDataSub({
        ID_DanhMuc: category.ID
      })
    }
  }, [category]);

  useEffect(() => {
    if (data) {
      dispatch(getCategorySub({ data }));
    }
    console.log("ok", data);
  }, [data]);
  useEffect(() => {
    if (categoryList) {
      setCategoryListState(categoryList);
    }
  }, [categoryList]);

  const [isNews, setIsNews] = useState(false);

  const handleNews = () => {
    setIsNews(true)
  }

  const handleClose = () => {
    if (isNews) {
      const confirmed = window.confirm("Bạn có chắc muốn hủy thêm mới không ?");
      if (confirmed) {
        closeForm()
        setIsNews(false)
      }
    } else {
      closeForm()
    }
  };
  const username = getCookie("username");
  const [dataSub, setDataSub] = useState<LooseObject>({
    TenDanhMuc: "",
    ID_DanhMuc: 0,
    createBy: username,
  });
  const isCategoryExists = (categoryName: string) => {
    return categoryList.some(
      (category: any) =>
        category.TenDanhMuc.toLowerCase() === categoryName.toLowerCase()
    );
  };
  const handleSave = async () => {
    if (dataSub.TenDanhMuc) {
      const categoryName = dataSub.TenDanhMuc.trim();

      if (categoryName === "") {
        return;
      }

      if (isCategoryExists(categoryName)) {
        alert("Danh mục này đã tồn tại!");
      } else {
        await dispatch(createCategorySub({ dataSub }));
        setIsNews(false);
        setDataSub({
          TenDanhMuc: ""
        })
        await dispatch(updateCategory(data));
        await dispatch(getCategory());
        // Đóng form
        closeForm()
      }
    }
    await dispatch(updateCategory(data));
    await dispatch(getCategory());
    closeForm()

  };

  const handleDelete = async (ID: any) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc muốn xóa danh mục này không!"
    );

    if (isConfirmed) {
      await dispatch(deleteCategorySub({ ID }));
      await dispatch(updateCategory(data));
      await dispatch(getCategory());
      closeForm()
    }
  };
  return (
    <Modal open={open} onClose={closeForm}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 5,
        }}
      >
        <Typography textAlign={"center"} fontSize={20} fontWeight={500} marginBottom={3} fontFamily={"tahoma"}>
          Chỉnh Sửa Danh Mục
        </Typography>
        <FormLabel style={{ fontWeight: "bold", fontFamily: "tahoma" }}>
          Danh Mục Chính
          <TextField
            fullWidth
            label="Tên Danh Mục"
            name="TenDanhMuc"
            value={data.TenDanhMuc.toUpperCase()}
            sx={{ fontFamily: "tahoma" }}
            onChange={(e) =>
              setData({
                ...data,
                TenDanhMuc: e.target.value.toUpperCase(),
              })
            }
            margin="normal"
            size="small"
          />
        </FormLabel>
        <FormLabel style={{ fontWeight: "bold", fontFamily: "tahoma" }}>
          Danh Mục Phụ
          {Array.isArray(categoryListState) && categoryListState.map((item: CategoryItem, index: number) => (
            <Box display={"flex"} key={index}>
              <TextField
                fullWidth
                label="Tên Danh Mục"
                name="TenDanhMuc"
                value={item.TenDanhMuc}
                sx={{ fontFamily: "tahoma" }}
                onChange={(e) =>
                  setDataSub({
                    ...dataSub,
                    TenDanhMuc: e.target.value,
                  })
                }
                margin="normal"
                size="small"
              />
              <IconButton onClick={() => {
                handleDelete(item.ID)
              }}>
                <IconTrash />
              </IconButton>
            </Box>
          ))}

          {isNews ? (
            <TextField
              fullWidth
              label="Danh mục mới"
              name="TenDanhMuc"
              sx={{ fontFamily: "tahoma" }}
              margin="normal"
              size="small"
              value={dataSub.TenDanhMuc ? dataSub.TenDanhMuc : ''}
              onChange={(e) =>
                setDataSub({
                  ...dataSub,
                  TenDanhMuc: e.target.value,
                })
              }
            />
          ) : (
            <></>
          )}

          <Button sx={{
            width: "100%"
          }}
            color={"inherit"}
            variant={"contained"}
            onClick={() => {
              handleNews()
            }}
          >
            <IconPlus />
          </Button>
        </FormLabel>
        <Box display={"flex"} justifyContent={"space-between"} marginTop={2}>
          <Button variant="contained" color="success" onClick={handleSave}>
            Xác nhận
          </Button>
          <Button variant="contained" color="success" onClick={handleClose}>
            Đóng
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateCategory;
