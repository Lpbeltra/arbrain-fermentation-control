import { useEffect, useState } from "react";
import {
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
  Typography,
} from "@mui/material";

import PageToolbar from "../../components/common/PageToolbar";
import PrimaryButton from "../../components/common/PrimaryButton";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import FermentationRecordFormDialog from "../../components/fermentation/FermentationRecordFormDialog";

import {
  getFermentationRecords,
  createFermentationRecord,
  updateFermentationRecord,
  deleteFermentationRecord,
  type FermentationRecordRequest,
} from "../../services/fermentationRecordService";

import { getBeers } from "../../services/beerService";
import { getTanks } from "../../services/tankService";

import type { Beer } from "../../models/Beer";
import type { Tank } from "../../models/Tank";
import type { FermentationRecord } from "../../models/FermentationRecord";

import EditIcon from "../../assets/icons/editar.svg";
import DeleteIcon from "../../assets/icons/deletar.svg";

export default function Fermentation() {
  // Estados principais da tela: registros exibidos na tabela,
  // listas usadas nos selects do formulário e controles dos modais.
  const [records, setRecords] = useState<FermentationRecord[]>([]);
  const [beers, setBeers] = useState<Beer[]>([]);
  const [tanks, setTanks] = useState<Tank[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<FermentationRecord | undefined>();
  const [recordToDelete, setRecordToDelete] =
    useState<FermentationRecord | null>(null);

  // Carrega todos os dados necessários para a página, além dos registros, também busca
  //  cervejas e tanques para o formulário.
  async function loadPageData() {
    try {
      setLoading(true);

      const [recordsData, beersData, tanksData] = await Promise.all([
        getFermentationRecords(),
        getBeers(),
        getTanks(),
      ]);

      setRecords(recordsData);
      setBeers(beersData);
      setTanks(tanksData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Controle de abertura e fechamento do formulário quando existe selectedRecord, o modal funciona em modo de edição.
  function handleOpenCreateDialog() {
    setSelectedRecord(undefined);
    setOpenDialog(true);
  }

  function handleOpenEditDialog(record: FermentationRecord) {
    setSelectedRecord(record);
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
    setSelectedRecord(undefined);
  }

  // Cria ou atualiza um registro de fermentação conforme o contexto atual.
  // Depois disso, recarregar a tabela para pra mostrar o status calculado pela API?!
  async function handleSubmitRecord(data: FermentationRecordRequest) {
    if (selectedRecord) {
      await updateFermentationRecord(selectedRecord.id, data);
    } else {
      await createFermentationRecord(data);
    }

    handleCloseDialog();
    await loadPageData();
  }

  // Controle do fluxo de exclusão com confirmação antes da ação.
  function handleOpenDeleteDialog(record: FermentationRecord) {
    setRecordToDelete(record);
  }

  function handleCloseDeleteDialog() {
    setRecordToDelete(null);
  }

  async function handleDeleteRecord() {
    if (!recordToDelete) return;

    await deleteFermentationRecord(recordToDelete.id);

    setRecordToDelete(null);
    await loadPageData();
  }

  // Formata a data retornada pela API para o padrão brasileiro.
  function formatDate(value: string) {
    return new Date(value).toLocaleString("pt-BR");
  }

  // Traduz o status técnico da API para um indicador visual mais amigável.
  function renderStatus(status: FermentationRecord["status"]) {
    if (status === "InStandard") {
      return <Chip label="Dentro do padrão" color="success" size="small" />;
    }

    if (status === "Warning") {
      return <Chip label="Atenção" color="warning" size="small" />;
    }

    return <Chip label="Fora do padrão" color="error" size="small" />;
  }

  // Busca os dados iniciais ao abrir a página.O "ignore" evita atualizar estado caso o componente seja desmontado
  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        setLoading(true);

        const [recordsData, beersData, tanksData] = await Promise.all([
          getFermentationRecords(),
          getBeers(),
          getTanks(),
        ]);

        if (!ignore) {
          setRecords(recordsData);
          setBeers(beersData);
          setTanks(tanksData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Box>
      <PageToolbar
        title="Registros de Fermentação"
        description="Registre e acompanhe os apontamentos fermentativos."
        action={
          <PrimaryButton onClick={handleOpenCreateDialog}>
            Novo Registro
          </PrimaryButton>
        }
      />

      {/* Tabela principal com todos os registros fermentativos */}
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
              <TableCell>Lote</TableCell>
              <TableCell>Cerveja</TableCell>
              <TableCell>Tanque</TableCell>
              <TableCell>Temp.</TableCell>
              <TableCell>pH</TableCell>
              <TableCell>Extrato</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Estado de carregamento */}
            {loading && (
              <TableRow>
                <TableCell colSpan={9}>
                  <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                    <CircularProgress size={28} />
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {/* Mensagem exibida quando ainda não há registros */}
            {!loading && records.length === 0 && (
              <TableRow>
                <TableCell colSpan={9}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "text.secondary",
                      py: 4,
                    }}
                  >
                    Nenhum registro de fermentação cadastrado.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {/* Registros retornados pela API */}
            {!loading &&
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
                  <TableCell>{record.batchNumber}</TableCell>
                  <TableCell>{record.beerName}</TableCell>
                  <TableCell>{record.tankName}</TableCell>
                  <TableCell>{record.temperature} ºC</TableCell>
                  <TableCell>{record.ph}</TableCell>
                  <TableCell>{record.extract}</TableCell>
                  <TableCell>{renderStatus(record.status)}</TableCell>

                  <TableCell align="center">
                    {/* Ações do registro */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        component="img"
                        src={EditIcon}
                        alt="Editar"
                        onClick={() => handleOpenEditDialog(record)}
                        sx={{
                          width: 20,
                          height: 20,
                          cursor: "pointer",
                          transition: "all .2s ease",
                          "&:hover": {
                            transform: "scale(1.1)",
                            opacity: 0.8,
                          },
                        }}
                      />

                      <Box
                        component="img"
                        src={DeleteIcon}
                        alt="Excluir"
                        onClick={() => handleOpenDeleteDialog(record)}
                        sx={{
                          width: 20,
                          height: 20,
                          cursor: "pointer",
                          transition: "all .2s ease",
                          "&:hover": {
                            transform: "scale(1.1)",
                            opacity: 0.8,
                          },
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal reutilizado para cadastro e edição */}
      {openDialog && (
        <FermentationRecordFormDialog
          key={selectedRecord?.id ?? "new-record"}
          open={openDialog}
          record={selectedRecord}
          beers={beers}
          tanks={tanks}
          onClose={handleCloseDialog}
          onSubmit={handleSubmitRecord}
        />
      )}

      {/* Confirmação antes de excluir um registro */}
      <ConfirmDialog
        open={recordToDelete !== null}
        title="Excluir registro"
        message={`Tem certeza que deseja excluir o registro do lote "${recordToDelete?.batchNumber}"? Esta ação não poderá ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={handleDeleteRecord}
        onClose={handleCloseDeleteDialog}
      />
    </Box>
  );
}