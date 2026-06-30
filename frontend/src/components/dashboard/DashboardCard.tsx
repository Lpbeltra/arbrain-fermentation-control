import { Box, Paper, Skeleton, Typography } from "@mui/material";

interface DashboardCardProps {
  title: string;
  value: number;
  description: string;
  color: string;
  loading?: boolean;
}

export default function DashboardCard({
  title,
  value,
  description,
  color,
  loading = false,
}: DashboardCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        padding: 3,
        borderRadius: 3,
        border: "1px solid #E8E8E8",
        transition: "all 0.25s ease",
        cursor: "default",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 12px 28px rgba(29, 29, 45, 0.12)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 5,
          backgroundColor: color,
        }}
      />

      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: 2,
          backgroundColor: `${color}33`,
          marginBottom: 2,
        }}
      />

      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          fontWeight: 600,
          marginBottom: 2,
        }}
      >
        {title}
      </Typography>

      {loading ? (
        <Skeleton variant="text" width={80} height={56} />
      ) : (
        <Typography
          variant="h4"
          sx={{
            color: "text.primary",
            fontWeight: 700,
            marginBottom: 1,
          }}
        >
          {value}
        </Typography>
      )}

      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
        }}
      >
        {description}
      </Typography>
    </Paper>
  );
}