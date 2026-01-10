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

/* ===============================
   REFRESH ACCESS TOKEN
================================ */
async function refreshAccessToken(): Promise<string | null> {
  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(`${baseUrl}/refresh-token`, {
        method: "POST",
        credentials: "include", // cookie httpOnly
      });

      if (!response.ok) continue;

      const data = await response.json();

      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        return data.accessToken;
      }
    } catch {
      continue;
    }
  }

  return null;
}

/* ===============================
   FETCH WITH FALLBACK + REFRESH
================================ */
async function fetchWithFallback(
  endpoint: string,
  options: RequestInit
): Promise<LoginResponse> {
  let lastError: Error | null = null;

  for (const baseUrl of API_URLS) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
          ...(options.headers || {}),
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      // Access token expirado
      if (response.status === 401) {
        const newToken = await refreshAccessToken();

        if (!newToken) {
          throw new Error("Sesión expirada");
        }

        // Reintento con nuevo token
        const retryResponse = await fetch(`${baseUrl}${endpoint}`, {
          ...options,
          credentials: "include",
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${newToken}`,
          },
        });

        if (!retryResponse.ok) {
          const err = await retryResponse.json().catch(() => ({}));
          throw new Error(err.message || "Error después de refrescar token");
        }

        return await retryResponse.json();
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      continue;
    }
  }

  throw lastError || new Error("No se pudo conectar con el servidor");
}

/* ===============================
   SAVE USER DATA
================================ */
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

/* ===============================
   LOGIN EMAIL / PASSWORD
================================ */
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

  saveUserData(response, email);
  await fetchAndSyncFavorites(dispatch);
  return response;
}

/* ===============================
   LOGIN GOOGLE
================================ */
export async function loginWithGoogle(
  dispatch: Dispatch<CartActions>
): Promise<LoginResponse> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  const googleToken = await getIdToken(user);

  const response = await fetchWithFallback("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ googleToken }),
  });

  saveUserData(response, user.email || "");
  await fetchAndSyncFavorites(dispatch);
  return response;
}

/* ===============================
   REGISTER
================================ */
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

  saveUserData(response, email);
  await fetchAndSyncFavorites(dispatch);
  return response;
}

/* ===============================
   LOGOUT
================================ */
export function logout(): void {
  localStorage.clear();
}
