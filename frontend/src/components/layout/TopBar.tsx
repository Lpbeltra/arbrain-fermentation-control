import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/beers": "Beers",
  "/tanks": "Tanks",
  "/fermentation": "Fermentation",
  "/batch-history": "Batch History",
};

export default function TopBar() {
  const location = useLocation();

  const title = pageTitles[location.pathname] ?? "BrewMaster";

  return (
    <Box
      sx={{
        height: 72,
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E8E8E8",
        display: "flex",
        alignItems: "center",
        paddingX: 4,
      }}
    >
      <Typography
        variant="h6"
        color="text.primary"
        sx={{
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}