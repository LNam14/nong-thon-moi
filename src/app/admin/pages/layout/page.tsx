"use client";

import { useState } from "react";
import {
  Grid,
  Tab,
  Tabs,
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
  Fab,
} from "@mui/material";
import BaseCard from "../../components/shared/BaseCard";
import Approval from "../../components/tabs/Approve/page";
import WaitForApproval from "../../components/tabs/Wait-for-approval/page";
import Refuse from "../../components/tabs/Refuse/page";
import { IconHome, IconPlus, IconX } from "@tabler/icons-react";
import CreateNews from "../../components/form/CreateNews";
import Remove from "../../components/tabs/Remove/page";
import Publishing from "../../components/tabs/Publishing/page";
import {
  AddCircleOutline,
  CheckCircleOutline,
  Close,
  Edit,
} from "@mui/icons-material";
import Header from "@/app/pages/layouts/header/page";
import Menu from "@/app/pages/layouts/header/menu/page";

const Layouts = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => {
    setIsOpen(true);
  };
  const closeForm = () => {
    setIsOpen(false);
  };
  const [imageSrcLogo, setImageSrcLogo] = useState("/images/logo/codang.jpg");
  const [imageSrcLogo1, setImageSrcLogo1] = useState("/images/logo/logo.png");
  const [imageSrcBanner, setImageSrcBanner] = useState(
    "/images/banner/Banner-02.jpg"
  );
  const [isImageLogo, setIsImageLogo] = useState(false);
  const [isImageLogo1, setIsImageLogo1] = useState(false);
  const [isImageBanner, setIsImageBanner] = useState(false);

  const handleClickLogo = () => {
    const fileInput = document.getElementById("fileInputLogo");
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleClickLogo1 = () => {
    const fileInput = document.getElementById("fileInputLogo1");
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleClickBanner = () => {
    const fileInput = document.getElementById("fileInputBanner");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleLogoChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImageSrcLogo(e.target.result);
        setIsImageLogo(true);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleLogo1Change = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImageSrcLogo1(e.target.result);
        setIsImageLogo1(true);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleBannerChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImageSrcBanner(e.target.result);
        setIsImageBanner(true);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCancelLogo = () => {
    setImageSrcLogo("/images/logo/codang.jpg");
    setIsImageLogo(false);
  };
  const handleCancelLogo1 = () => {
    setImageSrcLogo1("/images/logo/logo.png");
    setIsImageLogo1(false);
  };
  const handleCancelBanner = () => {
    setImageSrcBanner("/images/banner/Banner-03.jpg");
    setIsImageBanner(false);
  };
  const [hoverIndex, setHoverIndex] = useState(null);
  const menuItems = [
    { label: "TRANG CHỦ" },
    { label: "GIỚI THIỆU" },
    { label: "TIN TỨC - SỰ KIỆN" },
    { label: "HOẠT ĐỘNG TRUYỀN GIÁO" },
    { label: "THÔNG TIN TƯ LIỆU" },
    { label: "TRUNG TÂM CHÍNH TRỊ" },
    { label: "HÌNH ẢNH" },
  ];
  const renderMenuItems = () => {
    const totalItems = 8;
    const itemsToShow = menuItems.slice(0, totalItems);
    const itemsCount = itemsToShow.length;

    const elements = itemsToShow.map((item, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            paddingLeft: 1,
            paddingRight: 1,
            color: "white",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {item.label}
        </Typography>
        <IconButton
          aria-label="delete"
          sx={{
            color: "black",
            position: "absolute",
            right: 0,
            top: -8,
            backgroundColor: "white",
            width: 5,
            height: 5,
            "&:hover": {
              backgroundColor: "grey",
              color: "white",
            },
          }}
        >
          <Close sx={{ fontSize: 9 }} />
        </IconButton>
      </Box>
    ));

    if (itemsCount < totalItems) {
      elements.push(
        <IconButton
          key={itemsCount}
          aria-label="add"
          sx={{
            color: "white",
            width: 50,
            height: 50,
            "&:hover": {
              color: "grey",
            },
          }}
        >
          <AddCircleOutline sx={{ fontSize: 30 }} />
        </IconButton>
      );
    }

    return elements;
  };
  return (
    <Grid>
      <Grid>
        <BaseCard>
          <Box>
            <Header />
            <Menu />
            <Box display={"flex"}>
              <Box sx={{ width: "75%", height: 100 }}></Box>
              <Box
                sx={{
                  backgroundColor: "white",
                  width: "25%",
                  border: "1px solid #F7F7F7",
                }}
              ></Box>
            </Box>
          </Box>
        </BaseCard>
      </Grid>
      <CreateNews open={isOpen} closeForm={closeForm} />
    </Grid>
  );
};
export default Layouts;
