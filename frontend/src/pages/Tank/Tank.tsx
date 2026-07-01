import { useEffect, useState } from "react";
import {
  Box,
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
import TankFormDialog from "../../components/tank/TankFormDialog";

import {
  getTanks,
  createTank,
  updateTank,
  deleteTank,
  type TankRequest,
} from "../../services/tankService";

import type { Tank as TankModel } from "../../models/Tank";

import EditIcon from "../../assets/icons/editar.svg";
import DeleteIcon from "../../assets/icons/deletar.svg";

export default function Tank() {
  const [tanks, setTanks] = useState<TankModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTank, setSelectedTank] = useState<TankModel | undefined>();
  const [tankToDelete, setTankToDelete] = useState<TankModel | null>(null);

  // Mantive essa função separada porque ela é utilizada sempre que a lista precisa ser atualizada. Assim evito repetir
  //  a mesma lógica após criar, editar ou excluir um tanque.
  async function loadTanks() {
    try {
      setLoading(true);
      const data = await getTanks();
      setTanks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenCreateDialog() {
    setSelectedTank(undefined);
    setOpenDialog(true);
  }

  function handleOpenEditDialog(tank: TankModel) {
    setSelectedTank(tank);
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
    setSelectedTank(undefined);
  }

  // Aproveitei o mesmo formulário para cadastro e edição. A decisão é feita verificando se existe um tanque selecionado, evitando duplicar código.
  async function handleSubmitTank(data: TankRequest) {
    if (selectedTank) {
      await updateTank(selectedTank.id, data);
    } else {
      await createTank(data);
    }

    handleCloseDialog();
    await loadTanks();
  }

  function handleOpenDeleteDialog(tank: TankModel) {
    setTankToDelete(tank);
  }

  function handleCloseDeleteDialog() {
    setTankToDelete(null);
  }

  // Antes de excluir, mantenho o tanque selecionado no estado para que o
  // usuário possa confirmar a ação, evitando exclusões avidentais
  async function handleDeleteTank() {
    if (!tankToDelete) return;

    await deleteTank(tankToDelete.id);

    setTankToDelete(null);
    await loadTanks();
  }

  useEffect(() => {
    let ignore = false;

    async function fetchTanks() {
      try {
        setLoading(true);

        const data = await getTanks();

        if (!ignore) {
          setTanks(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void fetchTanks();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Box>
      <PageToolbar
        title="Tanques"
        description="Gerencie os tanques cadastrados."
        action={
          <PrimaryButton onClick={handleOpenCreateDialog}>
            Novo Tanque
          </PrimaryButton>
        }
      />

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #E8E8E8",
          overflow: "hidden",
          maxWidth: 1350,
          width: "100%",
          mx: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F5F6F8" }}>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Capacidade (L)</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      py: 4,
                    }}
                  >
                    <CircularProgress size={28} />
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {!loading && tanks.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "text.secondary",
                      py: 4,
                    }}
                  >
                    Nenhum tanque cadastrado.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              tanks.map((tank) => (
                <TableRow
                  key={tank.id}
                  sx={{
                    transition: "background-color .2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(172, 187, 205, 0.12)",
                    },
                  }}
                >
                  <TableCell align="center">
                    {tank.name}
                  </TableCell>

                  <TableCell align="center">
                    {tank.capacityLiters.toLocaleString("pt-BR")} L
                  </TableCell>

                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        component="img"
                        src={EditIcon}
                        alt="Editar"
                        onClick={() => handleOpenEditDialog(tank)}
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
                        onClick={() => handleOpenDeleteDialog(tank)}
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

      {openDialog && (
        <TankFormDialog
          key={selectedTank?.id ?? "new-tank"}
          open={openDialog}
          tank={selectedTank}
          onClose={handleCloseDialog}
          onSubmit={handleSubmitTank}
        />
      )}

      <ConfirmDialog
        open={tankToDelete !== null}
        title="Excluir tanque"
        message={`Tem certeza que deseja excluir "${tankToDelete?.name}"? Esta ação não poderá ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={handleDeleteTank}
        onClose={handleCloseDeleteDialog}
      />
    </Box>
  );
}