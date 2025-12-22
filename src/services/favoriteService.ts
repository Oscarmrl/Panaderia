import { Dispatch } from "react";
import useMutation from "../hook/useMutation";
import { CartActions } from "../reducers";

// Agregar un favorito
export const useAddFavorite = () => {
  const { mutate, loading, error, data } = useMutation();
  const addFavorite = (productId: number) => {
    return mutate("/favorites", "POST", { idProducts: productId }, true);
  };
  return { addFavorite, loading, error, data };
};

// Eliminar un favorito
export const useRemoveFavorite = () => {
  const { mutate, loading, error, data } = useMutation();
  const removeFavorite = (productId: number) => {
    return mutate(`/favorites/${productId}`, "DELETE", undefined, true);
  };
  return { removeFavorite, loading, error, data };
};

// Función utilitaria para sincronizar favoritos tras login
export async function fetchAndSyncFavorites(dispatch: Dispatch<CartActions>) {
  const token = localStorage.getItem("token");
  const API_URLS = [
    "https://backendpanaderia-production.up.railway.app",
    "http://localhost:3000",
  ];

  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(`${baseUrl}/favorites`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const favorites = await response.json();
        if (favorites && Array.isArray(favorites)) {
          localStorage.setItem("favorite", JSON.stringify(favorites));
          dispatch({ type: "initFavorite", payload: { favorite: favorites } });
        }
        return; // Salir del bucle si fue exitoso
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      continue; // Probar siguiente URL
    }
  }
}
