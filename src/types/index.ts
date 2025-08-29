// Tipos de tema
export type Tema = "light" | "dark";
// Información sobre el producto
export type Product = {
  idProducts: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
};

// Item de producto
export type ProductItem = Product & {
  quantity: number;
};

// Información de inicio de sesión
export type login = {
  email: string;
  password: string;
};
// Información de registro
export type register = login & {
  name: string;
  phone: string;
  address: string;
};
