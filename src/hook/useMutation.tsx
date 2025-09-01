import { useState } from "react";
export default function useMutation<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  // Función para realizar la mutación
  const mutate = async (
    url: string,
    method: string,
    body?: Record<string, string | number | boolean | null>
  ) => {
    setLoading(true); // Indicamos que la mutacion esta en curso
    setError(null); // Reiniciamos el estado de error
    try {
      // Realizamos la petición
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
        // Incluimos las cookies en la petición
        credentials: "include",
      });

      const result = await response.json(); // Parseamos la respuesta JSON

      if (!response.ok) {
        // Lanzamos un error con el mensaje que viene del backend
        const error = new Error(result.message || "Error en la petición");
        setError(error);
        setLoading(false);
        throw error;
      } // Si todo va bien, guardamos los datos
      setData(result);
      // quitamos el loading
      setLoading(false);
      return result;
    } catch (error) {
      // Manejamos el error
      setError(error as Error);
      setLoading(false);
      throw error;
    }
  };
  return { mutate, loading, error, data }; // Retornamos la funcion mutate y sus estados
}
