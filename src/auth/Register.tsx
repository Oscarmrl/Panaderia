import { useState } from "react";
import useMutation from "../hook/useMutation";
import type { register } from "../types";
import { useNavigation } from "../hook";
import AuthForm from "../Components/ui/AuthForm";

export default function Register() {
  const [mserror, setMserror] = useState("");
  const { mutate } = useMutation<register>();
  const { gotToHome } = useNavigation();

  // Función para manejar el registro
  const handleRegister = async ({
    email,
    password,
    name,
    phone,
    address,
  }: register) => {
    if (!email || !password || !name || !phone || !address) {
      setMserror("Por favor, completa todos los campos.");
      return;
    }
    try {
      const response = await mutate("http://localhost:3000/register", "POST", {
        email,
        password,
        name,
        phone,
        address,
      });
      console.log(response);
      if (response && response.accessToken) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("role", response.role || "user");
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("username", response.username || name);
        gotToHome();
      } else {
        setMserror(response?.message || "No se pudo registrar el usuario.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setMserror(err.message);
      } else {
        setMserror("Error desconocido");
      }
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
          />
        </div>
      </div>
    </div>
  );
}
