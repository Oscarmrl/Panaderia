import { useEffect, useState } from "react";
import { useNavigation } from "../hook";
import PageHeader from "../Components/ui/PageHeader";
import { DashboardSummary, SalesByDay, TopProduct } from "../types";

import {
  getDashboardSummary,
  getSalesByDay,
  getTopProducts,
} from "../services/dashboard";

export default function Dashboard() {
  const { goToAdminLayout } = useNavigation();

  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [sales, setSales] = useState<SalesByDay[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [summaryRes, salesRes, topProductsRes] = await Promise.all([
          getDashboardSummary(),
          getSalesByDay(),
          getTopProducts(),
        ]);

        setSummary(summaryRes);
        setSales(salesRes);
        setTopProducts(topProductsRes);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div>
        <PageHeader title="Dashboard" onBack={goToAdminLayout} />
        <p className="text-center mt-10">Cargando dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageHeader title="Dashboard" onBack={goToAdminLayout} />
        <p className="text-center mt-10 text-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <PageHeader title="Dashboard" onBack={goToAdminLayout} />

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <DashboardCard
            title="Ventas del día"
            value={`L ${summary.totalSales_hnl.toFixed(2)}`}
          />
          <DashboardCard title="Órdenes totales" value={summary.totalOrders} />
          <DashboardCard
            title="Órdenes pendientes"
            value={summary.pendingOrders}
          />
          <DashboardCard
            title="Productos con bajo stock"
            value={summary.lowStock}
          />
        </div>
      )}

      <div className="card bg-base-100 shadow mt-8">
        <div className="card-body">
          <h2 className="card-title">Ventas por día</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Total (HNL)</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s.date}>
                  <td>{s.date}</td>
                  <td>L {s.total_hnl.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-base-100 shadow mt-8">
        <div className="card-body">
          <h2 className="card-title">Productos más vendidos</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad vendida</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td>{p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body text-center">
        <h3 className="text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
