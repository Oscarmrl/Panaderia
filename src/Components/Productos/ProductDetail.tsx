import useNavigation from "../../hook/useNavigation";
import { useParams } from "react-router-dom";
import { useProduct } from "../Data/Data";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import Button from "../ui/Button";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineAdd } from "react-icons/md";
import { IoMdRemove } from "react-icons/io";
import { useCart } from "../../hook/useCart";
import { FormatCurrency } from "../../helpers";

export default function ProductDetail() {
  const { gotToHome, goToCart } = useNavigation();
  const { id } = useParams();
  const { products } = useProduct();
  const { state, dispatch } = useCart();

  const product = products.find((pro) => pro.idProducts.toString() === id);

  const productInCart = state.cart.find(
    (item) => item.idProducts === product?.idProducts
  );
  const isFavorite = state.favorite.some(
    (item) => item.idProducts === product?.idProducts
  );

  const quantity = productInCart ? productInCart.quantity : 1;

  <span>{quantity}</span>;

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
              isFavorite ? " bg-red-800 text-white" : " bg-base-200"
            }`}
            onClick={() => {
              if (isFavorite) {
                dispatch({
                  type: "remove-from-favorite",
                  payload: { id: product!.idProducts },
                });
              } else {
                dispatch({
                  type: "add-to-favorite",
                  payload: { item: product! },
                });
              }
            }}
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
            <div className="flex justify-between text-white  p-2 mr-2 bg-secondary rounded-badge w-24">
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
                  dispatch({
                    type: "increaseQuantity",
                    payload: { id: product!.idProducts },
                  });

                  if (
                    !state.cart.find(
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
                {FormatCurrency(productInCart.quantity * productInCart.price)}
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
