// src/components/Favoritos.tsx
import ProductList from "../ui/ProductList";
import { useNavigation } from "../../hook";
import { ProductItem } from "../../types";
import { CartActions } from "../../reducers";

type FavoritosProps = {
  favoritos: ProductItem[];
  dispatch: React.Dispatch<CartActions>;
};

export default function Favoritos({ favoritos, dispatch }: FavoritosProps) {
  const { gotToHome } = useNavigation();

  return (
    <ProductList
      title="Favoritos"
      products={favoritos}
      dispatch={dispatch}
      showQuantityControls={false}
      showRemoveButton={true}
      onBack={gotToHome}
    />
  );
}
