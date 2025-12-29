import { useNavigation } from "../hook";
import PageHeader from "../Components/ui/PageHeader";
import { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../services/orders";
import { Order } from "../types";
import toast from "react-hot-toast";
import { FormatCurrency } from "../helpers";
import { PaginatedOrders } from "../types";
import Pagination from "./Pagination";
import { useCallback } from "react";

// Tipo de respuesta paginada

export default function OrdersAdmin() {
  const { goToAdminLayout } = useNavigation();

  // Estados
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Órdenes por página

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response: PaginatedOrders = await getAllOrders(page, limit);
      setOrders(response.data);
      setTotalPages(response.totalPages);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error al cargar las órdenes");
      }
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateStatus = async (idOrders: number, newStatus: string) => {
    try {
      await updateOrderStatus(idOrders, newStatus);
      toast.success("Estado actualizado correctamente");
      fetchOrders();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error al actualizar el estado");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pendiente":
        return "badge-warning";
      case "completado":
        return "badge-success";
      case "cancelado":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Órdenes de clientes" onBack={goToAdminLayout} />
        <div className="flex justify-center mt-20">
          <span className="loading loading-spinner loading-lg text-accent"></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Órdenes de clientes" onBack={goToAdminLayout} />

      <div className="p-4 md:p-6 lg:p-10 mb-20">
        {orders.length === 0 ? (
          <p className="text-center mt-12 text-base-content opacity-60">
            No hay órdenes registradas
          </p>
        ) : (
          <>
            {/* Vista móvil: Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {orders.map((order) => (
                <div
                  key={order.idOrders}
                  className="card bg-base-100 shadow-xl border border-base-300"
                >
                  <div className="card-body p-4">
                    {/* Header de la card */}
                    <div className="flex justify-between items-start ">
                      <div>
                        <h3 className="font-bold text-lg">
                          Orden #{order.idOrders}
                        </h3>
                        <p className="text-sm opacity-70">
                          {new Date(order.order_date).toLocaleDateString(
                            "es-HN",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </p>
                      </div>
                      <span
                        className={`badge ${getStatusColor(
                          order.order_status
                        )} badge-lg`}
                      >
                        {order.order_status}
                      </span>
                    </div>

                    {/* Información del cliente */}
                    <div className="divider my-2"></div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 opacity-70"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="font-medium">{order.client_name}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 opacity-70"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm opacity-80">
                          {order.client_email}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 opacity-70"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-lg font-bold text-primary">
                          {FormatCurrency(order.total)}
                        </span>
                      </div>
                    </div>

                    {/* Selector de estado */}
                    <div className="divider my-2"></div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Cambiar estado:
                        </span>
                      </label>
                      <select
                        className="select select-bordered  w-full"
                        value={order.order_status}
                        onChange={(e) =>
                          handleUpdateStatus(order.idOrders, e.target.value)
                        }
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="completado">Completado</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Vista tablet y desktop: Tabla */}
            <div className="hidden md:block overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="text-center">ID</th>
                    <th>Cliente</th>
                    <th className="hidden lg:table-cell">Email</th>
                    <th className="text-right">Total</th>
                    <th className="hidden xl:table-cell">Fecha</th>
                    <th className="text-center">Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.idOrders} className="hover">
                      <td className="font-semibold text-center">
                        #{order.idOrders}
                      </td>
                      <td>
                        <div className="font-medium">{order.client_name}</div>
                        <div className="text-sm opacity-60 lg:hidden">
                          {order.client_email}
                        </div>
                      </td>
                      <td className="hidden lg:table-cell text-sm">
                        {order.client_email}
                      </td>
                      <td className="font-bold text-right text-primary">
                        {FormatCurrency(order.total)}
                      </td>
                      <td className="hidden lg:table-cell">
                        {new Date(order.order_date).toLocaleDateString(
                          "es-HN",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge ${getStatusColor(
                            order.order_status
                          )}`}
                        >
                          {order.order_status}
                        </span>
                      </td>
                      <td className="text-center">
                        <select
                          className="select select-bordered select-sm max-w-xs"
                          value={order.order_status}
                          onChange={(e) =>
                            handleUpdateStatus(order.idOrders, e.target.value)
                          }
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="completado">Completado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
