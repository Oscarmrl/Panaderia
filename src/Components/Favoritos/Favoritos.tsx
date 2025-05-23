// src/components/Favoritos.tsx
import ProductList from "../ui/ProductList";
import { useNavigation } from "../../hook";
import { useCart } from "../../hook/useCart";

export default function Favoritos() {
  const { gotToHome } = useNavigation();
  const { state, dispatch } = useCart();

  return (
    <ProductList
      title="Favoritos"
      products={state.cart}
      dispatch={dispatch}
      showQuantityControls={false}
      showRemoveButton={true}
      onBack={gotToHome}
    />
  );
}
