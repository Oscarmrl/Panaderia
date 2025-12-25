import {
  comprasReducer,
  initialState,
  CartState,
  CartActions,
} from "../reducers/Compras-Reducers";
import { useReducer, createContext } from "react";

type CartContextProps = {
  state: CartState;
  dispatch: React.Dispatch<CartActions>;
};
type CartProviderProps = {
  children: React.ReactNode;
};

export const CartContext = createContext<CartContextProps>(null!);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(comprasReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
