import { useNavigation } from "../hook";
import { useState } from "react";
import useMutation from "../hook/useMutation";
import type { login } from "../types";
import { signInWithPopup, getIdToken } from "firebase/auth";
import { auth, googleProvider } from "../src/firebaseConfig";
import AuthForm from "../Components/ui/AuthForm";

export default function Login() {
  const [mserror, setMserror] = useState("");
  const { gotToHome, gotoRegister } = useNavigation();
  const { mutate } = useMutation<login>();

  // Recibe los datos del formulario como argumento
  const handleLogin = async ({ email, password }: login) => {
    if (!email || !password) {
      setMserror("Por favor, completa todos los campos.");
      return;
    }
    try {
      // Llamada a la API para iniciar sesión
      const response = await mutate("http://localhost:3000/login", "POST", {
        email,
        password,
      });

      // Manejo de la respuesta
      if (response && response.accessToken) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("role", response.role || "user");
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("username", response.username);
        console.log("Usuario ha iniciado sesión:", response);
        gotToHome();
      } else {
        setMserror(response?.message || "Credenciales incorrectas.");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error al iniciar sesión:", err.message);
        setMserror(err.message);
      } else {
        console.error("Error inesperado:", err);
        setMserror("Error desconocido");
      }
    }
  };

  // Función para manejar el login con Google
  const loginConGoogle = async () => {
    try {
      // 1. Iniciar sesión con Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 2. Obtener el idToken de Firebase
      const googleToken = await getIdToken(user);

      // 3. Mandar ese token a tu backend
      const response = await mutate("http://localhost:3000/login", "POST", {
        googleToken,
      });

      // 4. Manejar la respuesta del backend
      if (response && response.accessToken) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userEmail", user.email || "");
        localStorage.setItem("role", response.role || "user");
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("username", response.username);
        console.log("Usuario ha iniciado sesión con Google:", response);
        gotToHome();
      } else {
        setMserror(response?.message || "Error en login con Google.");
      }
    } catch (error) {
      console.error("Error en login con Google:", error);
      setMserror("Error en login con Google");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body justify-center items-center">
          <AuthForm
            mode="login"
            onSubmit={handleLogin}
            errorMessage={mserror}
            setErrorMessage={setMserror}
          />
          <div className="divider divider-neutral">o</div>
          <button
            className="btn btn-outline mt-2 w-full"
            onClick={loginConGoogle}
          >
            Google
          </button>
          <div className="text-center mt-2 mb-5">
            <a onClick={gotoRegister} className="link link-hover font-semibold">
              ¿No tienes cuenta? Regístrate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
