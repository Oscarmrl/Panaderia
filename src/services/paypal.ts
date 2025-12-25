import axios from "axios";
import { ProductItem } from "../types";

const API = "http://localhost:3000/api/paypal";

export const createPayPalOrder = async (cart: ProductItem[]) => {
  const { data } = await axios.post(`${API}/create-order`, {
    cart,
  });
  return data.id;
};

export const capturePayPalOrder = async (
  orderID: string,
  cart: ProductItem[],
  idClient: number
) => {
  const { data } = await axios.post(`${API}/capture-order`, {
    orderID,
    cart,
    idClient,
  });
  return data;
};
