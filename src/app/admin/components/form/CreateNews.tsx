import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Select,
  FormLabel,
  MenuItem,
} from "@mui/material";
import { getCookie } from "cookies-next";
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import QuillEditor from "./QuillEditor";
import { createNews, getNewsWait } from "@/app/redux-store/news/slice";
import { getCategory, getCategoryList } from "@/app/redux-store/category/slice";
import { fireStoreConfig } from "@/app/firebase/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { getMenu, getMenuList } from "@/app/redux-store/menu/slice";

interface LooseObject {
  [key: string]: any;
}

interface CategoryItem {
  ID: number;
  TenDanhMuc: string;
  sub?: {
    ID: number;
    TenDanhMuc: string;
  };
}

const CreateNews = ({ open, closeForm }: { open: boolean; closeForm: any }) => {
  const dispatch = useAppDispatch();
  const categoryList: CategoryItem[] = useAppSelector(getMenuList);
  const [categoryListState, setCategoryListState] = useState<CategoryItem[]>(
    []
  );

  useEffect(() => {
    const asyncCall = async () => {
      await dispatch(getMenu());
    };
    asyncCall();
  }, []);

  useEffect(() => {
    if (categoryList) {
      setCategoryListState(categoryList);
    }
  }, [categoryList]);

  const username = getCookie("username");
  const [data, setData] = useState<LooseObject>({
    TenDanhMuc: "",
    IsDanhMuc: "",
    CreateBy: username,
    TacGia: "",
    TieuDeChinh: "",
    TieuDePhu: "",
    NoiDung: "",
    HinhAnh: "",
  });

  const [image, setImage] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);

  const authApp = fireStoreConfig();
  const storage: any = authApp;
  const [imageUrl, setImageUrl] = useState<string>("");
  const handleSelectFile = (files: FileList | null) => {
    if (files && files[0] && files[0].size < 1000000) {
      const selectedFile = files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      setImageUrl(imageUrl);
      setImage(files[0]);
    } else {
      console.error("Error: File not found or file size is too large.");
    }
  };
  const [isImageConfirmed, setIsImageConfirmed] = useState(false);
  const handleImageUpload = async () => {
    try {
      if (image) {
        const storageRef = ref((await storage).storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);

        setIsUploading(true);
        const imageUrl = await getDownloadURL(storageRef);
        console.log("Image uploaded. Download URL:", imageUrl);
        setData({
          ...data,
          HinhAnh: imageUrl,
        });
        setIsUploading(false);
        setIsImageConfirmed(true);
        alert("Xác nhận ảnh thành công !!")
        return imageUrl;
      }

      return null;
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
      return null;
    }
  };

  const handleSave = async () => {
    if (!isImageConfirmed) {
      alert("Vui lòng xác nhận ảnh");
      return;
    }
    setIsImageConfirmed(false)
    await dispatch(createNews({ data }));
    await dispatch(getNewsWait());
    closeForm();
    alert("Thêm thành công!");
  };


  const handleContentChange = (content: string) => {
    setData({
      ...data,
      NoiDung: content,
    });
  };
  const handleCategoryChange = (e: any) => {
    const selectedValue = e.target.value;
    let selectedCategory: any = null;
    categoryListState.forEach(category => {
      if (category.sub && Array.isArray(category.sub) && category.sub.find(sub => sub.TenDanhMuc === selectedValue)) {
        selectedCategory = category;
      }
    });

    setData({
      ...data,
      TenDanhMuc: selectedValue,
      IsDanhMuc: selectedCategory ? selectedCategory.TenDanhMuc : selectedValue
    });
  };
  return (
    <Modal open={open} onClose={closeForm}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 5,
          overflowY: "auto",
          maxHeight: 700,
        }}
      >
        <Typography textAlign={"center"} fontSize={20} fontWeight={500}>
          Thêm Mới Bản Tin
        </Typography>
        <FormLabel>
          Tiêu đề chính
          <TextField
            fullWidth
            name="TieuDeChinh"
            value={data.TieuDeChinh}
            onChange={(e) =>
              setData({
                ...data,
                TieuDeChinh: e.target.value,
              })
            }
            sx={{ marginBottom: 2 }}
            size="small"
          />
        </FormLabel>
        <FormLabel>
          Tiêu đề phụ
          <TextField
            sx={{ marginBottom: 2 }}
            fullWidth
            name="TieuDePhu"
            value={data.TieuDePhu}
            onChange={(e) =>
              setData({
                ...data,
                TieuDePhu: e.target.value,
              })
            }
            size="small"
          />
        </FormLabel>
        <FormLabel>
          Danh mục
          <select
            name="TenDanhMuc"
            style={{ marginBottom: 2, width: "100%", height: 40 }}
            value={data.TenDanhMuc}
            onChange={handleCategoryChange}>
            {categoryListState.map((category) => (
              <optgroup key={category.ID} label={category.TenDanhMuc}>
                <option
                  key={category.ID}
                  value={category.TenDanhMuc}
                >
                  {category.TenDanhMuc}
                </option>
                {category.sub && Array.isArray(category.sub) && category.sub.map((subCategory) => (
                  <option
                    key={subCategory.ID}
                    value={subCategory.TenDanhMuc}
                  >
                    {subCategory.TenDanhMuc}
                  </option>

                ))}
              </optgroup>
            ))}

          </select>

        </FormLabel>
        <FormLabel>
          Hình ảnh
          <input
            type="file"
            style={{ width: '100%', marginBottom: 10 }}
            onChange={(e) => handleSelectFile(e.target.files)}
          />
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="Selected" style={{ marginBottom: "10px", maxWidth: '100%', maxHeight: '200px', marginTop: '10px', display: "flex", flexDirection: "column" }} />
              {!isImageConfirmed && <Button sx={{ marginBottom: "10px" }} variant="contained" color="success" onClick={() => handleImageUpload()}>Xác nhận ảnh</Button>}
            </div>
          )}
        </FormLabel>
        <FormLabel >
          Nội dung
          <QuillEditor onContentChange={handleContentChange} />
        </FormLabel>
        <Box display={"flex"} justifyContent={"space-between"} marginTop={2}>

          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleSave();
            }}
          >
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

export default CreateNews;
