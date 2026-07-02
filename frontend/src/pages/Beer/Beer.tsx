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
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PageToolbar from "../../components/common/PageToolbar";
import PrimaryButton from "../../components/common/PrimaryButton";
import {
  getBeers,
  createBeer,
  updateBeer,
  deleteBeer,
  type BeerRequest,
} from "../../services/beerService";
import type { Beer as BeerModel } from "../../models/Beer";
import BeerFormDialog from "../../components/beer/BeerFormDialog";
import EditIcon from "../../assets/icons/editar.svg";
import DeleteIcon from "../../assets/icons/deletar.svg";

export default function Beer() {
  const [beers, setBeers] = useState<BeerModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBeer, setSelectedBeer] = useState<BeerModel | undefined>();
  const [beerToDelete, setBeerToDelete] = useState<BeerModel | null>(null);

  // Mantive essa função separada para carregar as cervejas porque ela é usada em mais de um momento da tela.
  // Assim, depois de criar editar ou excluirconsigo atualizar a tabela sem repetir a mesma lógica em vários lugares.
  async function loadBeers() {
    try {
      setLoading(true);
      const data = await getBeers();
      setBeers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenDeleteDialog(beer: BeerModel) {
    setBeerToDelete(beer);
  }

  function handleCloseDeleteDialog() {
    setBeerToDelete(null);
  }

  // Antes de excluir, eu guardo a cerveja selecionada no estado para conseguir mostrar a confirmação
  // para o usuário. Isso evita excluir direto ao clicar
  async function handleDeleteBeer() {
    if (!beerToDelete) return;

    await deleteBeer(beerToDelete.id);

    setBeerToDelete(null);
    await loadBeers();
  }

  function handleOpenCreateDialog() {
    setSelectedBeer(undefined);
    setOpenDialog(true);
  }

  function handleOpenEditDialog(beer: BeerModel) {
    setSelectedBeer(beer);
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
    setSelectedBeer(undefined);
  }

  // Uso a mesma função para criação e edição porque o formulário é o mesmo.
  // A diferença fica por conta do selectedBeer: se existir uma cerveja selecionada,
  // entendo que é edição, caso contrário, faço o cadastro de uma nova cerveja.
  async function handleSubmitBeer(data: BeerRequest) {
    if (selectedBeer) {
      await updateBeer(selectedBeer.id, data);
    } else {
      await createBeer(data);
    }

    handleCloseDialog();
    await loadBeers();
  }

  useEffect(() => {
    let ignore = false;

    async function fetchBeers() {
      try {
        setLoading(true);

        const data = await getBeers();

        // Usei essa flag para evitar atualizar o estado caso o componente seja desmontado antes da resposta da API.
        // É uma proteção simples para evitar comportamento esquisito na tela entquanto a api ainda está carregando por exemplo
        if (!ignore) {
          setBeers(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void fetchBeers();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Box>
      <PageToolbar
        title="Cervejas"
        description="Gerencie as cervejas e seus parâmetros fermentativos."
        action={
          <PrimaryButton onClick={handleOpenCreateDialog}>
            Nova Cerveja
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
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F5F6F8" }}>
              <TableCell>Nome</TableCell>
              <TableCell>Estilo</TableCell>
              <TableCell>Temperatura</TableCell>
              <TableCell>pH</TableCell>
              <TableCell>Extrato</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      paddingY: 4,
                    }}
                  >
                    <CircularProgress size={28} />
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {!loading && beers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      textAlign: "center",
                      paddingY: 4,
                    }}
                  >
                    Nenhuma cerveja cadastrada.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              beers.map((beer) => (
                <TableRow
                  key={beer.id}
                  sx={{
                    transition: "background-color 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(172, 187, 205, 0.12)",
                    },
                  }}
                >
                  <TableCell>{beer.name}</TableCell>
                  <TableCell>{beer.style}</TableCell>
                  <TableCell>
                    {beer.minTemperature} - {beer.maxTemperature} ºC
                  </TableCell>
                  <TableCell>
                    {beer.minPh} - {beer.maxPh}
                  </TableCell>
                  <TableCell>
                    {beer.minExtract} - {beer.maxExtract}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        component="img"
                        src={EditIcon}
                        alt="Editar"
                        onClick={() => handleOpenEditDialog(beer)}
                        sx={{
                          width: 20,
                          height: 20,
                          cursor: "pointer",
                          transition: "transform .2s ease, opacity .2s ease",
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
                        onClick={() => handleOpenDeleteDialog(beer)}
                        sx={{
                          width: 20,
                          height: 20,
                          cursor: "pointer",
                          transition: "transform .2s ease, opacity .2s ease",
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
      <BeerFormDialog
        key={selectedBeer?.id ?? "new-beer"}
        open={openDialog}
        beer={selectedBeer}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitBeer}
      />

      <ConfirmDialog
        open={beerToDelete !== null}
        title="Excluir cerveja"
        message={`Tem certeza que deseja excluir "${beerToDelete?.name}"? Esta ação não poderá ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={handleDeleteBeer}
        onClose={handleCloseDeleteDialog}
      />
    </Box>
  );
}