"use client"
import { fireStoreConfig } from "@/app/firebase/firebase";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";
import QuillEditor from "../../components/form/QuillEditor";
import BaseCard from "../../components/shared/BaseCard";
interface LooseObject {
  [key: string]: any;
}

const Introduce = () => {
  const [data, setData] = useState<LooseObject>({
    TenDanhMuc: "",
    CreateBy: "",
    TacGia: "",
    TieuDeChinh: "",
    TieuDePhu: "",
    NoiDung: "",
    HinhAnh: "",
  });
  const authApp = fireStoreConfig();
  const storage: any = authApp;

  const handleSelectFile = (files: FileList | null) => {
    if (files && files[0] && files[0].size < 1000000) {
      setImage(files[0]);
      const selectedFile = files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
    } else {
      console.error("Error: File not found or file size is too large.");
    }
  };

  const [image, setImage] = useState<File>();
  const handleImageUpload = async () => {
    try {
      if (image) {
        const storageRef = ref((await storage).storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);

        const imageUrl = await getDownloadURL(storageRef);
        console.log("Image uploaded. Download URL:", imageUrl);
        setData({
          ...data,
          HinhAnh: imageUrl,
        });
        alert;
        return imageUrl;
      }

      return null;
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
      return null;
    }
  };

  const handleContentChange = (content: string) => {
    setData({
      ...data,
      NoiDung: content,
    });
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="GIỚI THIỆU">
          <Box>
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
              Hình ảnh
              <input
                type="file"
                onChange={(e) => handleSelectFile(e.target.files)}
              />
            </FormLabel>
            <FormLabel>
              Nội dung
              <QuillEditor onContentChange={handleContentChange} />
            </FormLabel>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              marginTop={2}
            >
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  handleImageUpload();
                }}
              >
                Thêm ảnh
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  handleImageUpload();
                  //handleSave();
                }}
              >
                Thêm mới
              </Button>
            </Box>
          </Box>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default Introduce;
