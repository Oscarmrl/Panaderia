import { useState } from "react";
import type { register } from "../types";
import { useNavigation } from "../hook";
import AuthForm from "../Components/ui/AuthForm";
import { useCart } from "../hook/useCart";
import { registerUser } from "../services/authService";

export default function Register() {
  const [mserror, setMserror] = useState("");
  const [loading, setLoading] = useState(false);
  const { gotToHome, gotoLogin, gotoProfile } = useNavigation();
  const { dispatch } = useCart();

  // Función para manejar el registro
  const handleRegister = async (userData: register) => {
    setLoading(true);
    setMserror("");

    try {
      await registerUser(userData, dispatch);
      // En registro normal, el perfil siempre está completo (tiene teléfono)
      // Pero verificamos por si acaso
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
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-4">
        <div className="card-body items-center md:mb-2 mb-10">
          <AuthForm
            mode="register"
            onSubmit={handleRegister}
            errorMessage={mserror}
            setErrorMessage={setMserror}
            disabled={loading}
          />
          <div className="text-center mt-2">
            <a onClick={gotoLogin} className="link link-hover font-semibold">
              ¿Ya tienes cuenta? Inicia sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
