import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import IconoNav from "../ui/IconoNav";
import { IoHomeOutline } from "react-icons/io5";

export default function MenuInferior() {
  const [activeTab, setActiveTab] = useState("home"); // ✅ useState definido primero

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(e.currentTarget.dataset.tab || ""); // ✅ Obtiene `data-tab` correctamente
  };

  return (
    <div className="flex flex-row bg-base-100 bottom-0 fixed w-full justify-evenly py-2 md:hidden">
      <button
        data-tab="home"
        className={activeTab === "home" ? "Menu_active" : "flex flex-col items-center justify-center w-20 md:w-40"}
        onClick={handleClick}
      >
        <IconoNav icon={IoHomeOutline} size="w-4 h-4" label="Inicio" />

      </button>

      <button
        data-tab="favoritos"
        className={activeTab === "favoritos" ? "Menu_active" : "flex flex-col items-center justify-center w-20 md:w-40"}
        onClick={handleClick} 
      >

<IconoNav icon={MdFavoriteBorder} size="w-4 h-4" label="Favoritos" />
      
      </button>

      <button
        data-tab="carrito"
        className={activeTab === "carrito" ? "Menu_active" : "flex flex-col items-center justify-center w-20 md:w-40"}
        onClick={handleClick}
      >

<IconoNav icon={MdOutlineShoppingCart} size="w-4 h-4" label="Carrito" />

      </button>
    </div>
  );
}
