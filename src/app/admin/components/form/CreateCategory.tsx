import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { getCookie } from "cookies-next";
import { useAppDispatch } from "@/app/redux-store/hook";
import { createCategory, getCategory } from "@/app/redux-store/category/slice";

interface LooseObject {
  [key: string]: any;
}

const CreateCategory = ({
  open,
  closeForm,
  categoryList,
}: {
  open: boolean;
  closeForm: any;
  categoryList: any;
}) => {
  const dispatch = useAppDispatch();

  const username = getCookie("username");
  const [data, setData] = useState<LooseObject>({
    TenDanhMuc: "",
    CreateBy: username,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value.toUpperCase() }));
  };

  const isCategoryExists = (categoryName: string) => {
    return categoryList.some(
      (category: any) =>
        category.TenDanhMuc.toLowerCase() === categoryName.toLowerCase()
    );
  };

  const handleSave = async () => {
    const categoryName = data.TenDanhMuc.trim();

    if (categoryName === "") {
      return;
    }

    if (isCategoryExists(categoryName)) {
      alert("Danh mục này đã tồn tại!");
    } else {
      alert("Thêm thành công!");
      await dispatch(createCategory({ data }));
      await dispatch(getCategory());
      closeForm();
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
        <Typography textAlign={"center"} fontSize={20} fontWeight={500}>
          Thêm Mới Danh Mục
        </Typography>
        <TextField
          fullWidth
          label="Tên Danh Mục"
          name="TenDanhMuc"
          value={data.TenDanhMuc.toUpperCase()}
          onChange={handleInputChange}
          margin="normal"
          size="small"
        />
        <Box display={"flex"} justifyContent={"space-between"} marginTop={2}>
          <Button variant="contained" color="success" onClick={handleSave}>
            Thêm mới
          </Button>
          <Button variant="contained" color="success" onClick={closeForm}>
            Đóng
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateCategory;
