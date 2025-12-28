import { useProduct } from "../Components/Data/Data";
import { useNavigation } from "../hook";
import PageHeader from "../Components/ui/PageHeader";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FormatCurrency } from "../helpers";
import { deleteProduct } from "../services/product";
import EditProductModal from "../admin/EditProductModal";
import { Product } from "../types";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EditProducts() {
  const { goToAdminLayout } = useNavigation();
  const { products, loading, error, refetchProducts } = useProduct();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      toast.success("Producto eliminado exitosamente");
      refetchProducts();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error inesperado al eliminar el producto");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg text-accent"></span>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-error">Error al cargar productos</p>
    );
  }

  return (
    <>
      <PageHeader title="Editar Productos" onBack={goToAdminLayout} />

      <div className="p-6 mb-10 md:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.idProducts}
              className="card bg-base-100 shadow-2xl border border-gray-200"
            >
              <figure className="relative">
                <img
                  src="/Panaderia/Principal.jpeg"
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                {/* Badge Stock */}
                <span
                  className={`badge absolute font-semibold top-3 right-3 ${
                    product.stock > 0 ? "badge bg-green-700" : "badge-error"
                  }`}
                >
                  {product.stock > 0 ? "Disponible" : "Sin stock"}
                </span>
              </figure>

              {/* Contenido */}
              <div className="card-body ">
                <h2 className="card-title truncate md:text-2xl">
                  {product.name}
                </h2>

                <p className="text-sm opacity-80 line-clamp-2">
                  {product.description}
                </p>

                {/* Precio */}
                <div className="mt-2">
                  <span className="badge   font-semibold md:text-lg">
                    {FormatCurrency(product.price_hnl)}
                  </span>
                </div>

                {/* Footer */}
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-sm font-semibold opacity-100">
                    Stock: {product.stock}
                  </span>

                  <div className="flex gap-2">
                    <div className="tooltip" data-tip="Editar producto">
                      <button
                        onClick={() => handleEdit(product)}
                        className="btn btn-sm w-16 btn-secondary"
                      >
                        <FiEdit />
                      </button>
                    </div>

                    <div className="tooltip" data-tip="Eliminar producto">
                      <button
                        onClick={() => handleDelete(product.idProducts)}
                        className="btn btn-sm w-16 bg-red-600 text-white hover:bg-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center mt-12 text-base-content opacity-60">
            No hay productos registrados
          </p>
        )}
      </div>
      {openModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setOpenModal(false)}
          onSuccess={refetchProducts}
        />
      )}
    </>
  );
}
