"use client";
import { styled, Container, Box } from "@mui/material";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux-store/hook";
import { getToken } from "../redux-store/login/slice";
import Footer from "./layout/footer/page";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  const pathname = usePathname();
  const token: any = getCookie("token");

  useEffect(() => {
    const asyncCall = async () => {
      if (!token) {
        window.location.href = "/pages/login";
      }
    };

    asyncCall();
  }, [token]);

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!token) {
    return null; // or any other UI for handling non-authenticated state
  }

  return (
    <MainWrapper className="mainwrapper">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper className="page-wrapper">
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          <Footer />
        </Box>
      </PageWrapper>
    </MainWrapper>
  );
}
