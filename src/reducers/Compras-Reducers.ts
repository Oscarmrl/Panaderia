import { Product, ProductItem } from "../types";

export type CartActions =
  | { type: "add-to-cart"; payload: { item: Product } }
  | { type: "remove-from-cart"; payload: { id: Product["idProducts"] } }
  | { type: "decreaseQuantity"; payload: { id: Product["idProducts"] } }
  | { type: "increaseQuantity"; payload: { id: Product["idProducts"] } }
  | { type: "add-to-favorite"; payload: { item: Product } }
  | { type: "remove-from-favorite"; payload: { id: Product["idProducts"] } }
  | { type: "clearCart" }
  | { type: "initCart"; payload: { cart: ProductItem[] } }
  | { type: "initFavorite"; payload: { favorite: Product[] } };

export type CartState = {
  data: Product[];
  cart: ProductItem[];
  favorite: Product[];
};

export const initialState: CartState = {
  data: [], // Iniciamos con un array vacío
  cart: [], // Carrito vacío también
  favorite: [],
};

export const comprasReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  const MIN_ITEMS = 1;
  if (action.type === "add-to-cart") {
    const itemExists = state.cart.find(
      (products) => products.idProducts === action.payload.item.idProducts
    );

    const MAX_ITEMS = action.payload.item.stock;
    let updatedCart: ProductItem[] = [];

    //si el producto ya existe  en el carrito, aumenta la cantidad

    if (itemExists) {
      updatedCart = state.cart.map((item) => {
        if (item.idProducts === action.payload.item.idProducts) {
          //Definimos la cantidad maxima de elementos
          if (item.quantity < MAX_ITEMS) {
            // Incluimos todos los detalles del artículo de action.payload.item
            return { ...action.payload.item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: ProductItem = { ...action.payload.item, quantity: 1 };
      updatedCart = [...state.cart, newItem];
    }

    return {
      ...state,
      cart: updatedCart,
    };
  }

  //Eliminando productos del  carrito

  if (action.type === "remove-from-cart") {
    const updatedCart = state.cart.filter(
      (item) => item.idProducts !== action.payload.id
    );
    return {
      ...state,
      cart: updatedCart, // Elimina el item del carrito
    };
  }

  if (action.type === "decreaseQuantity") {
    const updatedCart = state.cart.map((item) => {
      if (item.idProducts === action.payload.id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "increaseQuantity") {
    const updatedCart = state.cart.map((item) => {
      const MAX_ITEMS = item.stock;
      if (item.idProducts === action.payload.id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "clearCart") {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === "add-to-favorite") {
    const favoriteExist = state.favorite.find(
      (item) => item.idProducts === action.payload.item.idProducts
    );

    if (favoriteExist) {
      return state;
    }
    return {
      ...state,
      favorite: [...state.favorite, action.payload.item],
    };
  }

  if (action.type === "remove-from-favorite") {
    return {
      ...state,
      favorite: state.favorite.filter(
        (item) => item.idProducts !== action.payload.id
      ),
    };
  }

  return state;
};
