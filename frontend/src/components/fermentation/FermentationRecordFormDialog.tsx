import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import PrimaryButton from "../common/PrimaryButton";
import type { Beer } from "../../models/Beer";
import type { Tank } from "../../models/Tank";
import type { FermentationRecord } from "../../models/FermentationRecord";
import type { FermentationRecordRequest } from "../../services/fermentationRecordService";

// Modal para inserção de registros de fermentação
// Julguei ser melhor para inserir as infos do que escrever direto na pagina

interface FermentationRecordFormDialogProps {
  open: boolean;
  record?: FermentationRecord;
  beers: Beer[];
  tanks: Tank[];
  onClose: () => void;
  onSubmit: (data: FermentationRecordRequest) => Promise<void>;
}

function getInitialForm(
  record?: FermentationRecord
): FermentationRecordRequest {
  return {
    beerId: record?.beerId ?? "",
    tankId: record?.tankId ?? "",
    batchNumber: record?.batchNumber ?? "",
    temperature: record?.temperature ?? 0,
    ph: record?.ph ?? 0,
    extract: record?.extract ?? 0,
    observation: record?.observation ?? "",
  };
}

export default function FermentationRecordFormDialog({
  open,
  record,
  beers,
  tanks,
  onClose,
  onSubmit,
}: FermentationRecordFormDialogProps) {
  const [form, setForm] = useState<FermentationRecordRequest>(() =>
    getInitialForm(record)
  );

  function handleChange<K extends keyof FermentationRecordRequest>(
    field: K,
    value: FermentationRecordRequest[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function getValidationMessage() {
    if (!form.beerId) return "Selecione uma cerveja.";
    if (!form.tankId) return "Selecione um tanque.";
    if (!form.batchNumber.trim()) return "Informe o número do lote.";
    if (form.extract <= 0) return "O extrato deve ser maior que zero.";

    return "";
  }

  const validationMessage = getValidationMessage();

  async function handleSubmit() {
    if (validationMessage) return;

    await onSubmit(form);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {record ? "Editar Registro de Fermentação" : "Novo Registro de Fermentação"}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
          mt: 1,
        }}
      >
        <TextField
          select
          label="Cerveja"
          value={form.beerId}
          onChange={(e) => handleChange("beerId", e.target.value)}
          fullWidth
        >
          {beers.map((beer) => (
            <MenuItem key={beer.id} value={beer.id}>
              {beer.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Tanque"
          value={form.tankId}
          onChange={(e) => handleChange("tankId", e.target.value)}
          fullWidth
        >
          {tanks.map((tank) => (
            <MenuItem key={tank.id} value={tank.id}>
              {tank.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Número do lote"
          value={form.batchNumber}
          onChange={(e) => handleChange("batchNumber", e.target.value)}
          fullWidth
        />

        <TextField
          label="Temperatura (ºC)"
          type="number"
          value={form.temperature}
          onChange={(e) => handleChange("temperature", Number(e.target.value))}
          fullWidth
        />

        <TextField
          label="pH"
          type="number"
          value={form.ph}
          onChange={(e) => handleChange("ph", Number(e.target.value))}
          fullWidth
        />

        <TextField
          label="Extrato"
          type="number"
          value={form.extract}
          onChange={(e) =>
            handleChange("extract", Math.max(0, Number(e.target.value)))
          }
          fullWidth
          slotProps={{
            htmlInput: {
              min: 0,
            },
          }}
        />

        <TextField
          label="Observação"
          value={form.observation}
          onChange={(e) => handleChange("observation", e.target.value)}
          fullWidth
          multiline
          minRows={3}
          sx={{
            gridColumn: "1 / -1",
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Box sx={{ flex: 1, minHeight: 24 }}>
          {validationMessage && (
            <Typography variant="body2" sx={{ color: "error.main" }}>
              {validationMessage}
            </Typography>
          )}
        </Box>

        <Button onClick={onClose}>Cancelar</Button>

        <PrimaryButton onClick={handleSubmit} disabled={!!validationMessage}>
          Salvar
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}