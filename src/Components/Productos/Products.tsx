import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import IconoNav from "../ui/IconoNav";
import Data from "../Data/Data";
const Nrows = 6;
export default function Products() {
  const { products } = Data();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / Nrows);

  const handleNextPages = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPages = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const startIndex = (currentPage - 1) * Nrows;
  const selectedProducts = products.slice(startIndex, startIndex + Nrows);

  return (
    <div className=" bg-base-100 h-auto py-5 pb-20">
      <h2 className=" text-center text-3xl md:text-5xl ">
        Hasta aqui mi reporte joakin
      </h2>

      <div className="grid grid-cols-2 m-1 md:m-4  text-center gap-2 md:gap-4 md:grid-cols-3">
        {selectedProducts.map((pro, index) => {
          return (
            <div key={index} className="Product">
              <img
                className="img"
                src="/Panaderia/Principal.jpeg"
                alt={pro.imagen}
              />

              <div className="flex flex-col flex-grow sm:p-2 md:p-6">
                <h3 className="name">{pro.nombre}</h3>
                <p className="description">{pro.descripcion}</p>

                <div className="actions">
                  <span className="price">{pro.precio}</span>
                  <button className="button">
                    <IconoNav icon={IoMdAdd} size="w-4 h-4" label="" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-accent text-white rounded disabled:opacity-50"
          onClick={handlePrevPages}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="text-white">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-accent text-white rounded disabled:opacity-50"
          onClick={handleNextPages}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
