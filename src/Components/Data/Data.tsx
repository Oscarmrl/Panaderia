import useFetch from "../../hook/useFetch";
import type { Product } from "../../types";

export function useProduct() {
  const { data, error, loading, refetch } = useFetch<Product[]>("/productos");

  return {
    products: data ?? [],
    error,
    loading,
    refetchProducts: refetch,
  };
}
