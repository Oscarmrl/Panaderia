import axios from "axios";
import { PaginatedOrders, OrderDetail, ProductItem } from "../types";

const API_URLS = [
  "http://localhost:3000",
  "https://backendpanaderia-production.up.railway.app",
];

// Helper para intentar peticiones con múltiples URLs
async function tryAxiosRequest<T>(
  requestFn: (baseUrl: string) => Promise<T>
): Promise<T> {
  let lastError: Error | null = null;

  for (const baseUrl of API_URLS) {
    try {
      return await requestFn(baseUrl);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      continue;
    }
  }

  throw lastError || new Error("No se pudo conectar con el servidor");
}

// Crear una nueva orden
export const createOrder = async (
  cart: ProductItem[]
): Promise<{ message: string; idOrders: number }> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No autenticado");
  }

  // Transformar el carrito al formato esperado por el backend
  const transformedCart = cart.map(item => ({
    idProducts: item.idProducts,
    amount: item.quantity,
    subtotal: item.price * item.quantity
  }));

  return tryAxiosRequest(async (baseUrl) => {
    try {
      const response = await axios.post(`${baseUrl}/orders`, { cart: transformedCart }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      });

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          throw new Error("No tienes permisos para crear una orden");
        }
        throw new Error(
          err.response?.data?.message || "Error al crear la orden"
        );
      }
      throw new Error("Error inesperado");
    }
  });
};

// Obtener todas las órdenes (admin)
export const getAllOrders = async (
  page = 1,
  limit = 10
): Promise<PaginatedOrders> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No autenticado");
  }

  return tryAxiosRequest(async (baseUrl) => {
    try {
      const response = await axios.get(`${baseUrl}/orders/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page, limit },
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
  });
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

  return tryAxiosRequest(async (baseUrl) => {
    try {
      const response = await axios.put(
        `${baseUrl}/orders/${idOrders}/status`,
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
  });
};

// Obtener detalle de una orden por ID
export const getOrderDetails = async (
  idOrders: number
): Promise<OrderDetail[]> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No autenticado");
  }

  return tryAxiosRequest(async (baseUrl) => {
    try {
      const response = await axios.get(`${baseUrl}/orders/details/${idOrders}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      });

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(
          err.response?.data?.message || "Error al obtener el detalle de la orden"
        );
      }

      throw new Error("Error inesperado");
    }
  });
};
