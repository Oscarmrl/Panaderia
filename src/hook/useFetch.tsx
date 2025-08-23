import { useState, useEffect } from "react";

const API_URLS = [
  "https://backendpanaderia-production.up.railway.app",
  "http://localhost:3000",
];

export default function useFetch<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      for (const baseUrl of API_URLS) {
        try {
          const response = await fetch(`${baseUrl}${path}`);
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
  }, [path]);

  return { data, error, loading };
}
