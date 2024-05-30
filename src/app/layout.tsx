"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./redux-store/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider store={store}>
        <ThemeProvider theme={baselightTheme}>
          <body>{children}</body>
        </ThemeProvider>
      </Provider>
    </html>
  );
}
