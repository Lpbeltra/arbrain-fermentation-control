import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
} from "@mui/material";

import PrimaryButton from "../common/PrimaryButton";
import type { Tank } from "../../models/Tank";
import type { TankRequest } from "../../services/tankService";

interface TankFormDialogProps {
  open: boolean;
  tank?: Tank;
  onClose: () => void;
  onSubmit: (data: TankRequest) => Promise<void>;
}

// Centralizei a criação do estado inicial para que o mesmo formulário possa
// ser utilizado tanto no cadastro quanto na edição de um tanque.
function getInitialForm(tank?: Tank): TankRequest {
  return {
    name: tank?.name ?? "",
    capacityLiters: tank?.capacityLiters ?? 0,
  };
}

export default function TankFormDialog({
  open,
  tank,
  onClose,
  onSubmit,
}: TankFormDialogProps) {
  const [form, setForm] = useState<TankRequest>(() => getInitialForm(tank));

  function handleChange<K extends keyof TankRequest>(
    field: K,
    value: TankRequest[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  // Optei por concentrar todas as validações em uma única função para facilitar futuras alterações e manter a renderização do componente mais organizada.
  function getValidationMessage() {
    if (!form.name.trim()) {
      return "É necessário inserir o nome do tanque.";
    }

    if (form.capacityLiters <= 0) {
      return "A capacidade deve ser maior que zero.";
    }

    return "";
  }

  const validationMessage = getValidationMessage();

  async function handleSubmit() {
    if (validationMessage) return;

    await onSubmit(form);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{tank ? "Editar Tanque" : "Novo Tanque"}</DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
        }}
      >
        <TextField
          label="Nome"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          fullWidth
        />

        <TextField
          label="Capacidade (L)"
          type="number"
          value={form.capacityLiters}
          onChange={(e) =>
            handleChange("capacityLiters", Math.max(0, Number(e.target.value)))
          }
          fullWidth
          slotProps={{
            htmlInput: {
              min: 0,
            },
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