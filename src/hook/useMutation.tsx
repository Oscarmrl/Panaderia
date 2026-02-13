import { useState } from "react";

// Lista de URLs de backend para intentar
const API_URLS = [
  "http://localhost:3000",
  "https://backendpanaderia-production.up.railway.app",
];

// Hook personalizado para mutaciones (POST, PUT, DELETE)
export default function useMutation<T>() {
  const [data, setData] = useState<T | null>(null); // Estado de datos
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState<Error | null>(null); // Estado de error

  const getAuthToken = () => localStorage.getItem("token"); // Obtener token de autenticación

  const mutate = async (
    path: string, // Ruta del endpoint
    method: string, // Método HTTP
    body?: Record<string, string | number | boolean | null>, // Cuerpo de la solicitud
    requireAuth: boolean = false // Indica si se requiere autenticación
  ) => {
    setLoading(true); // Iniciar carga
    setError(null); // Resetear error

    const token = getAuthToken(); // Llamar a la función para obtener el token
    // Verificar si se requiere autenticación y si el token está ausente
    if (requireAuth && !token) {
      const err = new Error("Token de autenticación requerido");
      setError(err);
      setLoading(false);
      return;
    }

    // Configurar encabezados de la solicitud
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // Intentar cada URL en la lista hasta que una funcione
    for (const baseUrl of API_URLS) {
      try {
        // Realizar la solicitud fetch
        const response = await fetch(`${baseUrl}${path}`, {
          method, // Método HTTP
          headers, // Encabezados
          body: body ? JSON.stringify(body) : undefined, // Cuerpo de la solicitud
          credentials: "include", // Incluir cookies
        });

        // Intentar parsear la respuesta JSON
        const result = await response.json();

        // Si la respuesta no es OK, lanzar un error
        if (!response.ok) {
          throw new Error(result.message || `${baseUrl} fallo`);
        }

        setData(result);
        setLoading(false);
        return result;
      } catch (err) {
        console.log(`Error con ${baseUrl}`, err);
      }
    }

    setError(new Error("Ningún servidor respondió"));
    setLoading(false);
  };

  // Retornar la función mutate y los estados
  return { mutate, loading, error, data };
}
