import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../services/profileService";
import toast from "react-hot-toast";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  const idClient = parseInt(localStorage.getItem("idClient") || "0");

  useEffect(() => {
    if (!idClient || idClient === 0) {
      console.log("idClient no válido, redirigiendo a home");
      toast.error("Debes iniciar sesión para ver tu perfil");
      navigate("/Panaderia");
      return;
    }

    let isMounted = true;

    const loadProfile = async () => {
      if (!isMounted) return;

      setLoading(true);
      try {
        console.log("Cargando perfil para idClient:", idClient);
        const data = await getProfile(idClient);

        if (!isMounted) return;

        setProfile({
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          address: data.address || "",
        });
        console.log("Perfil cargado:", data);
      } catch (error) {
        console.error("Error cargando perfil:", error);
        if (!isMounted) return;
        toast.error("No se pudo cargar el perfil");
        // Si el endpoint no existe, podemos mostrar un formulario vacío
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [idClient, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.phone.trim()) {
      toast.error("El teléfono es obligatorio");
      return;
    }

    setSaving(true);
    try {
      await updateProfile(idClient, {
        phone: profile.phone,
        address: profile.address,
        name: profile.name,
      });
      // Marcar perfil como completo ahora que tiene teléfono
      localStorage.setItem("profileComplete", "true");
      toast.success("Perfil actualizado");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el perfil");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-6">Mi Perfil</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label font-semibold">Nombre</label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Tu nombre"
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">Correo electrónico</label>
              <input
                type="email"
                className="input input-bordered w-full"
                name="email"
                value={profile.email}
                disabled
                placeholder="Email"
              />
              <span className="text-xs text-gray-500 mt-1">
                El correo no se puede modificar
              </span>
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Número de teléfono"
                required
              />
              <span className="text-xs text-gray-500 mt-1">
                Necesario para confirmar tus pedidos
              </span>
            </div>
            <div className="form-control">
              <label className="label font-semibold">Dirección</label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Dirección de entrega"
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Guardando...
                  </>
                ) : (
                  "Guardar cambios"
                )}
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => navigate("/Panaderia")}
              >
                Volver al inicio
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
