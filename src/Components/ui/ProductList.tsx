// src/components/ProductList.tsx

import { CartActions } from "../../reducers";
import { ProductItem } from "../../types";
import { IoMdRemove, IoIosArrowBack } from "react-icons/io";
import { MdDeleteForever, MdOutlineAdd } from "react-icons/md";
import { FormatCurrency } from "../../helpers";

type ProductListProps = {
  title?: string;
  products: ProductItem[];
  dispatch?: React.Dispatch<CartActions>;
  showQuantityControls?: boolean;
  showRemoveButton?: boolean;
  onBack?: () => void;
};

export default function ProductList({
  title = "Productos",
  products,
  dispatch,
  showQuantityControls = true,
  showRemoveButton = true,
  onBack,
}: ProductListProps) {
  return (
    <div className="m-2 md:m-8">
      <div className="relative flex items-center w-full m-1 md:m-5">
        {onBack && (
          <button
            onClick={onBack}
            className="btn btn-circle absolute left-0 btn-outline"
          >
            <IoIosArrowBack />
          </button>
        )}
        <h3 className="text-3xl font-bold mx-auto">{title}</h3>
      </div>

      {products.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 grid-rows-1 gap-4 place-items-center lg:place-items-end md:m-2">
          {products.map((item, index) => (
            <div key={index} className="flex flex-col w-full h-full sm:p-2">
              <div className="flex rounded-badge shadow-lg">
                <img
                  src="/Panaderia/Principal.jpeg"
                  alt={item.name}
                  className="w-28 sm:w-40 sm:h-full md:w-56 object-cover rounded"
                />
                <div className="flex flex-col justify-center m-1 sm:m-2">
                  <h2 className="name text-center text-lg md:text-2xl text-accent font-bold">
                    {item.name}
                  </h2>

                  <p className="text-center text-sm sm:hidden">
                    {item.description.slice(0, 45) +
                      (item.description.length > 40 ? "..." : "")}
                  </p>

                  <p className="hidden sm:block text-center text-sm sm:text-lg break-words">
                    {item.description}
                  </p>
                  <span className="font-bold ml-4 md:ml-8 2xl">
                    {FormatCurrency(item.price)}
                  </span>
                </div>

                <div className="flex flex-col w-56 h-full place-items-end flex-1">
                  {showQuantityControls && dispatch && (
                    <div className="flex justify-between text-white p-3 sm:p-4 bg-secondary rounded-badge w-20 sm:w-36">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "decreaseQuantity",
                            payload: { id: item.idProducts },
                          })
                        }
                      >
                        <IoMdRemove />
                      </button>
                      <span className="text-sm sm:text-lg font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: "increaseQuantity",
                            payload: { id: item.idProducts },
                          })
                        }
                      >
                        <MdOutlineAdd />
                      </button>
                    </div>
                  )}

                  {showRemoveButton && dispatch && (
                    <div className="flex-1 pleace-items-end flex justify-end">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "remove-from-cart",
                            payload: { id: item.idProducts },
                          })
                        }
                        className="btn btn-circle self-end"
                      >
                        <MdDeleteForever className="text-2xl text-red-600 items-end" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center font-semibold text-lg">
          No hay productos en la lista
        </p>
      )}
    </div>
  );
}
