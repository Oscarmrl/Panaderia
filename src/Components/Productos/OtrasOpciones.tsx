import { ProductItem } from "../../types";
import { CartActions } from "../../reducers/compras-Reducers";
import { useParams } from "react-router-dom";
import { useProduct } from "../Data/Data";

type OtrasOpcionesProps = {
  cart: ProductItem[];
  dispatch: React.Dispatch<CartActions>;
};

export default function OtrasOpciones({ cart, dispatch }: OtrasOpcionesProps) {
  const { id } = useParams();
  const { products } = useProduct();

  // Buscar el producto actual para excluirlo
  const currentProduct = products.find((p) => p.idProducts.toString() === id);

  if (!products || !currentProduct) return null;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">También te podría interesar:</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products
          .filter((p) => p.idProducts !== currentProduct.idProducts)
          .slice(0, 3)
          .map((recommended) => (
            <div key={recommended.idProducts} className="border rounded p-4">
              <img
                src="/Panaderia/Principal.jpeg"
                alt={recommended.name}
                className="w-full h-40 object-cover rounded"
              />
              <h4 className="text-lg font-semibold mt-2">{recommended.name}</h4>
              <p className="text-sm text-gray-600">
                {recommended.description.slice(0, 60)}...
              </p>
              <span className="font-bold block mt-1">{`L${recommended.price}`}</span>
              <div className="flex gap-2 mt-2">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    window.location.href = `/Panaderia/product/${recommended.idProducts}`;
                  }}
                >
                  Ver más
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    // Evita agregar duplicados
                    const yaEnCarrito = cart.find(
                      (item) => item.idProducts === recommended.idProducts
                    );
                    if (!yaEnCarrito) {
                      dispatch({
                        type: "add-to-cart",
                        payload: { item: recommended },
                      });
                    }
                  }}
                >
                  Agregar
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
