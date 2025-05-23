import { FormatCurrency } from "../../helpers";
import PayPalButton from "./PayPalButton";
import { useState } from "react";
import { useCart } from "../../hook/useCart";

export default function Order() {
  const [showModal, setShowModal] = useState(false);
  const { state } = useCart();
  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalFormatted = FormatCurrency(total);

  return (
    <div className="m-2 md:m-8">
      <div className="relative flex items-center w-full m-1 md:m-5">
        <h3 className="text-3xl font-bold mx-auto">Ordenar</h3>
      </div>

      <div className="grid grid-cols-1 m-2 md:m-4 gap-4">
        <div className="flex-grow h-0.5 bg-primary relative">
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></span>
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></span>
        </div>

        {state.cart.length > 0 ? (
          <ul className="flex flex-col gap-2 md:gap-6">
            {state.cart.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex flex-row gap-2 md:gap-4 text-lg md:text-2xl font-semibold"
                >
                  <h4>{item.name} :</h4>
                  <span>{FormatCurrency(item.price * item.quantity)}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <h3 className="text-center font-semibold m-10 text-lg">
            Agregue productos para hacer una orden
          </h3>
        )}

        <div className="flex-grow h-0.5 bg-primary relative">
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></span>
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></span>
        </div>

        <div className="flex flex-row gap-2">
          <h3 className="text-2xl font-bold">total :</h3>
          <span className="text-2xl font-bold">{totalFormatted}</span>
        </div>

        <button
          className={`btn rounded-badge btn-outline w-full mb-28 md:mb-3 text-xl font-bold disabled:opacity-45`}
          disabled={state.cart.length === 0}
          onClick={() => setShowModal(true)}
        >
          Ordenar ya
        </button>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-base-100 p-4 md:p-6 rounded-xl w-[90%] md:w-[40%] relative shadow-lg max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-4 mb-10 justify-center ">
                <button
                  className=" btn bg-red-600 absolute top-2 right-2 lg:right-4 text-xl font-bold"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
                <h2 className=" text-sm lg:text-xl text-accent font-bold ">
                  Seleccione su metodo de pago
                </h2>
              </div>

              <ul className="mb-2 font-semibold text-sm md:text-xl">
                {state.cart.map((item) => (
                  <li key={item.name}>
                    {item.name} × {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
                <li className="font-bold">Total = {totalFormatted}</li>
              </ul>

              <PayPalButton cart={state.cart} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
