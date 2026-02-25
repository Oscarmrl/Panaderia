import { useState, useEffect } from "react";
import { updateProduct } from "../services/product";
import { uploadImage } from "../services/uploadImage";
import { deleteImageByUrl } from "../services/deleteImage";
import { Product } from "../types";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditProductModal({
  product,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
  });

  const [newImage, setNewImage] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image || "",
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let imageUrl = form.image;

      // 1. Eliminar imagen existente
      if (removeImage && form.image) {
        await deleteImageByUrl(form.image);
        imageUrl = "";
      }

      // 2. Subir nueva imagen
      if (newImage) {
        if (form.image) {
          await deleteImageByUrl(form.image);
        }
        imageUrl = await uploadImage(newImage);
      }

      // 3. Actualizar producto
      await updateProduct(product.idProducts, {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        image: imageUrl,
      });

      toast.success("Producto actualizado exitosamente");
      onSuccess();
      onClose();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Error al actualizar producto"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4 text-center">Editar producto</h3>

        {/* Imagen actual */}
        {!removeImage && (
          <div className="mb-4">
            <img
              src={form.image || "/Panaderia/Principal.jpeg"}
              alt="Producto"
              className="h-40 w-full object-cover rounded"
              onError={(e) => {
                e.currentTarget.src = "/Panaderia/Principal.jpeg";
              }}
            />
          </div>
        )}

        {/* Nueva imagen */}
        <label className="label">
          <span className="label-text font-semibold">
            Cambiar imagen (opcional)
          </span>
        </label>

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full mb-4"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setNewImage(e.target.files[0]);
              setRemoveImage(false);
            }
          }}
        />

        {/* Nombre */}
        <label className="label">
          <span className="label-text font-semibold">Nombre</span>
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
        />

        {/* Descripción */}
        <label className="label">
          <span className="label-text font-semibold">Descripción</span>
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full mb-3"
        />

        {/* Precio */}
        <label className="label">
          <span className="label-text font-semibold">Precio (HNL)</span>
        </label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
        />

        {/* Stock */}
        <label className="label">
          <span className="label-text font-semibold">Stock</span>
        </label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
        />

        {/* Acciones */}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
