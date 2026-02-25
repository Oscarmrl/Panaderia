import { useEffect, useState } from "react";
import { useNavigation } from "../hook";
import PageHeader from "../Components/ui/PageHeader";
import { DashboardSummary, SalesByDayResponse, MonthlySales, TopProduct } from "../types";

import {
  getDashboardSummary,
  getSalesByDay,
  getTopProducts,
  getMonthlySales,
} from "../services/dashboard";

export default function Dashboard() {
  const { goToAdminLayout } = useNavigation();

  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [sales, setSales] = useState<SalesByDayResponse | null>(null);
  const [monthlySales, setMonthlySales] = useState<MonthlySales[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [salesPage, setSalesPage] = useState(1);
  const salesLimit = 7;

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [summaryRes, salesRes, monthlyRes, topProductsRes] = await Promise.all([
          getDashboardSummary(),
          getSalesByDay(salesPage, salesLimit),
          getMonthlySales(),
          getTopProducts(),
        ]);

         console.log('Dashboard summary:', summaryRes);
         console.log('Sales by day:', salesRes);
         console.log('Monthly sales:', monthlyRes);
         setSummary(summaryRes);
         setSales(salesRes);
         setMonthlySales(monthlyRes);
         setTopProducts(topProductsRes);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [salesPage]);

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
    <div className="p-4 mb-20">
      <PageHeader title="Dashboard" onBack={goToAdminLayout} />

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <DashboardCard
            title="Ventas del día"
             value={`L ${Number(summary.totalSales_hnl || 0).toFixed(2)}`}
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
               {sales?.data?.map((s) => (
                 <tr key={s.date}>
                   <td>{s.date}</td>
                    <td>L {Number(s.total_hnl || 0).toFixed(2)}</td>
                 </tr>
               ))}
              </tbody>
           </table>
           
           {sales?.pagination && (
             <div className="flex justify-between items-center mt-4">
               <div className="text-sm">
                 Página {sales.pagination.page} de {sales.pagination.totalPages} ({sales.pagination.totalDays} días totales)
               </div>
               <div className="join">
                 <button 
                   className="join-item btn btn-sm"
                   disabled={!sales.pagination.hasPrev}
                   onClick={() => setSalesPage(sales.pagination.page - 1)}
                 >
                   « Anterior
                 </button>
                 <button 
                   className="join-item btn btn-sm"
                   disabled={!sales.pagination.hasNext}
                   onClick={() => setSalesPage(sales.pagination.page + 1)}
                 >
                   Siguiente »
                 </button>
               </div>
             </div>
           )}
         </div>
       </div>

       <div className="card bg-base-100 shadow mt-8">
         <div className="card-body">
           <h2 className="card-title">Ventas mensuales</h2>
           <table className="table">
             <thead>
               <tr>
                 <th>Mes</th>
                 <th>Total (HNL)</th>
                 <th>Cantidad de órdenes</th>
               </tr>
             </thead>
             <tbody>
               {monthlySales.map((ms) => (
                 <tr key={ms.month}>
                   <td>{ms.month}</td>
                   <td>L {Number(ms.total_hnl || 0).toFixed(2)}</td>
                   <td>{ms.orderCount}</td>
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
