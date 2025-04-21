import { useState } from "react";
import useNavigation from "../../hook/useNavigation";
import { IoMdAdd } from "react-icons/io";
import IconoNav from "../ui/IconoNav";
import { useProduct } from "../Data/Data";

const Nrows = 6;

export default function Products() {
  const { products } = useProduct();

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

  const { goToAdd } = useNavigation();

  return (
    <div className=" bg-base-100 h-auto py-5 pb-20">
      <h2 className=" text-center text-3xl md:text-5xl  ">Productos</h2>

      <div className="grid grid-cols-2 m-1 md:m-4  text-center gap-2 md:gap-4 md:grid-cols-3">
        {products?.length > 0 ? (
          selectedProducts.map((pro, index) => (
            <div key={index} className="Product">
              <img className="img" src="/Panaderia/Principal.jpeg" alt="" />

              <div className="flex flex-col flex-grow sm:p-2 md:p-6">
                <h3 className="name">{pro.name}</h3>
                <p className="description">
                  {pro.description.length > 100
                    ? pro.description.slice(0, 60) + "..."
                    : pro.description}
                </p>

                <div className="actions">
                  <span className="price">{pro.price}</span>
                  <button
                    className="button"
                    onClick={() => goToAdd(pro.idProducts.toString())}
                  >
                    <IconoNav icon={IoMdAdd} size="w-4 h-4" label="" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hay productos disponibles</p>
        )}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="btn btn-circle"
          onClick={handlePrevPages}
          disabled={currentPage === 1}
        >
          ❮
        </button>
        <span className="text-primary">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="btn btn-circle"
          onClick={handleNextPages}
          disabled={currentPage === totalPages}
        >
          ❯
        </button>
      </div>
    </div>
  );
}
