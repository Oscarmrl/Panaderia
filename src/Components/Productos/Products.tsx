import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { GiFireBowl, GiBread } from "react-icons/gi";
import { useNavigation } from "../../hook";
import { useProduct } from "../Data/Data";
import { FormatCurrency } from "../../helpers";

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
    <div className="bg-base-100 min-h-screen py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-accent mb-2 sm:mb-3 md:mb-4">
            Nuestros <span className="text-secondary">Productos</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-full sm:max-w-xl md:max-w-2xl mx-auto px-2">
            Descubre nuestra selección de panes y pasteles artesanales,
            horneados diariamente con ingredientes naturales.
          </p>
        </div>

        {products?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-0">
              {selectedProducts.map((pro, index) => (
                <div
                  key={index}
                  onClick={() => goToAdd(pro.idProducts.toString())}
                  className="group bg-base-200 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden cursor-pointer border border-amber-100"
                >
                  <div className="relative h-40 sm:h-44 md:h-48 lg:h-56 overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-700"
                      src={pro.image ? pro.image : "/Panaderia/Principal.jpeg"}
                      alt={pro.name}
                    />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 flex items-center gap-1 sm:gap-2">
                      <>
                        <GiFireBowl className="text-amber-500 text-sm sm:text-base md:text-lg" />
                        <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full whitespace-nowrap">
                          Recién horneado
                        </span>
                      </>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold group-hover:text-accent transition-colors line-clamp-1">
                        {pro.name}
                      </h3>
                      <GiBread className="text-amber-600 text-base sm:text-lg md:text-xl" />
                    </div>

                    <p className="text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                      {pro.description.length >
                      (window.innerWidth < 640 ? 60 : 100)
                        ? pro.description.slice(
                            0,
                            window.innerWidth < 640 ? 60 : 100,
                          ) + "..."
                        : pro.description}
                    </p>

                    <div className="flex items-center justify-between mt-3 sm:mt-4">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-accent">
                        {FormatCurrency(Number(pro.price))}
                      </span>
                      <button className="bg-secondary hover:bg-secondary/90 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:rotate-12 group/btn">
                        <IoMdAdd className="text-base sm:text-lg md:text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center pb-20 mt-8 sm:mt-10 md:mt-12 gap-4 sm:gap-5 md:gap-6 px-2">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full">
                <button
                  className={`btn btn-circle btn-sm sm:btn-md md:btn-lg ${currentPage === 1 ? "btn-outline opacity-50" : "btn-accent"}`}
                  onClick={handlePrevPages}
                  disabled={currentPage === 1}
                >
                  ❮
                </button>

                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full font-bold text-xs sm:text-sm md:text-base transition-colors ${
                          currentPage === page
                            ? "bg-accent text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  className={`btn btn-circle btn-sm sm:btn-md md:btn-lg ${currentPage === totalPages ? "btn-outline opacity-50" : "btn-accent"}`}
                  onClick={handleNextPages}
                  disabled={currentPage === totalPages}
                >
                  ❯
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-10 sm:py-12 md:py-16 px-4">
            <GiBread className="text-4xl sm:text-5xl md:text-6xl text-gray-300 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
              No hay productos disponibles
            </h3>
            <p className=" text-sm sm:text-base">
              Pronto tendremos nuevas delicias horneadas para ti.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
