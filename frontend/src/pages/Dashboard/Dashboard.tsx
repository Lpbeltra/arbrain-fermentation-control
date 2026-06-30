import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import DashboardCard from "../../components/dashboard/DashboardCard";
import { getDashboard } from "../../services/dashboardService";
import type { DashboardResponse } from "../../services/dashboardService";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          marginBottom: 3,
        }}
      >
        Monitoramento dos registros fermentativos
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Total de Registros"
            value={dashboard?.totalRecords ?? 0}
            description="Todos os registros fermentativos"
            color="#063852"
            loading={loading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Dentro do Padrão"
            value={dashboard?.inStandardRecords ?? 0}
            description="Registros dentro dos parâmetros aceitáveis"
            color="#9CDA97"
            loading={loading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Atenção"
            value={dashboard?.warningRecords ?? 0}
            description="Registros que requerem atenção"
            color="#FFC524"
            loading={loading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Fora do Padrão"
            value={dashboard?.outOfStandardRecords ?? 0}
            description="Registros fora dos parâmetros aceitáveis"
            color="#FA9897"
            loading={loading}
          />
        </Grid>
      </Grid>
    </Box>
  );
}