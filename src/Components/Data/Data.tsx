import { useEffect, useState } from "react";
import type { Product } from "../../types";

export function useProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((response) => response.json())
      .then((products) => setProducts(products))
      .catch((error) => setError(error));
  }, []);

  return { products, error };
}
