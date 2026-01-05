import axios from "axios";
import type { DashboardSummary, SalesByDay, TopProduct } from "../types";

const API_URL = "http://localhost:3000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No autenticado");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

/* =====================================================
   SERVICES
===================================================== */

// 📊 Resumen general (cards)
export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  try {
    const response = await axios.get(`${API_URL}/dashboard-summary`, {
      headers: getAuthHeaders(),
      timeout: 10000,
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        throw new Error("No tienes permisos para ver el dashboard");
      }

      throw new Error(
        err.response?.data?.message || "Error al obtener resumen del dashboard"
      );
    }

    throw new Error("Error inesperado");
  }
};

// 📈 Ventas por día
export const getSalesByDay = async (): Promise<SalesByDay[]> => {
  try {
    const response = await axios.get(`${API_URL}/sales-by-day`, {
      headers: getAuthHeaders(),
      timeout: 10000,
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || "Error al obtener ventas por día"
      );
    }

    throw new Error("Error inesperado");
  }
};

// 🏆 Top productos vendidos
export const getTopProducts = async (): Promise<TopProduct[]> => {
  try {
    const response = await axios.get(`${API_URL}/top-products`, {
      headers: getAuthHeaders(),
      timeout: 10000,
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || "Error al obtener productos más vendidos"
      );
    }

    throw new Error("Error inesperado");
  }
};
