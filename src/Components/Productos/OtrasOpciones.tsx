import { ProductItem } from "../../types";
import { CartActions } from "../../reducers";
import { useParams } from "react-router-dom";
import { useProduct } from "../Data/Data";
import useNavigation from "../../hook/useNavigation";

type OtrasOpcionesProps = {
  cart: ProductItem[];
  dispatch: React.Dispatch<CartActions>;
};

export default function OtrasOpciones({ cart, dispatch }: OtrasOpcionesProps) {
  const { goToAdd } = useNavigation();
  const { id } = useParams();
  const { products } = useProduct();

  const currentProduct = products.find((p) => p.idProducts.toString() === id);

  if (!products || !currentProduct) return null;

  return (
    <div className="m-5 md:m-10">
      <h3 className="text-2xl text-accent font-bold mb-4">
        También te podría interesar:
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {products
          .filter((p) => p.idProducts !== currentProduct.idProducts)
          .slice(0, 3)
          .map((product) => (
            <div
              key={product.idProducts}
              className="rounded-badge bg-base-100  p-4 hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src="/Panaderia/Principal.jpeg"
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h4 className="text-lg text-accent font-semibold mt-2">
                {product.name}
              </h4>
              <p className="text-lg">{product.description.slice(0, 60)}...</p>
              <span className="font-bold block mt-1">{`L${product.price}`}</span>
              <div className="flex gap-4 mt-2 ">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    goToAdd(product.idProducts.toString());
                  }}
                >
                  Ver Producto
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    dispatch({
                      type: "increaseQuantity",
                      payload: { id: product.idProducts },
                    });

                    if (
                      !cart.find(
                        (item) => item.idProducts === product!.idProducts
                      )
                    ) {
                      dispatch({
                        type: "add-to-cart",
                        payload: { item: product! },
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
