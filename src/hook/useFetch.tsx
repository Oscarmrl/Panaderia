import { useState, useEffect } from "react";

// Lista de URLs de backend para intentar
const API_URLS = [
  "https://backendpanaderia-production.up.railway.app",
  "http://localhost:3000",
];
// Función para obtener el token
const getAuthToken = () => {
  return localStorage.getItem("token"); // Asegúrate que tu login guarde aquí el accessToken
};

// Hook personalizado para fetch (GET)
export default function useFetch<T>(
  path: string, // Ruta del endpoint
  requireAuth: boolean = false // Indica si se requiere autenticación
) {
  const [data, setData] = useState<T | null>(null); // Estado de datos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<Error | null>(null); // Estado de error

  // Efecto para realizar el fetch al montar el componente o cambiar la ruta
  useEffect(() => {
    const fetchData = async () => {
      const token = getAuthToken(); // Obtener token de autenticación

      // Si requiere autenticación y no hay token
      if (requireAuth && !token) {
        setError(new Error("Token de autenticación requerido"));
        setLoading(false);
        return;
      }
      // Intentar cada URL en la lista hasta que una funcione
      for (const baseUrl of API_URLS) {
        try {
          // Realizar la solicitud fetch
          const response = await fetch(`${baseUrl}${path}`, {
            headers: token // Si hay token, incluir Authorization
              ? {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                }
              : {
                  "Content-Type": "application/json",
                },
          });

          if (!response.ok) {
            throw new Error(`${baseUrl} caido`);
          }

          const jsonData = await response.json();
          setData(jsonData);
          setLoading(false);
          return;
        } catch (error) {
          console.log(`Error con ${baseUrl}`, error);
        }
      }
      setError(new Error("Ningun servidor respondio"));
      setLoading(false);
    };

    fetchData();
  }, [path, requireAuth]); // Re-ejecutar si cambia la ruta o el requireAuth

  return { data, error, loading }; // Retornar datos, error y estado de carga
}
