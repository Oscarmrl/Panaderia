import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";

export default function MenuInferior() {
  const [activeTab, setActiveTab] = useState("home"); // ✅ useState definido primero

  const handleClick = (e) => {
    setActiveTab(e.currentTarget.dataset.tab); // ✅ Obtiene `data-tab` correctamente
  };

  return (
    <div className="flex flex-row bg-white bottom-0 fixed w-full justify-evenly py-2">
      <button
        data-tab="home"
        className={activeTab === "home" ? "active" : "flex flex-col items-center justify-center"}
        onClick={handleClick}
      >
        <IoHomeOutline className="w-6 h-6"/>
        <span className="btm-nav-label">Home</span>
      </button>

      <button
        data-tab="favoritos"
        className={activeTab === "favoritos" ? "active" : "flex flex-col items-center justify-center"}
        onClick={handleClick} // ✅ Ahora está en el botón, no en el span
      >
        <MdFavoriteBorder className="w-6 h-6" />
        <span className="btm-nav-label">Favoritos</span>
      </button>

      <button
        data-tab="carrito"
        className={activeTab === "carrito" ? "active" : "flex flex-col items-center justify-center"}
        onClick={handleClick}
      >
        <MdOutlineShoppingCart className="w-6 h-6" />
        <span className="btm-nav-label">Carrito</span>
      </button>
    </div>
  );
}
