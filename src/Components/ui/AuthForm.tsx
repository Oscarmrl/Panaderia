import { useState } from "react";
import type { register } from "../../types";

type AuthFormProps = {
  mode: "login" | "register";
  onSubmit: (data: register) => void;
  errorMessage?: string;
  setErrorMessage?: (msg: string) => void;
  disabled?: boolean; // 👈 Agrega esta línea
};

export default function AuthForm({
  mode,
  onSubmit,
  errorMessage,
  setErrorMessage,
  disabled = false, // 👈 Valor por defecto
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    if (
      !email ||
      !password ||
      (mode === "register" && (!name || !phone || !address))
    ) {
      if (setErrorMessage) {
        setErrorMessage("Por favor, completa todos los campos.");
      }
      return;
    }

    onSubmit({ email, password, name, phone, address });
  };

  return (
    <div className="card bg-base-100 w-72 sm:w-80 max-w-xs shadow-lg p-2">
      <div className="card-body p-2">
        <h1 className="text-3xl font-bold text-center mb-2">
          {mode === "login" ? "Inicia sesión" : "Regístrate"}
        </h1>

        {mode === "register" && (
          <>
            <label className="label font-semibold text-sm md:text-lg">
              Nombre
            </label>
            <input
              type="text"
              className="input input-sm bg-base-300 w-full radio-primary"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={disabled} // 👈 Agrega disabled
            />

            <label className="label font-semibold text-sm md:text-lg">
              Teléfono
            </label>
            <input
              type="text"
              className="input input-sm bg-base-300 w-full radio-primary"
              placeholder="Número de teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={disabled} // 👈 Agrega disabled
            />

            <label className="label font-semibold text-sm md:text-lg">
              Dirección
            </label>
            <input
              type="text"
              className="input input-sm bg-base-300 w-full radio-primary "
              placeholder="Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={disabled} // 👈 Agrega disabled
            />
          </>
        )}

        <label className="label font-semibold text-sm md:text-lg">Correo</label>
        <input
          type="email"
          className="input input-sm bg-base-300 w-full radio-primary"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled} // 👈 Agrega disabled
        />

        <label className="label font-semibold text-sm md:text-lg">
          Contraseña
        </label>
        <input
          type="password"
          className="input input-sm bg-base-300 w-full radio-primary"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={disabled} // 👈 Agrega disabled
        />

        {errorMessage && (
          <p className="text-red-600 text-sm font-semibold mt-2">
            {errorMessage}
          </p>
        )}

        <button
          className="btn btn-primary btn-md mt-3 w-full"
          onClick={handleSubmit}
          disabled={disabled} // 👈 Agrega disabled
        >
          {disabled ? ( // 👈 Muestra loading cuando está deshabilitado
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Procesando...
            </>
          ) : mode === "login" ? (
            "Entrar"
          ) : (
            "Crear cuenta"
          )}
        </button>
      </div>
    </div>
  );
}
