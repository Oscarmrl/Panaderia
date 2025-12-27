// Tipos de tema
export type Tema = "light" | "dark";

// Información sobre el producto
export type Product = {
  idProducts: number;
  name: string;
  description: string;
  price: number;
  price_usd: number;
  price_hnl: number;
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

// 👇 Agrega este tipo
export type LoginResponse = {
  accessToken: string;
  username: string;
  role?: string;
  message?: string;
  idClient: number; // ✅ AGREGADO
};
