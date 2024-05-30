"use client"
import CreateBanner from "@/app/admin/components/form/CreateBanner";
import { fireStoreConfig } from "@/app/firebase/firebase";
import { getAllBanner, getBannerList } from "@/app/redux-store/banner/slice";
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import {
  getAllLogo,
  getLogoList,
  updateLogo,
} from "@/app/redux-store/logo/slice";
import { CheckCircleOutline, Close, Edit } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

interface LogoItem {
  ID: number;
  image: string;
}

interface BannerItem {
  ID: number;
  image: string;
}
interface LooseObject {
  [key: string]: any;
}

const Header = () => {
  const dispatch = useAppDispatch();
  const logoList: LogoItem[] = useAppSelector(getLogoList);
  const [logoListState, setLogoListState] = useState<LogoItem[]>([]);

  const bannerList: BannerItem[] = useAppSelector(getBannerList);
  const [bannerListState, setBannerListState] = useState<BannerItem[]>([]);

  useEffect(() => {
    const asyncCall = async () => {
      await dispatch(getAllLogo());
      await dispatch(getAllBanner());
    };

    asyncCall();
  }, [dispatch]);

  useEffect(() => {
    if (logoList) {
      setLogoListState(logoList);
    }
  }, [logoList]);

  useEffect(() => {
    if (bannerList) {
      setBannerListState(bannerList);
    }
  }, [bannerList]);
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl: any = URL.createObjectURL(file);
      const updatedSelectedImages: any = [...selectedImage];
      updatedSelectedImages[index] = imageUrl;
      setSelectedImage(updatedSelectedImages);
      setImageChanged(true);
      setImage(file);
      // Lưu trữ ảnh gốc
      const updatedOriginalImages: any = [...originalImages];
      updatedOriginalImages[index] =
        originalImages[index] || logoListState[index].image;
      setOriginalImages(updatedOriginalImages);
    }
  };
  const [selectedImage, setSelectedImage] = useState<[]>([]);
  const [imageChanged, setImageChanged] = useState<boolean>(false);
  const [originalImages, setOriginalImages] = useState<[]>([]);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImagePicker = (index: number) => {
    if (!imageChanged) {
      const inputFile = document.getElementById(
        `file-input-${index}`
      ) as HTMLInputElement;
      if (inputFile) {
        inputFile.click();
        setSelectedIndex(index);
      }
    } else {
      alert("Vui lòng xác nhận hoặc hủy lựa chọn!!!");
    }
  };
  const [data, setData] = useState<LooseObject>({
    ID: 0,
    image: "",
  });
  const [image, setImage] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (ID: number) => {
    try {
      if (image) {
        const storageRef = ref((await storage).storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);

        setIsUploading(true);
        const imageUrl = await getDownloadURL(storageRef);

        await dispatch(updateLogo({ ID: ID, image: imageUrl }));

        alert("Cập nhật thành công");
        setIsUploading(false);
        return imageUrl;
      }

      return null;
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
      return null;
    }
  };

  const confirmImageChange = async (e: any) => {
    e.preventDefault();
    setImageChanged(false);
    setSelectedIndex(null);
  };

  const cancelImageChange = (index: number, e: any) => {
    e.preventDefault();
    if (imageChanged) {
      const updatedSelectedImages: any = [...selectedImage];
      updatedSelectedImages[index] = originalImages[index] || "";
      setSelectedImage(updatedSelectedImages);
    }
    setImageChanged(false);
    setSelectedIndex(null);
  };

  const authApp = fireStoreConfig();
  const storage = authApp;

  const [isOpen, setIsOpen] = useState(false);
  const openForm = () => {
    setIsOpen(true);
  };
  const closeForm = () => {
    setIsOpen(false);
  };
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
        width: "100%",
      }}
    >
      <Box display={"flex"}>
        {logoListState &&
          logoListState.map((item: LogoItem, index: number) => (
            <Box
              key={index}
              style={{ position: "relative", display: "inline-block" }}
            >
              <img
                src={selectedImage[index] || item.image}
                alt=""
                height={70}
                style={{ display: "block" }}
              />
              <label htmlFor={`file-input-${index}`}>
                {selectedIndex === index && imageChanged ? (
                  <Box>
                    <IconButton
                      onClick={() => {
                        handleImageUpload(item.ID);
                        confirmImageChange(event);
                      }}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "calc(50% - 20px)",
                        transform: "translateY(-50%)",
                        zIndex: 1,
                        color: "grey",
                        background: "white",
                        width: 30,
                        height: 30,
                        "&:hover": {
                          color: "black",
                          background: "lightgrey",
                        },
                      }}
                    >
                      <CheckCircleOutline sx={{ fontSize: 15 }} />
                    </IconButton>{" "}
                    <IconButton
                      onClick={(event) => cancelImageChange(index, event)}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "calc(50% + 5px)",
                        transform: "translateY(-50%)",
                        zIndex: 1,
                        color: "grey",
                        background: "white",
                        width: 30,
                        height: 30,
                        "&:hover": {
                          color: "black",
                          background: "lightgrey",
                        },
                      }}
                    >
                      <Close sx={{ fontSize: 15 }} />
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    onClick={() => openImagePicker(index)}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                      color: "grey",
                      background: "white",
                      width: 30,
                      height: 30,
                      "&:hover": {
                        color: "black",
                        background: "lightgrey",
                      },
                    }}
                  >
                    <Edit sx={{ fontSize: 15 }} />
                  </IconButton>
                )}
              </label>
              <input
                id={`file-input-${index}`}
                type="file"
                style={{ display: "none" }}
                onChange={(event) => handleImageChange(event, index)}
              />
            </Box>
          ))}
      </Box>
      {bannerListState && bannerListState.length > 0 && (
        <Box style={{ position: "relative" }} onClick={openForm}>
          <img src={bannerListState[0].image} alt="" height={70} />
          <IconButton
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              cursor: "pointer",

              width: 30,
              height: 30,
              backgroundColor: "white",
            }}
          >
            <IconPlus style={{ fontSize: 15 }} />
          </IconButton>
        </Box>
      )}
      <CreateBanner
        open={isOpen}
        closeForm={closeForm}
        banner={bannerListState}
      />
    </Box>
  );
};

export default Header;
