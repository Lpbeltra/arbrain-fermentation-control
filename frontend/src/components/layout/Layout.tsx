import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function Layout() {
  return (
    <Box
        sx={{
            display: "flex",
            height: "100vh",
        }}
        >
      <Sidebar />

      <Box
        sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
        }}
        >
        <TopBar />

        <Box
          component="main"
          sx={{
            flex: 1,
            padding: 4,
            backgroundColor: "background.default",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}