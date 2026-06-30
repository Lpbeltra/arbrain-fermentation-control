import { Box, Divider, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

import dashboardIcon from "../../assets/icons/Dashboard.svg";
import beerIcon from "../../assets/icons/cerveja.svg";
import tankIcon from "../../assets/icons/tanque.svg";
import fermentationIcon from "../../assets/icons/malte.svg";
import historyIcon from "../../assets/icons/historico.svg";
import logo from "../../assets/icons/logo.svg";

const menuItems = [
  { label: "Dashboard", path: "/", icon: dashboardIcon },
  { label: "Cervejas", path: "/beers", icon: beerIcon },
  { label: "Tanques", path: "/tanks", icon: tankIcon },
  { label: "Fermentação", path: "/fermentation", icon: fermentationIcon },
  { label: "Histórico de Lotes", path: "/batch-history", icon: historyIcon },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        boxSizing: "border-box",
        backgroundColor: "#1D1D2D",
        color: "#FFFFFF",
        padding: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="BrewMaster"
          sx={{
            width: 150,
            height: 150,
            objectFit: "contain",
            marginBottom: 1.5,
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          BrewMaster
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#ACBBCD",
            marginTop: 0.5,
          }}
        >
          Fermentação Cervejeira
        </Typography>
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.08)",
          marginY: 3,
        }}
      />

      <Box
        component="nav"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  padding: "12px 16px",
                  borderRadius: 2,
                  color: isActive ? "#FFFFFF" : "#ACBBCD",
                  backgroundColor: isActive ? "#063852" : "transparent",
                  fontWeight: isActive ? 700 : 500,
                  transition: "all 0.2s ease",
                  overflow: "hidden",
                  "&:hover": {
                    backgroundColor: isActive
                      ? "#063852"
                      : "rgba(172, 187, 205, 0.12)",
                    color: "#FFFFFF",
                    transform: "translateX(4px)",
                  },
                }}
              >
                {isActive && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: 10,
                      bottom: 10,
                      width: 4,
                      borderRadius: 999,
                      backgroundColor: "#FFC524",
                    }}
                  />
                )}

                <Box
                  component="img"
                  src={item.icon}
                  alt=""
                  sx={{
                    width: 20,
                    height: 20,
                    objectFit: "contain",
                    opacity: isActive ? 1 : 0.75,
                    transition: "opacity 0.2s ease",
                    filter: "brightness(0) invert(1)",
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "inherit",
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            )}
          </NavLink>
        ))}
      </Box>

      <Box sx={{ flex: 1 }} />

      <Typography
        variant="caption"
        sx={{
          color: "rgba(172,187,205,0.7)",
          textAlign: "center",
        }}
      >
        Desafio ArBrain - Lisandro B.
      </Typography>
    </Box>
  );
}