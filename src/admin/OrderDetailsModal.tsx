import { FormatCurrency } from "../helpers";

import { OrderDetail } from "../types";

type OrderDetailsModalProps = {
  orderId: number;
  orderDetails: OrderDetail[];
  loading: boolean;
  onClose: () => void;
};

export default function OrderDetailsModal({
  orderId,
  orderDetails,
  loading,
  onClose,
}: OrderDetailsModalProps) {
  const total = orderDetails.reduce(
    (sum, item) => sum + Number(item.subtotal ?? 0),
    0
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-100 p-5 md:p-8 rounded-2xl w-[90%] sm:w-[70%] md:w-[50%] shadow-2xl max-h-[80vh] overflow-y-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-5 border-b pb-3">
          <h2 className="text-lg md:text-2xl font-bold text-accent">
            Detalles de la orden #{orderId}
          </h2>
          <button
            className="btn btn-circle btn-sm bg-error text-white"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center my-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            <ul className="space-y-2">
              {orderDetails.map((item) => (
                <li
                  key={item.idOrder_Details}
                  className="flex justify-between border-b pb-1 items-center"
                >
                  <div className="flex items-center gap-2">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <span className="font-semibold">{item.name}</span> ×{" "}
                    {item.amount}
                  </div>
                  <div className="flex gap-2">
                     <span className="font-bold">{FormatCurrency(item.subtotal)}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="divider my-2"></div>
            <div className="text-right font-bold text-xl">
               Total: {FormatCurrency(total)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
