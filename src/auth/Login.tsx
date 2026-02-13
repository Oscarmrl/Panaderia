import { useNavigation } from "../hook";
import { useState } from "react";
import type { login } from "../types";
import AuthForm from "../Components/ui/AuthForm";
import { useCart } from "../hook/useCart";
import { loginWithCredentials, loginWithGoogle } from "../services/authService";

export default function Login() {
  const [mserror, setMserror] = useState("");
  const [loading, setLoading] = useState(false);
  const { gotToHome, gotoRegister, gotoProfile } = useNavigation();
  const { dispatch } = useCart();

  // Login con email y contraseña
  const handleLogin = async (credentials: login) => {
    setLoading(true);
    setMserror("");

    try {
      await loginWithCredentials(credentials, dispatch);
      // Si es admin, redirigir directamente al home
      const role = localStorage.getItem("role");
      if (role === "admin") {
        gotToHome();
        return;
      }
      // Verificar si el perfil está completo (teléfono proporcionado)
      const profileComplete = localStorage.getItem("profileComplete") === "true";
      if (!profileComplete) {
        gotoProfile();
        return;
      }
      gotToHome();
    } catch (err) {
      if (err instanceof Error) {
        setMserror(err.message);
      } else {
        setMserror("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  // Login con Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    setMserror("");

    try {
      await loginWithGoogle(dispatch);
      // Si es admin, redirigir directamente al home
      const role = localStorage.getItem("role");
      if (role === "admin") {
        gotToHome();
        return;
      }
      // Verificar si el perfil está completo (teléfono proporcionado)
      const profileComplete = localStorage.getItem("profileComplete") === "true";
      if (!profileComplete) {
        gotoProfile();
        return;
      }
      gotToHome();
    } catch (err) {
      if (err instanceof Error) {
        setMserror(err.message);
      } else {
        setMserror("Error desconocido");
      }
    } finally {
      setLoading(false);
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
            disabled={loading}
          />
          <div className="divider divider-neutral">o</div>
          <button
            className="btn btn-outline mt-2 w-full"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Google"
            )}
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
