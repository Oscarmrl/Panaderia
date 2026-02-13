import axios from "axios";
import type { ClientProfile } from "../types";

const API_URLS = [
  "http://localhost:3000",
  "https://backendpanaderia-production.up.railway.app",
];

export async function getProfile(idClient: number): Promise<ClientProfile> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No autenticado");
  }

  let lastError: Error | null = null;

  for (const baseUrl of API_URLS) {
    try {
      const response = await axios.get(`${baseUrl}/clients/${idClient}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Si el endpoint no existe (404), podríamos intentar otro endpoint
        if (error.response?.status === 404) {
          // Intentar endpoint alternativo /profile
          try {
            const responseAlt = await axios.get(`${baseUrl}/profile`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              timeout: 10000,
            });
            return responseAlt.data;
          } catch (altError) {
            lastError =
              altError instanceof Error
                ? altError
                : new Error(String(altError));
            continue;
          }
        }
        lastError = error;
      } else {
        lastError = error instanceof Error ? error : new Error(String(error));
      }
      continue;
    }
  }

  throw lastError || new Error("No se pudo conectar con el servidor");
}

export async function updateProfile(
  idClient: number,
  data: Partial<ClientProfile>,
): Promise<{ message: string }> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No autenticado");
  }

  let lastError: Error | null = null;

  for (const baseUrl of API_URLS) {
    try {
      const response = await axios.put(`${baseUrl}/clients/${idClient}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          // Intentar endpoint alternativo /profile
          try {
            const responseAlt = await axios.put(`${baseUrl}/profile`, data, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              timeout: 10000,
            });
            return responseAlt.data;
          } catch (altError) {
            lastError =
              altError instanceof Error
                ? altError
                : new Error(String(altError));
            continue;
          }
        }
        lastError = error;
      } else {
        lastError = error instanceof Error ? error : new Error(String(error));
      }
      continue;
    }
  }

  throw lastError || new Error("No se pudo conectar con el servidor");
}

export async function isProfileComplete(idClient: number): Promise<boolean> {
  try {
    const profile = await getProfile(idClient);
    return !!profile.phone && profile.phone.trim() !== "";
  } catch {
    // Si no se puede obtener el perfil, asumimos que no está completo
    return false;
  }
}
