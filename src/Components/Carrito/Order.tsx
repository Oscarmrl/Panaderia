import { ProductItem } from "../../types";

type OrderProps = {
  cart: ProductItem[];
};

export default function Order({ cart }: OrderProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
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

        {cart.length > 0 ? (
          <div className="flex flex-col gap-2 md:gap-6">
            {cart.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row gap-2 md:gap-4 text-lg md:text-2xl font-semibold"
                >
                  <h4>{item.name} :</h4>
                  <span>{item.price * item.quantity} Lps</span>
                </div>
              );
            })}
          </div>
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
          <span className="text-2xl font-bold">{total}</span>
        </div>

        <button className="btn rounded-badge btn-outline w-full  mb-24 md:mb-5 text-xl font-bold">
          Ordenar ya
        </button>
      </div>
    </div>
  );
}
