import axios from "axios";

const API_URL = "http://localhost:3000";

export const deleteProduct = async (
  id: number
): Promise<{ message: string }> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No autenticado");
  }

  try {
    const response = await axios.delete(`${API_URL}/productos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || "Error al eliminar el producto"
      );
    }

    throw new Error("Error inesperado");
  }
};

export const updateProduct = async (
  id: number,
  data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image?: string;
  }
): Promise<{ message: string; price_usd: number; price_hnl: number }> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No autenticado");
  }

  try {
    const response = await axios.put(`${API_URL}/productos/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || "Error al actualizar el producto"
      );
    }

    throw new Error("Error inesperado");
  }
};
