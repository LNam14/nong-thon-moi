import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TableFooter,
  Button,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { IconCheck } from "@tabler/icons-react";
import { fireStoreConfig } from "@/app/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAppDispatch } from "@/app/redux-store/hook";
import { createBanner, deleteBanner } from "@/app/redux-store/banner/slice";

const CreateBanner = ({
  open,
  closeForm,
  banner,
}: {
  open: boolean;
  closeForm: any;
  banner: any;
}) => {
  interface LooseObject {
    [key: string]: any;
  }
  const dispatch = useAppDispatch();
  const [data, setData] = useState<LooseObject>({
    ID: 0,
    image: "",
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [image, setImage] = useState<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        setSelectedImage(dataURL);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const authApp = fireStoreConfig();
  const storage = authApp;

  const handleImageUpload = async () => {
    try {
      if (image) {
        const storageRef = ref((await storage).storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        console.log("đã up", imageUrl);

        await dispatch(createBanner({ image: imageUrl }));
        alert("Thêm thành công");
        return imageUrl;
      }
      return null;
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
      return null;
    }
  };
  const handleDelete = async (ID: number) => {
    await dispatch(deleteBanner({ ID: ID }));
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
        <TableContainer
          sx={{
            width: {
              xs: "274px",
              sm: "100%",
            },
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    ID
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="textSecondary" variant="h6">
                    Hình ảnh
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="textSecondary" variant="h6">
                    Hành động
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {banner && Array.isArray(banner)
                ? banner.map((bannerItem: any) => (
                    <TableRow key={bannerItem.ID}>
                      <TableCell>
                        <Typography fontSize="15px" fontWeight={500}>
                          {bannerItem.ID}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <img src={bannerItem.image} alt="" height={70} />
                      </TableCell>
                      <TableCell align="right">
                        <Box
                          sx={{ display: "flex", gap: "5px" }}
                          justifyContent={"right"}
                        >
                          <Button
                            sx={{
                              backgroundColor: "#cccccc",
                              color: "black",
                              "&:hover": {
                                backgroundColor: "#b5b5b5",
                              },
                            }}
                            onClick={() => {
                              handleDelete(bannerItem.ID);
                            }}
                          >
                            <Delete />
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
            <TableFooter>
              {selectedImage && (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <Box textAlign="center">
                      <img
                        src={selectedImage}
                        alt="Selected"
                        style={{ maxWidth: "50%" }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", gap: "5px" }}
                      justifyContent={"right"}
                    >
                      <Button
                        sx={{
                          backgroundColor: "#cccccc",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "#b5b5b5",
                          },
                        }}
                        onClick={() => {
                          handleImageUpload();
                        }}
                      >
                        <IconCheck />
                      </Button>
                      <Button
                        sx={{
                          backgroundColor: "#cccccc",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "#b5b5b5",
                          },
                        }}
                      >
                        <Delete />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                    id="file-input"
                  />
                  <label htmlFor="file-input">
                    <Button
                      color="inherit"
                      sx={{ width: "100%", alignItems: "center" }}
                      variant="contained"
                      component="span"
                    >
                      <Add />
                    </Button>
                  </label>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default CreateBanner;
