import { useState, useEffect, useCallback } from "react";

const API_URLS = [
  "http://localhost:3000",
  "https://backendpanaderia-production.up.railway.app",
];

const getAuthToken = () => {
  return localStorage.getItem("token");
};

export default function useFetch<T>(
  path: string,
  requireAuth: boolean = false
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 🔥 NUEVO: trigger para forzar re-fetch
  const [trigger, setTrigger] = useState(0);

  // 🔥 NUEVO: función de refresh
  const refetch = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const token = getAuthToken();

      if (requireAuth && !token) {
        setError(new Error("Token de autenticación requerido"));
        setLoading(false);
        return;
      }

      for (const baseUrl of API_URLS) {
        try {
          const response = await fetch(`${baseUrl}${path}`, {
            headers: token
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
        } catch (err) {
          console.log(`Error con ${baseUrl}`, err);
        }
      }

      setError(new Error("Ningun servidor respondio"));
      setLoading(false);
    };

    fetchData();
  }, [path, requireAuth, trigger]); // 🔥 trigger agregado

  return { data, error, loading, refetch };
}
