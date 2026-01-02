import { useState } from "react";
import PageHeader from "../Components/ui/PageHeader";
import { useNavigation } from "../hook";
import { createProduct } from "../services/product";
import toast from "react-hot-toast";
import { uploadImage } from "../services/uploadImage";

export default function AddProducts() {
  const { goToAdminLayout } = useNavigation();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Debes seleccionar una imagen");
      return;
    }

    try {
      setLoading(true);

      // 1. Subir imagen a Firebase
      const imageUrl = await uploadImage(imageFile);

      // 2. Enviar URL al backend
      await createProduct({
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: imageUrl,
      });

      toast.success("Producto creado con imagen");
      goToAdminLayout();
    } catch (error) {
      toast.error("Error al subir la imagen", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Añadir Producto" onBack={goToAdminLayout} />

      <div className="flex justify-center px-4 mt-10 mb-20">
        <div className="card w-full max-w-xl bg-base-100 shadow-2xl border border-gray-200">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">
              Información del producto
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Nombre del producto
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered"
                  placeholder="Ej. Pan dulce"
                />
              </div>

              {/* Descripción */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Descripción</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered"
                  placeholder="Descripción del producto"
                />
              </div>

              {/* Precio y Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Precio (USD)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Stock</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Cantidad disponible"
                    min="0"
                  />
                </div>
              </div>

              {/* Imagen (URL) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Imagen</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                />
              </div>

              {/* Acciones */}
              <div className="card-actions justify-end pt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Guardar producto"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
