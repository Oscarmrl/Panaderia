import { FormatCurrency } from "../../helpers";
import { useState } from "react";
import { useCart } from "../../hook/useCart";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { createPayPalOrder, capturePayPalOrder } from "../../services/paypal";
import { ProductItem } from "../../types";

export default function Order() {
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { state, dispatch } = useCart();

  const total = state.cart.reduce(
    (sum: number, item: ProductItem) => sum + item.price * item.quantity,
    0
  );
  const totalFormatted = FormatCurrency(total);

  // ✅ Obtener idClient desde localStorage de forma dinámica
  const idClient = parseInt(localStorage.getItem("idClient") || "0");

  // ✅ Si el usuario no tiene idClient, mostrar mensaje
  if (!idClient || idClient === 0) {
    return (
      <div className="m-2 md:m-8">
        <div className="relative flex items-center w-full m-1 md:m-5">
          <h3 className="text-3xl font-bold mx-auto">Ordenar</h3>
        </div>
        <div className="alert alert-warning shadow-lg mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <h3 className="font-bold">¡Atención!</h3>
            <div className="text-xs">
              Debes iniciar sesión para realizar una orden.
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            {state.cart.map((item: ProductItem, index: number) => {
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
                  className="btn bg-red-600 absolute top-2 right-2 lg:right-4 text-xl font-bold"
                  onClick={() => setShowModal(false)}
                  disabled={isProcessing}
                >
                  ×
                </button>
                <h2 className="text-sm lg:text-xl text-accent font-bold">
                  Seleccione su metodo de pago
                </h2>
              </div>

              <ul className="mb-2 font-semibold text-sm md:text-xl">
                {state.cart.map((item: ProductItem) => (
                  <li key={item.name}>
                    {item.name} × {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
                <li className="font-bold">Total = {totalFormatted}</li>
              </ul>

              {isProcessing && (
                <div className="text-center mb-4">
                  <span className="loading loading-spinner loading-lg"></span>
                  <p className="mt-2">Procesando pago...</p>
                </div>
              )}

              <PayPalButtons
                style={{ layout: "vertical" }}
                disabled={isProcessing}
                createOrder={async () => {
                  try {
                    const orderID = await createPayPalOrder(state.cart);
                    return orderID;
                  } catch (error) {
                    console.error("Error creando orden:", error);
                    throw error;
                  }
                }}
                onApprove={async (data) => {
                  setIsProcessing(true);
                  try {
                    const response = await capturePayPalOrder(
                      data.orderID,
                      state.cart,
                      idClient
                    );

                    alert(
                      `¡Pago realizado con éxito! 🎉\nOrden #${response.orderId}`
                    );
                    // Limpiar carrito después del pago exitoso
                    dispatch({ type: "clearCart" });

                    setShowModal(false);
                  } catch (error) {
                    console.error("Error capturando pago:", error);
                  } finally {
                    setIsProcessing(false);
                  }
                }}
                onCancel={() => {
                  console.log("Pago cancelado por el usuario");
                  alert("Pago cancelado");
                }}
                onError={(err) => {
                  console.error("Error de PayPal:", err);
                  alert("Error en el pago. Por favor intente nuevamente.");
                  setIsProcessing(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
