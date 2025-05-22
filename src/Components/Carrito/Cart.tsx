// src/components/Cart.tsx

import { CartActions } from "../../reducers";
import { ProductItem } from "../../types";
import { useNavigation } from "../../hook";
import ProductList from "../ui/ProductList";

type CartActionsProps = {
  cart: ProductItem[];
  dispatch: React.Dispatch<CartActions>;
};

export default function Cart({ cart, dispatch }: CartActionsProps) {
  const { gotToHome } = useNavigation();

  return (
    <ProductList
      title="Carrito"
      products={cart}
      dispatch={dispatch}
      showQuantityControls={true}
      showRemoveButton={true}
      onBack={gotToHome}
    />
  );
}
