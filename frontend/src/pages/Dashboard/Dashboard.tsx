// Dashboard inicial

import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import DashboardCard from "../../components/dashboard/DashboardCard";
import { getDashboard } from "../../services/dashboardService";
import type { DashboardResponse } from "../../services/dashboardService";
import PageToolbar from "../../components/common/PageToolbar";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // O carregamento é feito assim que a tela é aberta para que os indicadores do dashboard já sejam exibidos atualizados ao usuário.
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
      <PageToolbar
        title="Dashboard"
        description="Monitore os registros fermentativos e o status do processo."
      />
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