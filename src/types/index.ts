export type Tema = "light" | "dark";

export type Product = {
  idProducts: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
};

export type ProductItem = Product & {
  quantity: number;
};

export type login = {
  email: string;
  password: string;
};
