import { Dispatch } from "react";
import { signInWithPopup, getIdToken } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { CartActions } from "../reducers/Compras-Reducers";
import { fetchAndSyncFavorites } from "./favoriteService";
import type { login, register, LoginResponse } from "../types";

// URLs del backend
const API_URLS = [
  "https://backendpanaderia-production.up.railway.app",
  "http://localhost:3000",
];

// Función helper para hacer peticiones con fallback de URLs
async function fetchWithFallback(
  endpoint: string,
  options: RequestInit
): Promise<LoginResponse> {
  let lastError: Error | null = null;

  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, options);

      // Si la respuesta NO es OK (400, 401, 404, 500, etc.)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Error ${response.status}`;
        lastError = new Error(errorMessage);

        // Si es un error de validación (400), no intentes otros servidores
        if (response.status === 400) {
          throw lastError;
        }

        // Para otros errores, intenta el siguiente servidor
        continue;
      }

      // Si todo está bien, retorna los datos
      return await response.json();
    } catch (error) {
      console.error(`Error con ${baseUrl}:`, error);

      // Si ya es un error que lanzamos nosotros (400), re-lanzarlo
      if (
        error instanceof Error &&
        error.message.includes("ya está registrado")
      ) {
        throw error;
      }

      lastError = error instanceof Error ? error : new Error(String(error));
      continue;
    }
  }

  // Si ningún servidor respondió correctamente
  throw lastError || new Error("No se pudo conectar con el servidor");
}

// Función para guardar datos del usuario en localStorage
function saveUserData(response: LoginResponse, email: string): void {
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("userEmail", email);
  localStorage.setItem("role", response.role || "customer");
  localStorage.setItem("token", response.accessToken);
  localStorage.setItem("username", response.username);

  if (response.idClient) {
    localStorage.setItem("idClient", String(response.idClient));
  }
}

// Login con email y contraseña
export async function loginWithCredentials(
  credentials: login,
  dispatch: Dispatch<CartActions>
): Promise<LoginResponse> {
  const { email, password } = credentials;

  if (!email || !password) {
    throw new Error("Por favor, completa todos los campos.");
  }

  const response = await fetchWithFallback("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response && response.accessToken) {
    saveUserData(response, email);
    await fetchAndSyncFavorites(dispatch);
    return response;
  } else {
    throw new Error(response?.message || "Credenciales incorrectas.");
  }
}

// Login con Google
export async function loginWithGoogle(
  dispatch: Dispatch<CartActions>
): Promise<LoginResponse> {
  try {
    // 1. Iniciar sesión con Google
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // 2. Obtener el idToken de Firebase
    const googleToken = await getIdToken(user);

    // 3. Enviar token a backend
    const response = await fetchWithFallback("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ googleToken }),
    });

    // 4. Manejar respuesta
    if (response && response.accessToken) {
      saveUserData(response, user.email || "");
      await fetchAndSyncFavorites(dispatch);
      return response;
    } else {
      throw new Error(response?.message || "Error en login con Google.");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error en login con Google: ${error.message}`);
    }
    throw new Error("Error desconocido en login con Google");
  }
}

// Registro de nuevo usuario
export async function registerUser(
  userData: register,
  dispatch: Dispatch<CartActions>
): Promise<LoginResponse> {
  const { email, password, name, phone, address } = userData;

  if (!email || !password || !name || !phone || !address) {
    throw new Error("Por favor, completa todos los campos.");
  }

  const response = await fetchWithFallback("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, phone, address }),
  });

  if (response && response.accessToken) {
    saveUserData(response, email);
    await fetchAndSyncFavorites(dispatch);
    return response;
  } else {
    throw new Error(response?.message || "No se pudo registrar el usuario.");
  }
}

// Logout
export function logout(): void {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("favorite");
  localStorage.removeItem("idClient");
}
