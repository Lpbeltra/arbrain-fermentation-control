import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface PageToolbarProps {
  title: string;
  description: string;
  action?: ReactNode;
}

//Essa é uma toolbar que, em sua maioria, suporta apenas o titulo e subtitulo da pagina e o mainButton. Fundação já pronta
//para uma futura implementação de mais features.

export default function PageToolbar({
  title,
  description,
  action,
}: PageToolbarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "center" },
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        marginBottom: 4,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            marginTop: 1,
          }}
        >
          {description}
        </Typography>
      </Box>

      {action && (
        <Box
          sx={{
            flexShrink: 0,
            alignSelf: { xs: "stretch", md: "center" },
          }}
        >
          {action}
        </Box>
      )}
    </Box>
  );
}