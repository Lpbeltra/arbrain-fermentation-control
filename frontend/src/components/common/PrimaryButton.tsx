import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";

export default function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        borderRadius: 2,
        paddingX: 2.5,
        paddingY: 1.2,
        fontWeight: 700,
        boxShadow: "none",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0px 10px 24px rgba(6, 56, 82, 0.22)",
          transform: "translateY(-2px)",
        },
        ...props.sx,
      }}
    />
  );
}