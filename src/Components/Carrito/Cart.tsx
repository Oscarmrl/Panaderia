// src/components/Cart.tsx

import { useCart } from "../../hook/useCart";
import { useNavigation } from "../../hook";
import ProductList from "../ui/ProductList";

export default function Cart() {
  const { gotToHome } = useNavigation();
  const { state, dispatch } = useCart();

  return (
    <ProductList
      title="Carrito"
      products={state.cart}
      dispatch={dispatch}
      showQuantityControls={true}
      showRemoveButton={true}
      onBack={gotToHome}
    />
  );
}
