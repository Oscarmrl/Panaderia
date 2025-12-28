import { useNavigation } from "../hook";
import PageHeader from "../Components/ui/PageHeader";

export default function AddProducts() {
  const { goToAdminLayout } = useNavigation();
  return (
    <div>
      <PageHeader title="Añadir Producto" onBack={goToAdminLayout} />
    </div>
  );
}
