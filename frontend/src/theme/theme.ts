import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#063852",
    },
    secondary: {
      main: "#ACBBCD",
    },
    background: {
      default: "#E8E8E8",
      paper: "#FFFFFF",
    },
    success: {
      main: "#9CDA97",
    },
    warning: {
      main: "#FFC524",
    },
    error: {
      main: "#FA9897",
    },
    text: {
      primary: "#1D1D2D",
      secondary: "#A4A4A4",
    },
  },
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});