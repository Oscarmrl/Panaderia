import { PayPalButtons } from "@paypal/react-paypal-js";
import { ProductItem } from "../../types";

type PayPalButtonProps = {
  cart: ProductItem[];
};

function calcularTotal(cart: ProductItem[]): string {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return total.toFixed(2); // PayPal espera string con 2 decimales
}

export default function PayPalButton({ cart }: PayPalButtonProps) {
  if (cart.length === 0) return null;

  return (
    <div className="">
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(_data, actions) => {
          try {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    value: calcularTotal(cart),
                    currency_code: "USD",
                  },
                },
              ],
            });
          } catch (err) {
            console.error("Error al crear la orden de PayPal:", err);
            return Promise.reject(err);
          }
        }}
        onApprove={async (_data, actions) => {
          if (!actions.order) {
            console.error("No se pudo acceder a actions.order");
            return Promise.resolve(); // ✅ devuelve una Promise vacía
          }

          return actions.order.capture().then((details) => {
            alert(
              `Pago completado por ${details.payer?.name?.given_name || "cliente"}`
            );
            // Lógica extra como limpiar el carrito
          });
        }}
      />
    </div>
  );
}
