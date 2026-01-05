import { FormatCurrency } from "../../helpers";
import { useState } from "react";
import { useCart } from "../../hook/useCart";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { createPayPalOrder, capturePayPalOrder } from "../../services/paypal";
import { ProductItem } from "../../types";
import toast from "react-hot-toast";

export default function Order() {
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { state, dispatch } = useCart();

  const total = state.cart.reduce(
    (sum: number, item: ProductItem) => sum + item.price_hnl * item.quantity,
    0
  );

  const totalFormatted = FormatCurrency(total);

  const idClient = parseInt(localStorage.getItem("idClient") || "0");

  if (!idClient || idClient === 0) {
    return (
      <div className="m-2 md:m-8">
        <div className="relative flex items-center w-full m-1 md:m-5">
          <h3 className="text-3xl font-bold mx-auto">Ordenar</h3>
        </div>

        <div className="alert alert-warning shadow-lg mt-8">
          <div>
            <h3 className="font-bold">¡Atención!</h3>
            <p className="text-sm">
              Debes iniciar sesión para realizar una orden.
            </p>
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
        <div className="h-0.5 bg-primary"></div>

        {state.cart.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {state.cart.map((item: ProductItem, index: number) => (
              <li
                key={index}
                className="flex justify-between text-lg md:text-xl font-semibold"
              >
                <span>{item.name}</span>
                <span>{FormatCurrency(item.price_hnl * item.quantity)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <h3 className="text-center font-semibold m-10 text-lg">
            Agregue productos para hacer una orden
          </h3>
        )}

        <div className="h-0.5 bg-primary"></div>

        <div className="flex justify-between text-2xl font-bold">
          <span>Total</span>
          <span>{totalFormatted}</span>
        </div>

        <button
          className="btn btn-outline rounded-badge w-full mb-24 md:mb-3 text-xl font-bold disabled:opacity-40"
          disabled={state.cart.length === 0}
          onClick={() => setShowModal(true)}
        >
          Ordenar ya
        </button>

        {/* ================= MODAL ================= */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div
              className="bg-base-100 p-5 md:p-8 rounded-2xl w-[95%] sm:w-[85%] md:w-[45%] lg:w-[35%]
              shadow-2xl max-h-[80vh] overflow-y-auto relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5 border-b pb-3">
                <h2 className="text-lg md:text-2xl font-bold text-accent">
                  Método de pago
                </h2>

                <button
                  className="btn btn-circle btn-sm bg-error text-white"
                  onClick={() => setShowModal(false)}
                  disabled={isProcessing}
                >
                  ✕
                </button>
              </div>

              {/* Resumen */}
              <div className="bg-base-200 rounded-xl p-4 mb-5">
                <h3 className="font-bold mb-2 text-sm md:text-lg">
                  Resumen de la orden
                </h3>

                <ul className="space-y-1 text-sm md:text-base">
                  {state.cart.map((item: ProductItem) => (
                    <li key={item.name} className="flex justify-between">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold">
                        {FormatCurrency(item.price_hnl * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="divider my-2"></div>

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{totalFormatted}</span>
                </div>
              </div>

              {/* Loader */}
              {isProcessing && (
                <div className="flex flex-col items-center gap-2 my-4">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <p className="text-sm font-medium">Procesando pago...</p>
                </div>
              )}

              <div className="divider my-4">Pagar con</div>

              <PayPalButtons
                style={{ layout: "vertical" }}
                disabled={isProcessing}
                createOrder={async () => {
                  const orderID = await createPayPalOrder(state.cart, idClient);
                  return orderID;
                }}
                onApprove={async (data) => {
                  setIsProcessing(true);
                  try {
                    const response = await capturePayPalOrder(
                      data.orderID,
                      state.cart,
                      idClient
                    );

                    toast.success(`¡Pago realizado con éxito!`);

                    dispatch({ type: "clearCart" });
                    setShowModal(false);
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setIsProcessing(false);
                  }
                }}
                onCancel={() => toast.error("Pago cancelado")}
                onError={() => {
                  toast.error("Error en el pago. Intente nuevamente.");
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
