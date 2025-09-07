import useFetch from "../hook/useFetch";
import useMutation from "../hook/useMutation";

// Obtener favoritos de un cliente
export const useFavorites = (requireAuth: boolean = true) => {
  const { data, error, loading } = useFetch("/favorites", requireAuth);
  return { data, error, loading };
};

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
