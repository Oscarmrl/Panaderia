import axios from "axios";

const API_URL = "http://localhost:3000";

export const deleteProduct = async (
  id: number
): Promise<{ message: string }> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No autenticado");
  }

  const response = await axios.delete(`${API_URL}/productos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
