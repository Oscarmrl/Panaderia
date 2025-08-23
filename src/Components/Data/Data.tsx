import useFetch from "../../hook/useFetch";
import type { Product } from "../../types";

export function useProduct() {
  const { data, error, loading } = useFetch<Product[]>("/productos");
  return { products: data ?? [], error, loading };
}
