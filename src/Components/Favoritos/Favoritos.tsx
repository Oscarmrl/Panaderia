import ProductList from "../ui/ProductList";
import { useNavigation } from "../../hook";
import { useCart } from "../../hook/useCart";
import { useRemoveFavorite } from "../../services/favoriteService";

export default function Favoritos() {
  const { gotToHome } = useNavigation();
  const { state, dispatch } = useCart();

  // Hook para eliminar un favorito
  const { removeFavorite } = useRemoveFavorite();

  // Función para manejar la eliminación de favoritos
  const handleRemoveFavorite = async (productId: number) => {
    try {
      await removeFavorite(productId); // elimina en backend

      // Sincroniza estado local
      dispatch({
        type: "remove-from-favorite",
        payload: { id: productId },
      });
    } catch (error) {
      console.error("Error al eliminar favorito", error);
    }
  };

  return (
    <ProductList
      title="Favoritos" // Título de la lista de favoritos
      products={state.favorite} // Productos en favoritos
      dispatch={dispatch} // Dispatch para manejar acciones
      showQuantityControls={true} // No mostrar controles de cantidad
      showRemoveButton={true} // Mostrar botón de eliminar
      onBack={gotToHome} // Función para ir a la página principal
      removeActionType="remove-from-favorite" // Tipo de acción para eliminar favorito
      onRemoveFavorite={handleRemoveFavorite} // Función para manejar eliminación de favorito
    />
  );
}
