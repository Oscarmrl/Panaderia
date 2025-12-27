import useNavigation from "../../hook/useNavigation";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import Button from "../ui/Button";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineAdd } from "react-icons/md";
import { IoMdRemove } from "react-icons/io";
import { useCart } from "../../hook/useCart";
import { FormatCurrency } from "../../helpers";
import { Product } from "../../types";
import {
  useAddFavorite,
  useRemoveFavorite,
} from "../../services/favoriteService";
import useMutation from "../../hook/useMutation";

export default function ProductDetail() {
  const { id } = useParams();
  const { state, dispatch } = useCart();
  const { gotToHome, goToCart, gotoLogin } = useNavigation();

  // Hook para traer el producto
  const { mutate: fetchProduct, data: product } = useMutation<Product>();

  // Hooks de favoritos

  const { addFavorite } = useAddFavorite();
  const { removeFavorite } = useRemoveFavorite();

  // Traer el producto al cargar la página
  useEffect(() => {
    if (id) {
      fetchProduct(`/productos/${id}`, "GET");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Determinar si el producto está en favoritos (usando estado global)
  const isFavorite = state.favorite.some(
    (item) => item.idProducts === product?.idProducts
  );

  // Determinar cantidad en carrito
  const productInCart = state.cart.find(
    (item) => item.idProducts === product?.idProducts
  );
  const quantity = productInCart ? productInCart.quantity : 1;

  // Manejo del click en favorito
  const handleFavorite = async () => {
    // Verificar si el usuario está logueado
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) return gotoLogin();

    try {
      // Si ya es favorito, eliminarlo; si no, agregarlo
      if (isFavorite) {
        await removeFavorite(product!.idProducts);
        dispatch({
          type: "remove-from-favorite",
          payload: { id: product!.idProducts },
        });
      } else {
        await addFavorite(product!.idProducts);
        dispatch({
          type: "add-to-favorite",
          payload: { item: product! },
        });
      }
    } catch (error) {
      console.error("Error al actualizar favoritos", error);
    }
  };

  return (
    <div className="lg:flex lg:justify-center">
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative">
          <img
            className="w-full h-auto object-cover rounded-lg"
            src="/Panaderia/Principal.jpeg"
            alt="Product Image"
          />

          <Button
            className="btn btn-circle w-12 absolute left-4 inset-y-1/2 top-9"
            onClick={gotToHome}
          >
            <IoIosArrowBack />
          </Button>

          <Button
            className={`btn-circle w-12 h-12 flex items-center justify-center absolute transition-colors duration-400 ease-in-out right-4 inset-y-1/2 top-9 ${
              isFavorite ? "bg-red-800 text-white" : "bg-base-200"
            }`}
            onClick={handleFavorite}
          >
            <MdOutlineFavoriteBorder />
          </Button>
        </div>
      </div>

      <div className="w-full lg:w-2/3 lg:mt-10">
        <div className="w-full grid grid-cols-2">
          <h2 className="text-2xl md:text-4xl m-2 font-bold text-accent col-span-1 lg:col-span-2">
            {product?.name}
          </h2>

          <div className="flex flex-col justify-start items-end lg:items-start m-2 lg:col-span-2 lg:row-start-3">
            <div className="flex justify-between text-white p-2 mr-2 bg-secondary rounded-badge w-24">
              <Button
                onClick={() =>
                  dispatch({
                    type: "decreaseQuantity",
                    payload: { id: product!.idProducts },
                  })
                }
              >
                <IoMdRemove />
              </Button>
              <span>{quantity}</span>
              <Button
                onClick={() => {
                  const loggedIn = localStorage.getItem("loggedIn") === "true";
                  if (!loggedIn) return gotoLogin();

                  dispatch({
                    type: "increaseQuantity",
                    payload: { id: product!.idProducts },
                  });

                  if (!productInCart) {
                    dispatch({
                      type: "add-to-cart",
                      payload: { item: product! },
                    });
                  }
                }}
              >
                <MdOutlineAdd />
              </Button>
            </div>
          </div>

          <p className="text-lg m-2 col-span-2 col-start-1 row-start-2">
            {product?.description}
          </p>
        </div>

        {productInCart && (
          <div className="w-full grid grid-cols-2 p-2 md:mt-5">
            <div className="col-start-1 flex flex-col justify-center">
              <h3 className="text-sm">Sub total</h3>
              <span className="font-bold text-2xl">
                {FormatCurrency(
                  productInCart.quantity * productInCart.price_hnl
                )}
              </span>
            </div>
            <button
              className="btn btn-outline col-start-2 text-1xl"
              onClick={goToCart}
            >
              ver carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
