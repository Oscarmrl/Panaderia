import { useEffect, useState } from "react";
import type { Product } from "../../types";

export default function Data() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProductos = async () => {
    try {
      const response = await fetch("http://localhost:3000/productos");

      if (!response.ok) {
        throw new Error("Error al obtener los datos del servidor");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("Error al obtener los Productos", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);
  return { products };
}
