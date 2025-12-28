import { useNavigation } from "../hook";
import PageHeader from "../Components/ui/PageHeader";
export default function Dashboard() {
  const { goToAdminLayout } = useNavigation();
  return (
    <div>
      <PageHeader title="Dashboard" onBack={goToAdminLayout} />
    </div>
  );
}
