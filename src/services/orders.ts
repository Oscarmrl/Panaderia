import axios from "axios";
import { Order } from "../types";

const API_URL = "http://localhost:3000/orders";

export interface OrderStats {
  total_orders: number;
  pending_orders: number;
  completed_orders: number;
  cancelled_orders: number;
  total_revenue: number;
}

// Obtener todas las órdenes (admin)
export const getAllOrders = async (): Promise<Order[]> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No autenticado");
  }

  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 10000,
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        throw new Error("No tienes permisos para ver las órdenes");
      }

      throw new Error(
        err.response?.data?.message || "Error al obtener las órdenes"
      );
    }

    throw new Error("Error inesperado");
  }
};

// Actualizar estado de una orden
export const updateOrderStatus = async (
  idOrders: number,
  order_status: string
): Promise<{ message: string }> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No autenticado");
  }

  try {
    const response = await axios.put(
      `${API_URL}/${idOrders}/status`,
      { order_status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      }
    );

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        throw new Error("No tienes permisos para actualizar la orden");
      }

      throw new Error(
        err.response?.data?.message || "Error al actualizar el estado"
      );
    }

    throw new Error("Error inesperado");
  }
};
