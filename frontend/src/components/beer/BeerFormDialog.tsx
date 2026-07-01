import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

import PrimaryButton from "../common/PrimaryButton";
import type { Beer } from "../../models/Beer";
import type { BeerRequest } from "../../services/beerService";

interface BeerFormDialogProps {
  open: boolean;
  beer?: Beer;
  onClose: () => void;
  onSubmit: (data: BeerRequest) => Promise<void>;
}

const initialForm: BeerRequest = {
  name: "",
  style: "",
  minTemperature: 0,
  maxTemperature: 0,
  minPh: 0,
  maxPh: 0,
  minExtract: 0,
  maxExtract: 0,
};

// Centralizei a criação do estado inicial para reutilizar o mesmo formulário
// tanto no cadastro quanto na edição de uma cerveja.
function getInitialForm(beer?: Beer): BeerRequest {
  if (!beer) {
    return initialForm;
  }

  return {
    name: beer.name,
    style: beer.style,
    minTemperature: beer.minTemperature,
    maxTemperature: beer.maxTemperature,
    minPh: beer.minPh,
    maxPh: beer.maxPh,
    minExtract: beer.minExtract,
    maxExtract: beer.maxExtract,
  };
}

export default function BeerFormDialog({
  open,
  beer,
  onClose,
  onSubmit,
}: BeerFormDialogProps) {
  const [form, setForm] = useState<BeerRequest>(() => getInitialForm(beer));
  const [saving, setSaving] = useState(false);

  const validationMessage = getValidationMessage();
  const canSave = validationMessage === "";

  // Preferi concentrar as validações em uma única função para deixar o restante
  // do componente mais organizado e facilitar futuras alterações, igual no TankFormDialog
  function getValidationMessage() {
    if (form.maxTemperature < form.minTemperature) {
      return "A temperatura máxima deve ser maior ou igual à mínima.";
    }

    if (form.maxPh < form.minPh) {
      return "O pH máximo deve ser maior ou igual ao mínimo.";
    }

    if (form.maxExtract < form.minExtract) {
      return "O extrato máximo deve ser maior ou igual ao mínimo.";
    }

    return "";
  }

  // Os campos numéricos chegam como texto pelo TextField. Aqui faço a conversão apenas quando necessário
  //  para manter o objeto do formulário compatível com a API.
  function handleChange(field: keyof BeerRequest, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]:
        field === "name" || field === "style"
          ? value
          : value === ""
            ? 0
            : Number(value),
    }));
  }

  async function handleSubmit() {
    try {
      setSaving(true);
      await onSubmit(form);
      setForm(initialForm);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  function handleClose() {
    setForm(initialForm);
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {beer ? "Editar Cerveja" : "Nova Cerveja"}
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
            marginTop: 1,
          }}
        >
          <TextField
            label="Nome"
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            fullWidth
          />

          <TextField
            label="Estilo"
            value={form.style}
            onChange={(event) => handleChange("style", event.target.value)}
            fullWidth
          />

          <TextField
            label="Temperatura mínima"
            type="number"
            value={form.minTemperature}
            onChange={(event) =>
              handleChange("minTemperature", event.target.value)
            }
            slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
            fullWidth
          />

          <TextField
            label="Temperatura máxima"
            type="number"
            value={form.maxTemperature}
            onChange={(event) =>
              handleChange("maxTemperature", event.target.value)
            }
            slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
            fullWidth
          />

          <TextField
            label="pH mínimo"
            type="number"
            value={form.minPh}
            onChange={(event) => handleChange("minPh", event.target.value)}
            slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
            fullWidth
          />

          <TextField
            label="pH máximo"
            type="number"
            value={form.maxPh}
            onChange={(event) => handleChange("maxPh", event.target.value)}
            slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
            fullWidth
          />

          <TextField
            label="Extrato mínimo"
            type="number"
            value={form.minExtract}
            onChange={(event) =>
              handleChange("minExtract", event.target.value)
            }
            slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
            fullWidth
          />

          <TextField
            label="Extrato máximo"
            type="number"
            value={form.maxExtract}
            onChange={(event) =>
              handleChange("maxExtract", event.target.value)
            }
            slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          padding: 3,
          paddingTop: 1,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box sx={{ flex: 1, minHeight: 24 }}>
          {validationMessage && (
            <Typography variant="body2" sx={{ color: "error.main" }}>
              {validationMessage}
            </Typography>
          )}
        </Box>

        <Button onClick={handleClose} disabled={saving}>
          Cancelar
        </Button>

        <PrimaryButton onClick={handleSubmit} disabled={saving || !canSave}>
          {saving ? "Salvando..." : "Salvar"}
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}