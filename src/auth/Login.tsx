import { useNavigation } from "../hook";
import { useState } from "react";
import useMutation from "../hook/useMutation";
import type { login } from "../types";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [mserror, setMserror] = useState("");
  const { gotToHome } = useNavigation();
  const { mutate } = useMutation<login>();

  const handleLogin = async () => {
    if (!email || !password) {
      setMserror("Por favor, completa todos los campos.");
      return;
    }
    try {
      const response = await mutate("http://localhost:3000/login", "POST", {
        email,
        password,
      });

      if (response && response.token) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("rol", response.token || "user");
        console.log("Usuario ha iniciado sesión:", response);
        console.log("Respuesta del Login:", response);

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

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("rol");
  };

  const loginConGoogle = () => {};

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <fieldset className="fieldset">
            <h1 className="text-4xl md:text-5xl font-bold m-6">Login now!</h1>
            <label className="label font-semibold">Correo</label>
            <input
              type="email"
              className="input bg-base-300 shadow-lg w-full radio-primary"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label font-semibold">Contraseña</label>
            <input
              type="password"
              className="input bg-base-300 shadow-lg w-full radio-primary"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            {mserror && (
              <p className="text-red-600 text-sm font-semibold mt-2">
                {mserror}
              </p>
            )}
            <div>
              <a className="link link-hover font-semibold">Registrate</a>
            </div>
            <button
              className="btn btn-primary mt-2 w-full"
              onClick={handleLogin}
            >
              Login
            </button>

            <div className="divider divider-neutral">o</div>
            <button className="btn btn-outline  mt-2 w-full">Google</button>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
