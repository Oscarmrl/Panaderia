import { useNavigation } from "../hook";
import PageHeader from "../Components/ui/PageHeader";
export default function OrdersAdmin() {
  const { goToAdminLayout } = useNavigation();
  return (
    <div>
      <PageHeader title="Ordenes de clientes" onBack={goToAdminLayout} />
    </div>
  );
}
