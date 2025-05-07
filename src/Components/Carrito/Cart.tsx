import { CartActions } from "../../reducers";
import { ProductItem } from "../../types";
import { IoMdRemove, IoIosArrowBack } from "react-icons/io";
import { MdDeleteForever, MdOutlineAdd } from "react-icons/md";
import { useNavigation } from "../../hook";

type CartActionsProps = {
  cart: ProductItem[];
  dispatch: React.Dispatch<CartActions>;
};

export default function Cart({ cart, dispatch }: CartActionsProps) {
  const { gotToHome } = useNavigation();
  return (
    <div className="m-2 md:m-8">
      <div className="relative flex items-center w-full m-1 md:m-5">
        <button
          onClick={gotToHome}
          className="btn btn-circle absolute  left-0 btn-outline"
        >
          <IoIosArrowBack />
        </button>
        <h3 className="text-3xl font-bold mx-auto">Carrito</h3>
      </div>

      {cart.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 grid-rows-1 gap-4 place-items-center lg:place-items-start md:m-2  ">
          {cart.map((item, index) => {
            return (
              <div key={index} className="flex flex-col w-full h-full  sm:p-2 ">
                <div className=" flex rounded-badge shadow-lg">
                  <img
                    src="/Panaderia/Principal.jpeg"
                    alt={item.name}
                    className="w-28 sm:w-40 sm:h-full md:w-56 object-cover rounded"
                  />
                  <div className="flex  flex-col justify-center m-1 sm:m-2">
                    <h2 className="name text-center text-lg md:text-2xl text-accent font-bold">
                      {item.name}
                    </h2>
                    <p className="text-center text-sm sm:text-lg">
                      {item.description.slice(0, 40) + "..."}
                    </p>

                    <span className="font-bold ml-4 md:ml-8 2xl">
                      {item.price}
                    </span>
                  </div>
                  <div className="flex flex-col  w-56 h-full place-items-end ">
                    <div className="flex justify-between text-white p-3 sm:p-4 bg-secondary rounded-badge w-20 sm:w-36">
                      <button
                        onClick={() => {
                          dispatch({
                            type: "decreaseQuantity",
                            payload: { id: item.idProducts },
                          });
                        }}
                      >
                        <IoMdRemove />
                      </button>
                      <span className="text-sm sm:text-lg font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          dispatch({
                            type: "increaseQuantity",
                            payload: { id: item.idProducts },
                          });
                        }}
                      >
                        <MdOutlineAdd />
                      </button>
                    </div>

                    <div className=" flex-1 pleace-items-end flex justify-end">
                      <button
                        onClick={() => {
                          dispatch({
                            type: "remove-from-cart",
                            payload: { id: item.idProducts },
                          });
                        }}
                        className=" btn btn-circle self-end "
                      >
                        <MdDeleteForever className="text-2xl text-red-600 items-end" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center font-semibold text-lg">
          No hay Productos en el Carrito
        </p>
      )}
    </div>
  );
}
