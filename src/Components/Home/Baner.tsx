import { GiFireBowl, GiWheat } from "react-icons/gi";

export default function Baner() {
  return (
    <div className="bg-base flex justify-center items-center mt-0 sm:mt-2 px-2 sm:px-4">
      <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-base-100 rounded-none sm:rounded-lg md:rounded-badge overflow-hidden shadow-lg sm:shadow-2xl max-w-7xl mx-auto">
        <img
          src="/Panaderia/Principal.jpeg"
          alt="Imagen principal"
          className="w-full h-full object-cover opacity-80 sm:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent sm:from-black/70 sm:via-black/40"></div>

        <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-6 md:bottom-12 md:left-10 text-white">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <GiFireBowl className="text-amber-400 text-base sm:text-lg md:text-xl" />
            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full whitespace-nowrap">
              Recién horneado
            </span>
          </div>

          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 leading-snug sm:leading-tight">
            Pan artesanal hecho con{" "}
            <span className="text-amber-300">pasión</span> y{" "}
            <span className="text-amber-300">tradición</span>
          </h1>

          <p className="text-gray-200 text-sm sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-6 max-w-full sm:max-w-xl md:max-w-2xl">
            Descubre el sabor auténtico de nuestra panadería. Cada producto es
            elaborado con ingredientes naturales y horneado diariamente.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
            <button className="bg-accent hover:bg-accent/90 text-white font-medium py-2 px-3 sm:py-2 sm:px-4 md:py-3 md:px-6 rounded-full flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 hover:scale-105 shadow-lg text-xs sm:text-sm md:text-base">
              <GiWheat className="text-xs sm:text-sm md:text-lg" />
              <span className="truncate">Ingredientes naturales</span>
            </button>
            <button className="bg-secondary hover:bg-secondary/90 text-white font-medium py-2 px-3 sm:py-2 sm:px-4 md:py-3 md:px-6 rounded-full flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 hover:scale-105 shadow-lg text-xs sm:text-sm md:text-base">
              <GiWheat className="text-xs sm:text-sm md:text-lg" />
              <span className="truncate">Calidad asegurada</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
