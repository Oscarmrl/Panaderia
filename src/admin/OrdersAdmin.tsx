import { useNavigation } from "../hook";
import PageHeader from "../Components/ui/PageHeader";
import { useState, useEffect, useCallback } from "react";
import {
  getAllOrders,
  updateOrderStatus,
  getOrderDetails,
} from "../services/orders";
import { Order, OrderDetail, PaginatedOrders } from "../types";
import toast from "react-hot-toast";
import Pagination from "./Pagination";
import OrderDetailsModal from "./OrderDetailsModal";
import { USDToHNL } from "../helpers/currency";

export default function OrdersAdmin() {
  const { goToAdminLayout } = useNavigation();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const limit = 10;

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response: PaginatedOrders = await getAllOrders(page, limit);
      setOrders(response.data);
      setTotalPages(response.totalPages);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Error al cargar las órdenes");
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
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Error al actualizar el estado");
    }
  };

  const handleShowDetails = async (idOrders: number) => {
    setSelectedOrderId(idOrders);
    setShowDetailsModal(true);
    setLoadingDetails(true);

    try {
      const details = await getOrderDetails(idOrders);
      setOrderDetails(details);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Error al cargar los detalles de la orden");
      setShowDetailsModal(false);
    } finally {
      setLoadingDetails(false);
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
            {/* Cards móvil */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {orders.map((order) => (
                <div
                  key={order.idOrders}
                  className="card bg-base-100 shadow-xl border border-base-300"
                >
                  <div className="card-body p-4">
                    <div className="flex justify-between items-start">
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
                        className={`badge ${getStatusColor(order.order_status)} badge-lg`}
                      >
                        {order.order_status}
                      </span>
                    </div>

                    <div className="divider my-2"></div>
                    <div className="space-y-2">
                      {/* Nombre */}
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

                      {/* Email */}
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

                      {/* Teléfono */}
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
                            d="M2.25 6.75c0 7.87 6.38 14.25 14.25 14.25.62 0 1.22-.05 1.82-.14a2.25 2.25 0 001.93-1.6l.75-3a2.25 2.25 0 00-1.1-2.6l-3.1-1.55a2.25 2.25 0 00-2.74.57l-.98 1.2a11.1 11.1 0 01-5.24-5.24l1.2-.98a2.25 2.25 0 00.57-2.74L7.6 3.4a2.25 2.25 0 00-2.6-1.1l-3 .75a2.25 2.25 0 00-1.6 1.93c-.09.6-.14 1.2-.14 1.82z"
                          />
                        </svg>
                        <span className="text-sm opacity-80">
                          {order.client_phone}
                        </span>
                      </div>

                      {/* Total */}
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-primary"
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
                          {USDToHNL(order.total)}
                        </span>
                      </div>
                    </div>

                    <div className="divider my-2"></div>
                    <div className="flex justify-between items-center gap-2">
                      <select
                        className="select select-bordered w-full"
                        value={order.order_status}
                        onChange={(e) =>
                          handleUpdateStatus(order.idOrders, e.target.value)
                        }
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="completado">Completado</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => handleShowDetails(order.idOrders)}
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabla desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="text-center">ID</th>
                    <th>Cliente</th>
                    <th className="hidden lg:table-cell">Email</th>
                    <th className="hidden lg:table-cell">Teléfono</th>
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
                      <td>{order.client_name}</td>
                      <td className="hidden lg:table-cell text-sm">
                        {order.client_email}
                      </td>
                      <td className="hidden lg:table-cell text-sm">
                        {order.client_phone}
                      </td>
                      <td className="font-bold text-right text-primary">
                        {USDToHNL(order.total)}
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
                          className={`badge ${getStatusColor(order.order_status)}`}
                        >
                          {order.order_status}
                        </span>
                      </td>
                      <td className="text-center flex justify-center gap-2">
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
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => handleShowDetails(order.idOrders)}
                        >
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {/* Modal de detalles */}
      {showDetailsModal && selectedOrderId && (
        <OrderDetailsModal
          orderId={selectedOrderId}
          orderDetails={orderDetails}
          loading={loadingDetails}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
}
