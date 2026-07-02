import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import PageToolbar from "../../components/common/PageToolbar";
import PrimaryButton from "../../components/common/PrimaryButton";

import {
  getFermentationRecords,
  getFermentationRecordsByBatch,
} from "../../services/fermentationRecordService";

import type { FermentationRecord } from "../../models/FermentationRecord";

export default function BatchHistory() {
  const [batches, setBatches] = useState<string[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [records, setRecords] = useState<FermentationRecord[]>([]);
  const [loadingBatches, setLoadingBatches] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch() {
    if (!selectedBatch) return;

    try {
      setLoadingHistory(true);
      setSearched(true);

      const data = await getFermentationRecordsByBatch(selectedBatch);

      setRecords(data);
    } catch (error) {
      console.error(error);
      setRecords([]);
    } finally {
      setLoadingHistory(false);
    }
  }

  function formatDate(value: string) {
    return new Date(value).toLocaleString("pt-BR");
  }

  function renderStatus(status: FermentationRecord["status"]) {
    if (status === "InStandard") {
      return <Chip label="Dentro do padrão" color="success" size="small" />;
    }

    if (status === "Warning") {
      return <Chip label="Atenção" color="warning" size="small" />;
    }

    return <Chip label="Fora do padrão" color="error" size="small" />;
  }

  useEffect(() => {
    let ignore = false;

    async function fetchBatches() {
      try {
        setLoadingBatches(true);

        const data = await getFermentationRecords();

        const uniqueBatches = [
          ...new Set(data.map((record) => record.batchNumber)),
        ].sort();

        if (!ignore) {
          setBatches(uniqueBatches);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) {
          setLoadingBatches(false);
        }
      }
    }

    void fetchBatches();

    return () => {
      ignore = true;
    };
  }, []);

  const firstRecord = records[0];

  return (
    <Box>
      <PageToolbar
        title="Histórico de Lotes"
        description="Consulte a evolução dos apontamentos fermentativos por lote."
      />

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #E8E8E8",
          p: 3,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            maxWidth: 700,
          }}
        >
          <Autocomplete
            options={batches}
            value={selectedBatch}
            onChange={(_, value) => setSelectedBatch(value)}
            loading={loadingBatches}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Lote"
                placeholder="Selecione um lote"
              />
            )}
          />

          <PrimaryButton onClick={handleSearch} disabled={!selectedBatch}>
            Buscar
          </PrimaryButton>
        </Box>
      </Paper>

      {firstRecord && (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid #E8E8E8",
            p: 3,
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Lote {firstRecord.batchNumber}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                Cerveja
              </Typography>
              <Typography>{firstRecord.beerName}</Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Tanque
              </Typography>
              <Typography>{firstRecord.tankName}</Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Total de registros
              </Typography>
              <Typography>{records.length}</Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Último status
              </Typography>
              {renderStatus(records[records.length - 1].status)}
            </Box>
          </Box>
        </Paper>
      )}

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #E8E8E8",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F5F6F8" }}>
              <TableCell>Data/Hora</TableCell>
              <TableCell>Temperatura</TableCell>
              <TableCell>pH</TableCell>
              <TableCell>Extrato</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Observação</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loadingHistory && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                    <CircularProgress size={28} />
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {!loadingHistory && !searched && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "text.secondary",
                      py: 4,
                    }}
                  >
                    Selecione um lote para visualizar o histórico.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {!loadingHistory && searched && records.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "text.secondary",
                      py: 4,
                    }}
                  >
                    Nenhum registro encontrado para este lote.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {!loadingHistory &&
              records.map((record) => (
                <TableRow
                  key={record.id}
                  sx={{
                    transition: "background-color .2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(172, 187, 205, 0.12)",
                    },
                  }}
                >
                  <TableCell>{formatDate(record.recordedAt)}</TableCell>
                  <TableCell>{record.temperature} ºC</TableCell>
                  <TableCell>{record.ph}</TableCell>
                  <TableCell>{record.extract}</TableCell>
                  <TableCell>{renderStatus(record.status)}</TableCell>
                  <TableCell>{record.observation || "-"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}