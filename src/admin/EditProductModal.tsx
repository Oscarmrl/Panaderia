import { useState, useEffect } from "react";
import { updateProduct } from "../services/product";
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
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price_hnl,
        stock: product.stock,
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
      await updateProduct(product.idProducts, {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      toast.success("Producto actualizado exitosamente");

      onSuccess();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error inesperado al actualizar el producto");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4 text-center">Editar producto</h3>
        <label htmlFor="name" className="label">
          <span className="label-text font-semibold">Nombre</span>
        </label>

        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Nombre"
        />

        <label htmlFor="description" className="label">
          <span className="label-text font-semibold">Descripcion</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full mb-3"
          placeholder="Descripción"
        />

        <label htmlFor="price" className="label">
          <span className="label-text font-semibold">Precio</span>
        </label>
        <input
          id="price"
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          placeholder="Precio"
        />

        <label htmlFor="stock" className="label">
          <span className="label-text font-semibold">Stock</span>
        </label>
        <input
          id="stock"
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          placeholder="Stock"
        />

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
