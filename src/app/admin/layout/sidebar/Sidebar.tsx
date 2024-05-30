import React, { useState } from "react";
import { useMediaQuery, Box, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../shared/logo/Logo";
import SidebarItems from "./SidebarItems";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sidebarWidth = "300px";

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (lgUp) {
    return (
      <>
        <IconButton
          aria-label="open sidebar"
          onClick={handleMenuToggle}
          sx={{
            position: "fixed",
            zIndex: 1200,
            top: 14,
            left: 32,
          }}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon style={{ fontSize: 30, fontWeight: "bold", color: "black" }} />}
        </IconButton>
        <Drawer
          anchor="left"
          open={isMenuOpen}
          onClose={handleMenuToggle}
          variant="temporary"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxShadow: (theme) => theme.shadows[8],
            },
          }}
        >
          <Box px={2} py={2}>
            <Logo />
          </Box>
          <SidebarItems />
        </Drawer>
      </>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[10],
        },
      }}
    >
      <Box px={2} py={2}>
        <Logo />
      </Box>
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
