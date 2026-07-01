//Pagina de gerenciamento de registro de fermentações

import PageToolbar from "../../components/common/PageToolbar";
import PrimaryButton from "../../components/common/PrimaryButton";

export default function Fermentation() {
  return (
    <PageToolbar
      title="Fermentação"
      description="Registre apontamentos fermentativos de lotes em produção."
      action={<PrimaryButton>Novo Registro</PrimaryButton>}
    />
  );
}