"use client";
import { Box, IconButton, Typography } from "@mui/material";
import { IconHome } from "@tabler/icons-react";
import { useState } from "react";

const Menu = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const menuItems = [
    { label: "TRANG CHỦ" },
    { label: "GIỚI THIỆU" },
    { label: "TIN TỨC - SỰ KIỆN" },
    { label: "HOẠT ĐỘNG TRUYỀN GIÁO" },
    { label: "THÔNG TIN TƯ LIỆU" },
    { label: "TRUNG TÂM CHÍNH TRỊ" },
    { label: "HÌNH ẢNH" },
    { label: "GÓP Ý" },
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
      </Box>
    ));

    return elements;
  };
  return (
    <Box
      sx={{
        backgroundColor: "#D9251C",
        height: 40,
        borderBottom: "3px solid yellow",
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton aria-label="home" sx={{ color: "white" }}>
        <IconHome />
      </IconButton>
      {renderMenuItems()}
    </Box>
  );
};
export default Menu;
