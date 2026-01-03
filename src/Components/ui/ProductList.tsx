import { CartActions } from "../../reducers/Compras-Reducers";
import { Product, ProductItem } from "../../types";
import { IoMdRemove, IoIosArrowBack } from "react-icons/io";
import { MdDeleteForever, MdOutlineAdd } from "react-icons/md";
import { FormatCurrency } from "../../helpers";
import { useCart } from "../../hook/useCart";
import { useNavigation } from "../../hook";

// Props para el componente ProductList
type ProductListProps = {
  title?: string;
  products: ProductItem[] | Product[];
  dispatch?: React.Dispatch<CartActions>;
  showQuantityControls?: boolean; // Muestra los controles de cantidad
  showRemoveButton?: boolean; // Muestra el botón de eliminar
  onBack?: () => void; // Función para manejar el botón de volver
  removeActionType?: "remove-from-cart" | "remove-from-favorite"; // Tipo de acción para eliminar
  onRemoveFavorite?: (productId: number) => void; // Función para manejar la eliminación de favoritos
};

// Componente ProductList
export default function ProductList({
  title = "Productos",
  products,
  showQuantityControls = true,
  showRemoveButton = true,
  onBack,
  removeActionType = "remove-from-cart",
  onRemoveFavorite,
}: ProductListProps) {
  // Obtener el estado del carrito
  const { dispatch } = useCart();
  const { goToAdd } = useNavigation();

  // Función para verificar si un producto tiene cantidad
  function hasQuantity(product: Product | ProductItem): product is ProductItem {
    // Verifica si el producto tiene una cantidad definida
    return (product as ProductItem).quantity !== undefined;
  }

  // Función para navegar al detalle del producto
  const handleProductClick = (productId: number) => {
    goToAdd(productId.toString());
  };

  return (
    <div className="m-5 md:m-8">
      <div className="relative flex  items-center w-full m-1 md:m-5">
        {/*Botón para volver */}
        {onBack && (
          <button
            onClick={onBack}
            className="btn btn-circle absolute left-0 btn-outline"
          >
            <IoIosArrowBack />
          </button>
        )}
        {/*Título de la lista de productos */}
        <h3 className="text-3xl font-bold mx-auto">{title}</h3>
      </div>
      {products.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-4 place-items-center xs:m-2">
          {products.map((item, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-wrap w-full h-full sm:p-2"
            >
              <div
                className="flex rounded-badge shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => handleProductClick(item.idProducts)}
              >
                <img
                  src={item.image ? item.image : "/Panaderia/Principal.jpeg"}
                  alt={item.name}
                  className="w-28 sm:w-40 sm:h-full lg:w-56 object-cover rounded"
                />
                <div className="flex flex-col justify-center m-1 sm:m-2">
                  <h2 className="name text-center text-lg md:text-2xl text-accent font-bold">
                    {item.name}
                  </h2>

                  <p className="text-center text-sm sm:hidden">
                    {item.description?.slice(0, 45) +
                      (item.description && item.description.length > 40
                        ? "..."
                        : "")}
                  </p>

                  <p className="hidden sm:block text-center text-sm sm:text-lg break-words">
                    {item.description}
                  </p>
                  <span className="font-bold ml-4 md:ml-8 2xl">
                    {FormatCurrency(item.price_hnl)}
                  </span>
                </div>

                <div className="flex flex-col w-56 h-full place-items-end flex-1">
                  {/*Controles de cantidad */}
                  {showQuantityControls && hasQuantity(item) && dispatch && (
                    <div className="flex justify-between text-white p-3 sm:p-4 bg-secondary rounded-badge w-20 sm:w-36">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Evitar que se dispare el click del producto
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
                        onClick={(e) => {
                          e.stopPropagation(); // Evitar que se dispare el click del producto
                          dispatch({
                            type: "increaseQuantity",
                            payload: { id: item.idProducts },
                          });
                        }}
                      >
                        <MdOutlineAdd />
                      </button>
                    </div>
                  )}
                  {/* Botón para eliminar */}
                  {showRemoveButton && (
                    <div className="flex-1 pleace-items-end flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Evitar que se dispare el click del producto
                          if (
                            removeActionType === "remove-from-favorite" && // Verifica si la acción es eliminar de favoritos
                            onRemoveFavorite
                          ) {
                            onRemoveFavorite(Number(item.idProducts));
                          } else if (dispatch) {
                            // Verifica si hay un despachador disponible
                            dispatch({
                              type: removeActionType,
                              payload: { id: item.idProducts },
                            });
                          }
                        }}
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
